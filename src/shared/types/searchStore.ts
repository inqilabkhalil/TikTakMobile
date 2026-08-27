import type { Product } from './product';

export interface SearchState {
  query: string;
  results: Product[];
  isLoading: boolean;
  error: string | null;
  searchProducts: (query: string, signal?: AbortSignal) => Promise<void>;
  clearSearch: () => void;
}

export const INITIAL_SEARCH_STATE: Pick<
  SearchState,
  'query' | 'results' | 'isLoading' | 'error'
> = {
  query: '',
  results: [],
  isLoading: false,
  error: null,
};
