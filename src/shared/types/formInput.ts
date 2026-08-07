import type { KeyboardTypeOptions } from 'react-native';

export interface FormInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  required?: boolean;
  editable?: boolean;
  maxLength?: number;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export interface FormInputLabelProps {
  text: string;
  required?: boolean;
}

export interface FormInputErrorProps {
  message: string;
}