import type { FastImageProps } from '@d11/react-native-fast-image';

export type BasketItem = {
  id: number;
  name: string;
  price: number;
  image: string | FastImageProps['source'];
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