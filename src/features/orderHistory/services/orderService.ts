import { api } from "@/shared/services/api";
import { ApiResponse } from "@/shared/types/api";
import { Order } from "@/shared/types/order";


const ORDERS_ENDPOINT = '/orders/user';

export const orderService = {
    getOrders: () => 
        api
    .get<ApiResponse<Order[]>>(ORDERS_ENDPOINT)
    .then(res => res.data.data),
}