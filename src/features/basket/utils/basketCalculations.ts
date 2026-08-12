import type { BasketItem } from '../types/basket';

export function calculateSubtotal(items: BasketItem[]) {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}

export function calculateTotal(items: BasketItem[], delivery = 0) {
  const subtotal = calculateSubtotal(items);
  return subtotal + delivery;
}
