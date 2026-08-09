import type { ImageSourcePropType } from 'react-native';

export interface Product {
  id: string;
  title: string;
  unitPrice: number;
  image: ImageSourcePropType;
  inBasket: boolean;
  quantityKg: number;
}
