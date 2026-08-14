import { useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import BackNavigate from '@/shared/components/BackNavigate';
import OrderList from '@/features/orderHistory/components/OrderList';
import { COLORS } from '@/shared/constants/theme';
import OrderDetailSheet from '@/features/orderHistory/components/OrderDetailSheet/OrderDetailSheet';
import EmptyState from '@/shared/components/EmptyState';
import { useOrders } from '@/features/orderHistory/hooks/useOrders';
import { Order } from '@/shared/types/order';

function OrderHistoryScreen() {
  const sheetRef = useRef<BottomSheetModal>(null);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const { orders, isLoading } = useOrders();
  
  const handleOrderPress = (order: Order) => {
    setSelectedOrder(order);     
    sheetRef.current?.present();  
  };

  if (isLoading && orders.length === 0) {
    return (
      <View style={styles.container}>
        <BackNavigate title='Sifariş tarixçəsi'/>
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size="large" color={COLORS.primary}/>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <BackNavigate title="Sifariş tarixçəsi" />

      {orders.length === 0 ? (
        <EmptyState
        title='Hələ heç bir sifariş verməmisiniz'
        subtitle='Sifarişləriniz burada görünəcək'
        />
      ) : (
        <OrderList orders={orders} onOrderPress={handleOrderPress} />
      )}
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
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default OrderHistoryScreen;