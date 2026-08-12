import type { ImageSourcePropType } from 'react-native';

export interface ProductCardProps {
  image: ImageSourcePropType;
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
