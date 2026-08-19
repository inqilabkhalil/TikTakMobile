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
    } catch {
      set({ error: 'Məhsullar yüklənmədi', isLoading: false });
    }
  },
}));
