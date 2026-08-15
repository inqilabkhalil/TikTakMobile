import { Order, OrderProductItem } from "@/shared/types/order";

export interface OrderCardProps {
  order: Order;
  onPress: (order: Order) => void;
  index?: number;
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