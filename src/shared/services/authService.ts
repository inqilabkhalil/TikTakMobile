import { api } from '@/shared/services/api';
import type { AxiosResponse } from 'axios';
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

    const response = await api.post<AuthApiResponse>('/auth/signup', payload);
    return normalizeResponse(response);
  },

  login: async (payload: LoginRequest): Promise<AuthResult> => {
    if (!api.defaults.baseURL) {
      throw new Error(
        'API ünvanı (API_URL) təyin edilməyib. Lokal .env faylınıza `API_URL` əlavə edin və remote JS debugging-i söndürün.',
      );
    }

    const response = await api.post<AuthApiResponse>('/auth/login', payload);
    return normalizeResponse(response);
  },

  logout: async (): Promise<void> => {
    // If backend logout endpoint exists, call it here. For now just resolve.
    return Promise.resolve();
  },
};
