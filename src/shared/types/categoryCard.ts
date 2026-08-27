import type { StyleProp, ViewStyle } from 'react-native';
import type { FastImageProps } from '@d11/react-native-fast-image';

export interface CategoryCardProps {
  image: FastImageProps['source'];
  title: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
