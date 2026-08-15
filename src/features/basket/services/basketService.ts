import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { BasketApiData } from '../types/basket';

export const basketService = {
  getBasket: () =>
    api.get<ApiResponse<BasketApiData>>('/basket').then(res => res.data.data),

  addToBasket: (productId: number) =>
    api.post(`/basket/${productId}/add`).then(res => res.data),

  clearBasket: () => api.delete('/basket/clear').then(res => res.data),
};
