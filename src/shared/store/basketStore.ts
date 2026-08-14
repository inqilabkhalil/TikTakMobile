import { create } from 'zustand';
import { api } from '@/shared/services/api';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { BasketItem } from '@/features/basket/types/basket';

interface BasketApiItem {
  product: { id: number; title: string; price: string; img_url: string };
  quantity: number;
}

type BasketStore = {
  items: BasketItem[];
  isLoading: boolean;
  error: string | null;

  getBasket: () => Promise<void>;
  addToBasket: (productId: number) => Promise<void>;
  increment: (productId: number) => Promise<void>;
  decrement: (id: number) => void;
  removeFromBasket: (id: number) => void;
  clearBasket: () => Promise<void>;
};

export const useBasketStore = create<BasketStore>(set => ({
  items: [],
  isLoading: false,
  error: null,

  // GET /api/tiktak/basket
  getBasket: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      const response = await api.get('/basket');

      const apiItems: BasketApiItem[] = response.data?.data?.items ?? [];

      const items: BasketItem[] = apiItems.map(item => ({
        id: item.product.id,
        name: item.product.title,
        price: Number(item.product.price),
        image: item.product.img_url,
        quantity: item.quantity,
      }));

      set({
        items,
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error, 'Basket yüklənmədi'),
      });
    }
  },

  // POST /api/tiktak/basket/{productId}/add
  addToBasket: async productId => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await api.post(`/basket/${productId}/add`);

      // API-dən səbətin son vəziyyətini yenidən götürürük
      await useBasketStore.getState().getBasket();

      set({
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error, 'Məhsul səbətə əlavə olunmadı'),
      });
    }
  },

  // + düyməsi
  // Yenə add endpointindən istifadə edir
  increment: async productId => {
    await useBasketStore.getState().addToBasket(productId);
  },

  // REMOVE endpointini hələ dəqiq bilmədiyimiz üçün
  // müvəqqəti lokal işləyir
  decrement: id =>
    set(state => ({
      items: state.items
        .map(item =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter(item => item.quantity > 0),
    })),

  removeFromBasket: id =>
    set(state => ({
      items: state.items.filter(item => item.id !== id),
    })),

  // DELETE /api/tiktak/basket/clear
  clearBasket: async () => {
    try {
      set({
        isLoading: true,
        error: null,
      });

      await api.delete('/basket/clear');

      set({
        items: [],
        isLoading: false,
      });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error, 'Basket təmizlənmədi'),
      });
    }
  },
}));
