import type { Category } from './category';

export interface CategoryState {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const INITIAL_CATEGORY_STATE: Pick<CategoryState, 'categories' | 'isLoading' | 'error'> = {
  categories: [],
  isLoading: false,
  error: null,
};
