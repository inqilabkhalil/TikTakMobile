export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'CARD' | 'CASH';

export interface Category {
  id: number;
  name: string;
  img_url: string;
  description: string;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  img_url: string;
  description: string;
  price: string;
  type: string;
  created_at: string;
  category: Category;
}

export interface OrderProductItem {
  id: number;
  quantity: number;
  total_price: string;
  product: Product;
}

export interface Order {
    id: number;
    orderNumber: string;
    total: string;
    deliveryFee: string;
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    note: string;
    address: string;
    phone: string;
    createdAt: string;
    updatedAt: string;
    items: OrderProductItem[];
}

export interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
}

export interface OrderListProps {
  orders: Order[];
  onOrderPress: (order: Order) => void;
}

export interface OrderProductItemProps {
  item: OrderProductItem;
}

export interface OrderDetailInfoProps {
  order: Order | null;
}

export interface OrderDetailSheetProps {
  order: Order | null;
}

export interface InfoRowProps {
  leftLabel: string;
  leftValue: string;
  leftValueColor?: string;
  rightLabel: string;
  rightValue: string;
}