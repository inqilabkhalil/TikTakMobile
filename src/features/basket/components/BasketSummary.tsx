import React from 'react';
import type { Props } from '../types/basket';
import { calculateSubtotal } from '../utils/basketCalculations';
import { useNavigation } from '@react-navigation/native';
import PriceSummaryBar from '@/shared/components/PriceSummaryBar/PriceSummaryBar';

function BasketSummary({ items, onCheckout }: Props) {
  const navigation = useNavigation();
  const subtotal = calculateSubtotal(items);
  const delivery: number = 0;
  const total = subtotal + delivery;

  const handleCheckoutPress = () => {
    // @ts-ignore navigation type
    navigation.navigate('Checkout');
    if (onCheckout) onCheckout();
  };

  return (
    <PriceSummaryBar
      subtotal={subtotal}
      delivery={delivery}
      total={total}
      buttonTitle="Sifarişi tamamla"
      onButtonPress={handleCheckoutPress}
    />
  );
}

export default BasketSummary;
