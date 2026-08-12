import type { ImageSourcePropType } from 'react-native';

export interface ProductDetailSheetProps {
  image: ImageSourcePropType;
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
