import { create } from "zustand";
import { CheckoutState } from "../types/checkout";
import { checkoutService } from "../services/checkoutService";
import { AxiosError } from "axios";

const INITIAL_STATE = {
    order: null,
    isLoading: false,
    error: null,
};

export const useCheckoutStore = create<CheckoutState>(set => ({
    ...INITIAL_STATE,

    createOrder: async payload => {
        set({ isLoading: true, error: null});

        try {
            const response = await checkoutService.createOrder(payload);
            set({ order: response.data, isLoading: false });
            return response.data;
        } catch (err) {
            const axiosError = err as AxiosError<{ message?: string}>;
            const message = axiosError.response?.data?.message || 'Sifariş yaradılmadı, yenidən cəhd edin';
            set({ error: message, isLoading: false });
            return null;
        }
    },

    resetOrder: () => set(INITIAL_STATE),
}))