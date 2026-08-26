import type { ImageSourcePropType } from 'react-native';

export type BasketItem = {
  id: number;
  name: string;
  price: number;
  image: string | ImageSourcePropType;
  quantity: number;
};

export interface BasketApiItem {
  product: { id: number; title: string; price: string; img_url: string };
  quantity: number;
}

export interface BasketApiData {
  items: BasketApiItem[];
}

export interface Props {
  items: BasketItem[];
  onCheckout: () => void;
};