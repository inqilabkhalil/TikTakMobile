gimport { create } from 'zustand';
import { favoriteService } from '@/features/favorites/services/favoriteService';
import { INITIAL_FAVORITE_STATE, type FavoriteState } from '../types/favoriteStore';

export const useFavoriteStore = create<FavoriteState>((set, get) => ({
  ...INITIAL_FAVORITE_STATE,

  fetchFavorites: async signal => {
    set({ isLoading: true, error: null });
    try {
      const favorites = await favoriteService.getFavorites(signal);
      set({ favorites, isLoading: false });
    } catch {
      set({ error: 'Sevimlilər yüklənmədi', isLoading: false });
    }
  },

  toggleFavorite: async productId => {
    await favoriteService.toggleFavorite(productId);
    await get().fetchFavorites();
  },

  isFavorite: productId => get().favorites.some(product => product.id === productId),
}));
