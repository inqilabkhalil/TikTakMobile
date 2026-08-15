import { api } from '@/shared/services/api';
import axios, { type AxiosResponse } from 'axios';
import type {
  RegisterRequest,
  LoginRequest,
  AuthResult,
  AuthApiResponse,
} from '@/shared/types/auth';

function normalizeResponse(
  response: AxiosResponse<AuthApiResponse>,
): AuthResult {
  const { tokens, profile } = response.data.data;

  return { tokens, profile };
}

export const authService = {
  register: async (payload: RegisterRequest): Promise<AuthResult> => {
    if (!api.defaults.baseURL) {
      throw new Error(
        'API ünvanı (API_URL) təyin edilməyib. Lokal .env faylınıza `API_URL` əlavə edin və remote JS debugging-i söndürün.',
      );
    }

    try {
      const response = await api.post<AuthApiResponse>('/auth/signup', payload);
      // safe debug: show status and top-level keys
      console.debug(
        '[authService.register] status=',
        response.status,
        'keys=',
        Object.keys(response.data || {}),
      );
      return normalizeResponse(response);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
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
        console.debug('[authService.register] error (non-axios) =', err);
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
      const response = await api.post<AuthApiResponse>('/auth/login', payload);
      console.debug(
        '[authService.login] status=',
        response.status,
        'keys=',
        Object.keys(response.data || {}),
      );
      return normalizeResponse(response);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const resp = err.response;
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
        console.debug('[authService.login] error (non-axios) =', err);
      }
      throw err;
    }
  },

  logout: async (): Promise<void> => {
    // If backend logout endpoint exists, call it here. For now just resolve.
    return Promise.resolve();
  },
};
