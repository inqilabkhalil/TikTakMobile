export interface SearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
  placeholder?: string;
}
