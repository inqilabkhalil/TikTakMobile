export interface CategoryChipItem {
  id: string;
  label: string;
}

export interface CategoryChipsProps {
  categories: CategoryChipItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}