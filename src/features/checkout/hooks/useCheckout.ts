import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';

import { useBasketStore } from '@/shared/store';
import {
  useUserAddress,
  useUserPhone,
  useUserFullName,
} from '@/shared/store/userStore';
import { useCheckoutStore } from '../store/checkoutStore';

import type { BasketStackParamList } from '@/shared/types/navigation';
import { PaymentMethod } from '@/shared/types/order';

type NavigationProp = NativeStackNavigationProp<
  BasketStackParamList,
  'Checkout'
>;

export function useCheckout() {
  const navigation = useNavigation<NavigationProp>();

  const fullName = useUserFullName();
  const address = useUserAddress();
  const phone = useUserPhone();

  const items = useBasketStore(state => state.items);
  const clearBasket = useBasketStore(state => state.clearBasket);

  const createOrder = useCheckoutStore(state => state.createOrder);
  const isLoading = useCheckoutStore(state => state.isLoading);

  const [note, setNote] = useState('');
  const [payment, setPayment] = useState<PaymentMethod>(PaymentMethod.CASH);

  const { subtotal, delivery, total } = useMemo(() => {
    const sub = items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    );
    const del = 0;
    return {
      subtotal: sub,
      delivery: del,
      total: sub + del,
    };
  }, [items]);

  const canSubmit = Boolean(address && phone) && !isLoading;

  useEffect(() => {
    if (items.length === 0) {
      navigation.goBack();
    }
  }, [items.length, navigation]);

  const handleSubmit = useCallback(async () => {
    if (!canSubmit) return;

    const order = await createOrder({
      paymentMethod: payment,
      note: note.trim(),
      address,
      phone,
    });

    if (order) {
      await clearBasket();
      navigation.navigate('OrderSuccess');
    } else {
      Toast.show({
        type: 'error',
        text1: 'Xəta',
        text2: 'Sifariş yaradılmadı, yenidən cəhd edin',
      });
    }
  }, [
    canSubmit,
    createOrder,
    payment,
    note,
    address,
    phone,
    clearBasket,
    navigation,
  ]);

  return {
    fullName,
    address,
    phone,
    note,
    setNote,
    payment,
    setPayment,
    items,
    subtotal,
    delivery,
    total,
    handleSubmit,
    isLoading,
    canSubmit,
  };
}
