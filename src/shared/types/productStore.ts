import type { Product } from './product';

export interface ProductState {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  fetchProductsByCategory: (categoryId: number, signal?: AbortSignal) => Promise<void>;
}

export const INITIAL_PRODUCT_STATE: Pick<ProductState, 'products' | 'isLoading' | 'error'> = {
  products: [],
  isLoading: false,
  error: null,
};
