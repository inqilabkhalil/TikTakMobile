import { ApiResponse } from "@/shared/types/api";
import { Order, PaymentMethod } from "@/shared/types/order";

export interface CheckoutRequest {
    paymentMethod: PaymentMethod;
    note: string;
    address: string;
    phone: string;
}

export type CheckoutResponse = ApiResponse<Order>;

export interface CheckoutState {
    order: Order | null;
    isLoading: boolean;
    error: string | null;

    createOrder: (payload: CheckoutRequest) => Promise<Order | null>;
    resetOrder: () => void;
}

