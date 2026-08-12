import type { Product } from './product';

export interface FavoriteState {
  favorites: Product[];
  isLoading: boolean;
  error: string | null;
  fetchFavorites: () => Promise<void>;
  toggleFavorite: (productId: number) => Promise<void>;
  isFavorite: (productId: number) => boolean;
}

export const INITIAL_FAVORITE_STATE: Pick<FavoriteState, 'favorites' | 'isLoading' | 'error'> = {
  favorites: [],
  isLoading: false,
  error: null,
};
