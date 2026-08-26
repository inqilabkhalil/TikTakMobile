export interface PriceSummaryBarProps {
  subtotal: number;
  delivery?: number;
  total: number;
  buttonTitle: string;
  onButtonPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
};