import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Product } from '@/shared/types/product';

export const favoriteService = {
  toggleFavorite: (productId: number) =>
    api.post<ApiResponse<null>>(`/products/${productId}/favorite`).then(res => res.data),
  getFavorites: () =>
    api.get<ApiResponse<Product[]>>('/products/favorites').then(res => res.data.data),
};
