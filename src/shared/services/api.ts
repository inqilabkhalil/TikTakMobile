import axios from 'axios';
import Config from 'react-native-config';
import Toast from 'react-native-toast-message';
import { useUserStore } from '../store/userStore';

export const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 15000,
});

export function isUnauthorizedError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

export function isNetworkError(error: unknown): boolean {
  return axios.isAxiosError(error) && !error.response;
}

export function isTimeoutError(error: unknown): boolean {
  return (
    axios.isAxiosError(error) &&
    (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT')
  );
}

type ApiErrorBody = { message?: unknown; error?: unknown };

function stringifyServerMessage(value: unknown): string | undefined {
  if (typeof value === 'string') return value.trim() || undefined;

  if (Array.isArray(value)) {
    const parts = value
      .map(item =>
        typeof item === 'string'
          ? item
          : ((item as { message?: unknown })?.message as string | undefined),
      )
      .filter((item): item is string => !!item && item.trim().length > 0);

    return parts.length ? parts.join('\n') : undefined;
  }

  return undefined;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiErrorBody>(error)) {
    const data = error.response?.data;

    const fromBody =
      stringifyServerMessage(data?.message) ??
      stringifyServerMessage(data?.error);
    if (fromBody) return fromBody;

    if (isTimeoutError(error)) {
      return 'Server cavab vermədi (vaxt bitdi). Bağlantını yoxlayıb yenidən cəhd edin.';
    }

    if (!error.response) {
      return 'Serverə qoşulmaq mümkün olmadı. İnternet bağlantını yoxlayın.';
    }

    return `Server xətası (${error.response.status})`;
  }

  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
}

function isAuthEndpoint(url?: string): boolean {
  return !!url && url.includes('/auth/');
}

api.interceptors.request.use(
  config => {
    const accessToken = useUserStore.getState().accessToken;

    if (accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    if (config.data instanceof FormData) {
      config.timeout = 60000;

      if (config.headers && typeof (config.headers as any).delete === 'function') {
        (config.headers as any).delete('Content-Type');
      } else if (config.headers) {
        delete (config.headers as any)['Content-Type'];
        delete (config.headers as any)['content-type'];
      }
      config.transformRequest = [(data) => data];
    }

    return config;
  },
  error => Promise.reject(error),
);

let sessionExpiredNotified = false;

api.interceptors.response.use(
  response => {
    sessionExpiredNotified = false;
    return response;
  },
  error => {
    if (isUnauthorizedError(error) && !isAuthEndpoint(error.config?.url)) {
      const { accessToken, clearTokens } = useUserStore.getState();

      if (accessToken) {
        clearTokens();

        if (!sessionExpiredNotified) {
          sessionExpiredNotified = true;
          Toast.show({
            type: 'error',
            text1: 'Sessiya bitdi',
            text2: 'Zəhmət olmasa yenidən daxil olun',
          });
        }
      }
    }

    return Promise.reject(error);
  },
);