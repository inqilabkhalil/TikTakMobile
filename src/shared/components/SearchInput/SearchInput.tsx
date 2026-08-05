import SearchBar from '@ant-design/react-native/lib/search-bar';
import type { SearchInputProps } from '../../types/searchInput';

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
