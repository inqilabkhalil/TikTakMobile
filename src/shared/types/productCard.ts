import type { FastImageProps } from '@d11/react-native-fast-image';

export interface ProductCardProps {
  image: FastImageProps['source'];
  title: string;
  price: string;
  inBasket: boolean;
  quantityLabel: string;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
  onPress?: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}
