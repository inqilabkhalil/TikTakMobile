import { useCallback, useEffect, useState } from "react";
import { Order } from "../types/order";
import { orderService } from "../services/orderService";
import Toast from "react-native-toast-message";

export function useOrders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await orderService.getOrders();
            setOrders(data);
        } catch (err) {
            const message = 'Sifarişləri yükləmək mümkün olmadı';
            setError(message);
            Toast.show({
                type: 'error',
                text1: 'Xəta',
                text2: message,
            });
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    return {
        orders,
        isLoading,
        error,
        refetch: fetchOrders,
    }
}