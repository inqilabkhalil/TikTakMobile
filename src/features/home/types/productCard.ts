export interface ProductCardProps {
  image: { uri: string };
  title: string;
  price: string;
  inBasket: boolean;
  quantityLabel: string;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}
