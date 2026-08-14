import { api } from '@/shared/services/api';
import axios from 'axios';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResult,
} from '@/shared/types/auth';

async function normalizeResponse(response: any): Promise<AuthResult> {
  const data = response?.data ?? response;

  // Try common shapes without guessing fields too aggressively
  const tokens =
    data?.data?.tokens ?? data?.tokens ?? data?.data?.token ?? undefined;

  const profile =
    data?.data?.profile ??
    data?.profile ??
    data?.data?.user ??
    data?.user ??
    undefined;

  return {
    tokens: tokens
      ? {
          access_token:
            tokens.access_token ??
            tokens.accessToken ??
            tokens.access ??
            undefined,
          refresh_token:
            tokens.refresh_token ?? tokens.refreshToken ?? undefined,
        }
      : undefined,
    profile,
  };
}

export const authService = {
  register: async (payload: RegisterRequest): Promise<AuthResult> => {
    if (!api.defaults.baseURL) {
      throw new Error(
        'API ünvanı (API_URL) təyin edilməyib. Lokal .env faylınıza `API_URL` əlavə edin və remote JS debugging-i söndürün.',
      );
    }

    try {
      const response = await api.post('/auth/signup', payload);
      // safe debug: show status and top-level keys
      console.debug(
        '[authService.register] status=',
        response.status,
        'keys=',
        Object.keys(response.data || {}),
      );
      return normalizeResponse(response);
    } catch (err) {
      const e = err as any;
      if (axios.isAxiosError(e)) {
        const resp = e.response;
        if (resp?.status === 422) {
          try {
            console.debug(
              '[authService.register] 422 response.data =',
              JSON.stringify(resp.data),
            );
          } catch {
            console.debug(
              '[authService.register] 422 response data (raw) =',
              resp.data,
            );
          }
        } else {
          console.debug(
            '[authService.register] error=',
            resp?.status,
            Object.keys(resp?.data || {}),
          );
        }
      } else {
        console.debug('[authService.register] error (non-axios) =', e);
      }
      throw err;
    }
  },

  login: async (payload: LoginRequest): Promise<AuthResult> => {
    if (!api.defaults.baseURL) {
      throw new Error(
        'API ünvanı (API_URL) təyin edilməyib. Lokal .env faylınıza `API_URL` əlavə edin və remote JS debugging-i söndürün.',
      );
    }

    try {
      const response = await api.post('/auth/login', payload);
      console.debug(
        '[authService.login] status=',
        response.status,
        'keys=',
        Object.keys(response.data || {}),
      );
      return normalizeResponse(response);
    } catch (err) {
      const e = err as any;
      if (axios.isAxiosError(e)) {
        const resp = e.response;
        if (resp?.status === 422) {
          try {
            console.debug(
              '[authService.login] 422 response.data =',
              JSON.stringify(resp.data),
            );
          } catch {
            console.debug(
              '[authService.login] 422 response data (raw) =',
              resp.data,
            );
          }
        } else {
          console.debug(
            '[authService.login] error=',
            resp?.status,
            Object.keys(resp?.data || {}),
          );
        }
      } else {
        console.debug('[authService.login] error (non-axios) =', e);
      }
      throw err;
    }
  },

  logout: async (): Promise<void> => {
    // If backend logout endpoint exists, call it here. For now just resolve.
    return Promise.resolve();
  },
};

export default authService;
