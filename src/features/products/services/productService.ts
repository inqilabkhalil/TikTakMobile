import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Product } from '@/shared/types/product';

export const productService = {
  // Backend routes `/products/{id}` to "get single product by id", not by
  // category — the category filter is a query param on the list endpoint.
  getProductsByCategory: (categoryId: number) =>
    api
      .get<ApiResponse<Product[]>>('/api/tiktak/products', { params: { categoryId } })
      .then(res => res.data.data),

  searchProducts: (query: string) =>
    api
      .get<ApiResponse<Product[]>>('/api/tiktak/products', { params: { search: query } })
      .then(res => res.data.data),
};
