import type { GestureResponderEvent } from 'react-native';

export type ButtonType = 'primary' | 'ghost' | 'warning';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  loading?: boolean;
  disabled?: boolean;
}
