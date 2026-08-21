import type { GestureResponderEvent } from 'react-native';

export type ButtonType = 'primary' | 'ghost' | 'warning';

export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  type?: ButtonType;
  size?: 'default' | 'large';
  loading?: boolean;
  disabled?: boolean;
}
