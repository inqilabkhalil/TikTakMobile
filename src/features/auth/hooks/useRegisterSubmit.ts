import axios from 'axios';
import type { FormikHelpers } from 'formik';
import Toast from 'react-native-toast-message';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { authService } from '@/shared/services/authService';
import { useUserStore } from '@/shared/store/userStore';
import type { RegisterRequest } from '@/shared/types/auth';
import type { AuthStackParamList } from '@/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

function parseRegisterErrorMessage(error: unknown): string {
  let message = 'Qeydiyyat zamanı xəta baş verdi.';

  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const data = error.response?.data as
      | { result?: unknown; message?: string }
      | undefined;

    if (status === 409) {
      message = 'Bu telefon nömrəsi artıq qeydiyyatdan keçib.';
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

export function useRegisterSubmit(navigation: NavigationProp) {
  const handleSubmit = async (
    values: RegisterRequest,
    { setSubmitting }: FormikHelpers<RegisterRequest>,
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

      const result = await authService.register(values);

      if (result.tokens && result.profile) {
        setTokens(result.tokens.access_token, result.tokens.refresh_token ?? '');
        setUser(result.profile);

        Toast.show({
          type: 'success',
          text1: 'Qeydiyyat uğurludur',
          text2: `Xoş gəldiniz, ${result.profile.full_name}!`,
          position: 'top',
        });
      } else {
        Toast.show({
          type: 'success',
          text1: 'Qeydiyyat tamamlandı',
          text2: 'Zəhmət olmasa daxil olun.',
          position: 'top',
        });
        navigation.navigate('Login');
      }
    } catch (error) {
      showError(parseRegisterErrorMessage(error));
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return { handleSubmit };
}
