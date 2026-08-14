import type { ImageSourcePropType } from 'react-native';

export type BasketItem = {
  id: number;
  name: string;
  price: number;
  image: string | ImageSourcePropType;
  quantity: number;
};
