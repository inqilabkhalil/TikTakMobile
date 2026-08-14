import { Product } from "@/shared/types/api";

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'CARD' | 'CASH';


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
