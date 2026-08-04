import SearchBar from '@ant-design/react-native/lib/search-bar';

export interface SearchInputProps {
  value?: string;
  onChangeText?: (text: string) => void;
  onSearch?: (text: string) => void;
  placeholder?: string;
}

function SearchInput({
  value,
  onChangeText,
  onSearch,
  placeholder = 'Axtarış',
}: SearchInputProps) {
  return (
    <SearchBar
      value={value}
      onChange={onChangeText}
      onSubmit={onSearch}
      placeholder={placeholder}
    />
  );
}

export default SearchInput;
