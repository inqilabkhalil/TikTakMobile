import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';

export interface CategoryCardProps {
  image: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
