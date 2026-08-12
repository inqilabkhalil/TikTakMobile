import type { BasketItem } from '../types/basket';

const productImage = require('../../../shared/assets/images/alma.png');

export const MOCK_BASKET: BasketItem[] = [
  {
    id: 1,
    name: 'Portağal 1 kq',
    price: 2.35,
    image: productImage,
    quantity: 2,
  },
  {
    id: 2,
    name: 'Alma 1 kq',
    price: 1.85,
    image: productImage,
    quantity: 1,
  },
];

export default MOCK_BASKET;
