import axios from 'axios';
import type { FormikHelpers } from 'formik';
import Toast from 'react-native-toast-message';
import { authService } from '@/shared/services/authService';
import { useUserStore } from '@/shared/store/userStore';
import type { LoginRequest } from '@/shared/types/auth';

function parseLoginErrorMessage(error: unknown): string {
  let message = 'Giriş zamanı xəta baş verdi.';

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { result?: unknown; message?: string }
      | undefined;

    if (status === 401) {
      message = 'Telefon nömrəsi və ya şifrə yanlışdır.';
    } else if (status === 422) {
      const result = data?.result;
      if (result) {
        if (Array.isArray(result)) {
          message = result
            .map(r => (r?.message ? String(r.message) : JSON.stringify(r)))
            .join('\n');
        } else if (typeof result === 'object') {
          const first = Object.values(result as Record<string, unknown>)[0];
          message = Array.isArray(first) ? first.join('\n') : String(first);
        } else {
          message = String(result);
        }
      } else if (data?.message) {
        message = String(data.message);
      } else {
        message = 'Doğrulama xətası. Məlumatları yoxlayın.';
      }
    } else if (data?.message) {
      message = String(data.message);
    }
  }

  return message;
}

export function useLoginSubmit() {
  const handleSubmit = async (
    values: LoginRequest,
    { setSubmitting }: FormikHelpers<LoginRequest>,
  ) => {
    const { setLoading, setError, setTokens, setUser } = useUserStore.getState();

    const showError = (message: string) => {
      setError(message);
      Toast.show({
        type: 'error',
        text1: 'Xəta',
        text2: message,
        position: 'top',
      });
    };

    try {
      setLoading(true);
      setError(null);

      const result = await authService.login(values);

      if (result.tokens && result.profile) {
        setTokens(result.tokens.access_token, result.tokens.refresh_token ?? '');
        setUser(result.profile);

        Toast.show({
          type: 'success',
          text1: 'Uğurlu giriş',
          text2: `Xoş gəldiniz, ${result.profile.full_name}!`,
          position: 'top',
        });
      } else {
        showError('Giriş uğursuz oldu.');
      }
    } catch (error) {
      showError(parseLoginErrorMessage(error));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return { handleSubmit };
}
