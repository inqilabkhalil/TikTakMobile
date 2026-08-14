import axios from 'axios';
import type { ApiResponse } from '../types/api';

export function getErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError<ApiResponse<unknown>>(error)) {
    return error.response?.data?.message ?? fallback;
  }
  return fallback;
}
