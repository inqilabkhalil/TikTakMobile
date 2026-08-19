import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Category } from '@/shared/types/category';

export const categoryService = {
  getCategories: (signal?: AbortSignal) =>
    api.get<ApiResponse<Category[]>>('/categories', { signal }).then(res => res.data.data),
};
