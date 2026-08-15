import { create } from 'zustand';
import { basketService } from '@/features/basket/services/basketService';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { BasketItem } from '@/features/basket/types/basket';

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

      const data = await basketService.getBasket();

      const items: BasketItem[] = (data?.items ?? []).map(item => ({
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

      await basketService.addToBasket(productId);

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

      await basketService.clearBasket();

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
