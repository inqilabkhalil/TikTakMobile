import { create } from 'zustand';
import { basketService } from '@/features/basket/services/basketService';
import { getErrorMessage } from '@/shared/utils/getErrorMessage';
import type { BasketItem } from '@/features/basket/types/basket';

type BasketStore = {
  items: BasketItem[];
  isLoading: boolean;  
  isUpdating: boolean;
  error: string | null;

  getBasket: () => Promise<void>;
  addToBasket: (productId: number) => Promise<void>;
  increment: (productId: number) => Promise<void>;
  decrement: (id: number) => Promise<void>;
  removeFromBasket: (id: number) => void;
  clearBasket: () => Promise<void>;
};

export const useBasketStore = create<BasketStore>((set, get) => ({
  items: [],
  isLoading: false,
  isUpdating: false,
  error: null,

  // GET /api/tiktak/basket
  getBasket: async () => {
    try {
      const hasItems = get().items.length > 0;
      set({
        isLoading: !hasItems,
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
  addToBasket: async (productId: number) => {
    const prevItems = get().items;
    const existingItem = prevItems.find(i => i.id === productId);

    if (existingItem) {
      set({
        items: prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
        isUpdating: true,
        error: null,
      });
    } else {
      set({ isUpdating: true, error: null });
    }

    try {
      await basketService.addToBasket(productId);

      if (!existingItem) {
        const data = await basketService.getBasket();
        const items: BasketItem[] = (data?.items ?? []).map(item => ({
          id: item.product.id,
          name: item.product.title,
          price: Number(item.product.price),
          image: item.product.img_url,
          quantity: item.quantity,
        }));
        set({ items });
      }

      set({ isUpdating: false });
    } catch (error: unknown) {
      set({
        items: prevItems,
        isUpdating: false,
        error: getErrorMessage(error, 'Məhsul səbətə əlavə olunmadı'),
      });
    }
  },

  increment: async (productId: number) => {
    await get().addToBasket(productId);
  },

  decrement: async (id: number) => {
    set(state => ({
      items: state.items
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter(item => item.quantity > 0),
    }));
  },

  removeFromBasket: (id: number) =>
    set(state => ({
      items: state.items.filter(item => item.id !== id),
    })),

  // DELETE /api/tiktak/basket/clear
  clearBasket: async () => {
    try {
      set({ isLoading: true, error: null });
      await basketService.clearBasket();
      set({ items: [], isLoading: false });
    } catch (error: unknown) {
      set({
        isLoading: false,
        error: getErrorMessage(error, 'Basket təmizlənmədi'),
      });
    }
  },
}));