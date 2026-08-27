import type { FastImageProps } from '@d11/react-native-fast-image';

export interface ProductDetailSheetProps {
  image: FastImageProps['source'];
  title: string;
  description?: string;
  price: number;
  inBasket: boolean;
  quantityKg: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}
