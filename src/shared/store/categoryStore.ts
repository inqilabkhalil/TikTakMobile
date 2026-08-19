import { create } from 'zustand';
import { categoryService } from '@/features/category/services/categoryService';
import { INITIAL_CATEGORY_STATE, type CategoryState } from '../types/categoryStore';

export const useCategoryStore = create<CategoryState>(set => ({
  ...INITIAL_CATEGORY_STATE,

  fetchCategories: async signal => {
    set({ isLoading: true, error: null });
    try {
      const categories = await categoryService.getCategories(signal);
      set({ categories, isLoading: false });
    } catch {
      set({ error: 'Kateqoriyalar yüklənmədi', isLoading: false });
    }
  },
}));
