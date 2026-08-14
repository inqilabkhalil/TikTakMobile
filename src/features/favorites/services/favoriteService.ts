import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Product } from '@/shared/types/product';

export const favoriteService = {
  toggleFavorite: (productId: number) =>
    api.post<ApiResponse<null>>(`/api/tiktak/products/${productId}/favorite`).then(res => res.data),
  getFavorites: () =>
    api.get<ApiResponse<Product[]>>('/api/tiktak/products/favorites').then(res => res.data.data),
};
