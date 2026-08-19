import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Product } from '@/shared/types/product';

export const favoriteService = {
  toggleFavorite: (productId: number, signal?: AbortSignal) =>
    api.post<ApiResponse<null>>(`/products/${productId}/favorite`, null, { signal }).then(res => res.data),
  getFavorites: (signal?: AbortSignal) =>
    api.get<ApiResponse<Product[]>>('/products/favorites', { signal }).then(res => res.data.data),
};
