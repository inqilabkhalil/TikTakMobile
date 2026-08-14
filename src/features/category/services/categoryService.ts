import { api } from '@/shared/services/api';
import type { ApiResponse } from '@/shared/types/api';
import type { Category } from '@/shared/types/category';

export const categoryService = {
  getCategories: () =>
    api.get<ApiResponse<Category[]>>('/categories').then(res => res.data.data),
};
