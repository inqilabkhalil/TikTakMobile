import { create } from 'zustand';
import { productService } from '@/features/products/services/productService';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import { INITIAL_SEARCH_STATE, type SearchState } from '../types/searchStore';

export const useSearchStore = create<SearchState>(set => ({
  ...INITIAL_SEARCH_STATE,

  // GET /api/tiktak/products?search={query}
  searchProducts: async query => {
    try {
      set({
        query,
        isLoading: true,
        error: null,
      });

      const results = await productService.searchProducts(query);

      set({
        results,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error, 'Axtarış nəticələri yüklənmədi'),
      });
    }
  },

  clearSearch: () => set({ ...INITIAL_SEARCH_STATE }),
}));
