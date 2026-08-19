import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { BasketApiData } from '../types/basket';

export const basketService = {
  getBasket: (signal?: AbortSignal) =>
    api.get<ApiResponse<BasketApiData>>('/basket', { signal }).then(res => res.data.data),

  addToBasket: (productId: number, signal?: AbortSignal) =>
    api.post(`/basket/${productId}/add`, null, { signal }).then(res => res.data),

  clearBasket: (signal?: AbortSignal) => api.delete('/basket/clear', { signal }).then(res => res.data),
};
