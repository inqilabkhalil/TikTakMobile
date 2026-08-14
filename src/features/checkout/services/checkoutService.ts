import { api } from '@/shared/services/api';
import type { CheckoutRequest, CheckoutResponse } from '../types/checkout';

const CHECKOUT_ENDPOINT = '/orders/checkout';

export const checkoutService = {
  createOrder: (payload: CheckoutRequest): Promise<CheckoutResponse> =>
    api
      .post<CheckoutResponse>(CHECKOUT_ENDPOINT, payload)
      .then(res => res.data),
};