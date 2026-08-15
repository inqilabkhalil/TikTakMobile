import { Product } from "@/shared/types/product";
import { Category } from "@/shared/types/category";

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'ON_THE_WAY' | 'DELIVERED' | 'CANCELLED';

export type PaymentMethod = 'CARD' | 'CASH';

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
