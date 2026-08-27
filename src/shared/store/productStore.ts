import axios from 'axios';
import { create } from 'zustand';
import { productService } from '@/features/products/services/productService';
import {
  INITIAL_PRODUCT_STATE,
  type ProductState,
} from '../types/productStore';

export const useProductStore = create<ProductState>(set => ({
  ...INITIAL_PRODUCT_STATE,

  fetchProductsByCategory: async (categoryId, signal) => {
    set({ isLoading: true, error: null });
    try {
      const products = await productService.getProductsByCategory(categoryId, signal);
      // Backend currently ignores the `categoryId` query param and always
      // returns the full product list — filter client-side so the screen
      // only shows products that actually belong to the selected category.
      const filtered = products.filter(
        product => product.category.id === categoryId,
      );
      set({ products: filtered, isLoading: false });
    } catch (error: unknown) {
      // A newer category selection superseded this one — the caller already
      // owns the current loading/error state, so don't clobber it here.
      if (axios.isCancel(error)) return;

      set({ error: 'Məhsullar yüklənmədi', isLoading: false });
    }
  },
}));
