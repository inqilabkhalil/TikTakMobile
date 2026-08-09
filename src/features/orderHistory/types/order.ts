export type OrderStatus = 'PENDING' | 'PREPARING' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export interface OrderProduct {
    id: number;
    name: string;
    weight: string;
    price: string;
    img_url: string;
    quantity: number;
}

export interface Order {
    id: number;
    order_no: string;
    delivery_address: string;
    created_at: string;
    status: OrderStatus;
    product_count: number;
    subtotal: string;
    delivery_fee: string;
    products: OrderProduct[];
}

export interface OrderCardProps {
    order: Order;
    onPress: (order: Order) => void;
}

export interface OrderListProps {
    orders: Order[];
    onOrderPress: (order: Order) => void;
}
export interface OrderDetailInfoProps {
  order: Order;
}

export interface OrderDetailSheetProps {
  order: Order | null;   
}
export interface OrderProductItemProps {
  product: OrderProduct;
}