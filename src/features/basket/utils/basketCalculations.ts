import type { BasketItem } from '../types/basket';

export function calculateSubtotal(items: BasketItem[]) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}
