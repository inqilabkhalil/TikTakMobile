export interface GridProduct {
  id: string;
  title: string;
  price: string;
  image: { uri: string };
  inBasket: boolean;
  quantityKg: number;
}

export interface ProductGridProps {
  products: GridProduct[];
  unitPrice: number;
  onAdd: (id: string) => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  ListHeaderComponent?: React.ReactElement;
}
