import { useCallback, useEffect, useMemo } from 'react';
import { useBasketStore } from '@/shared/store';

export function useBasketActions() {
  const items = useBasketStore(state => state.items);
  const getBasket = useBasketStore(state => state.getBasket);
  const addToBasket = useBasketStore(state => state.addToBasket);
  const increment = useBasketStore(state => state.increment);
  const decrement = useBasketStore(state => state.decrement);

  useEffect(() => {
    getBasket();
  }, [getBasket]);

  const getQuantity = useCallback(
    (id: number) => items.find(item => item.id === id)?.quantity ?? 0,
    [items],
  );

  const handleAdd = useCallback(
    (id: number) => {
      addToBasket(id);
    },
    [addToBasket],
  );

  const handleIncrement = useCallback(
    (id: number) => {
      increment(id);
    },
    [increment],
  );

  const handleDecrement = useCallback(
    (id: number) => {
      decrement(id);
    },
    [decrement],
  );

  const itemCount = items.length;
  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  return {
    items,
    itemCount,
    totalPrice,
    getQuantity,
    handleAdd,
    handleIncrement,
    handleDecrement,
  };
}
