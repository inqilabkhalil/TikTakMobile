import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import BackNavigate from '@/shared/components/BackNavigate';
import OrderList from '@/features/orderHistory/components/OrderList';
import { MOCK_ORDERS } from '@/features/orderHistory/mock/orders';
import { COLORS } from '@/shared/constants/theme';
import type { Order } from '@/features/orderHistory/types/order';
import OrderDetailSheet from '@/features/orderHistory/components/OrderDetailSheet/OrderDetailSheet';

function OrderHistoryScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);     
    sheetRef.current?.present();  
  };

  const handleSheetDismiss = () => {
    setSelectedOrder(null);       
  };

  return (
    <View style={styles.container}>
      <BackNavigate title="Sifariş tarixçəsi" />

      <OrderList orders={MOCK_ORDERS} onOrderPress={handleOrderPress} />

      <OrderDetailSheet
        ref={sheetRef}
        order={selectedOrder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});

export default OrderHistoryScreen;