import { useCallback, useEffect, useState } from "react";
import { orderService } from "../services/orderService";
import Toast from "react-native-toast-message";
import { Order } from "@/shared/types/order";
import { getErrorMessage } from "@/shared/utils/getErrorMessage";

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
            const message = getErrorMessage(err, 'Sifarişləri yükləmək mümkün olmadı');
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