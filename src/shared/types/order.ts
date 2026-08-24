import { Product } from "@/shared/types/product";
import { Category } from "@/shared/types/category";

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PREPARING = 'PREPARING',
  READY = 'READY',
  ON_THE_WAY = 'ON_THE_WAY',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentMethod {
  CARD = 'CARD',
  CASH = 'CASH',
}

// Order line items carry the full category object, unlike the lightweight
// {id,name} summary the product catalog endpoints return.
type OrderProduct = Omit<Product, 'category'> & { category: Category };

export interface OrderProductItem {
  id: number;
  quantity: number;
  total_price: string;
  product: OrderProduct;
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
