import { create } from 'zustand';
import { productService } from '@/features/products/services/productService';
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

      console.log('SEARCH API RESPONSE:', results);

      set({
        results,
        isLoading: false,
      });
    } catch (error: any) {
      console.log('SEARCH ERROR:', error?.response?.data || error?.message);

      set({
        isLoading: false,
        error: error?.response?.data?.message || 'Axtarış nəticələri yüklənmədi',
      });
    }
  },

  clearSearch: () => set({ ...INITIAL_SEARCH_STATE }),
}));
