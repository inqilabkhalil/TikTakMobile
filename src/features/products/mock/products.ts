import type { Product } from '../types/product';

const PRODUCT_IMAGE = require('../../../shared/assets/images/alma.png');

export const PRODUCTS: Product[] = Array.from({ length: 6 }, (_, index) => ({
  id: `product-${index + 1}`,
  title: 'Qizil əhmədi alması',
  unitPrice: 3.3,
  image: PRODUCT_IMAGE,
  inBasket: false,
  quantityKg: 0,
}));
