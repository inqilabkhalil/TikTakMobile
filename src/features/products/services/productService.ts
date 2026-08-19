import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Product } from '@/shared/types/product';

export const productService = {
  // Backend routes `/products/{id}` to "get single product by id", not by
  // category — the category filter is a query param on the list endpoint.
  getProductsByCategory: (categoryId: number, signal?: AbortSignal) =>
    api
      .get<ApiResponse<Product[]>>('/products', { params: { categoryId }, signal })
      .then(res => res.data.data),

  searchProducts: (query: string, signal?: AbortSignal) =>
    api
      .get<ApiResponse<Product[]>>('/products', { params: { search: query }, signal })
      .then(res => res.data.data),
};
