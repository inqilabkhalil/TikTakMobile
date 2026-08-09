import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import OrderCard from '../OrderCard';
import { COLORS } from '@/shared/constants/theme';
import type { OrderListProps, Order } from '../../types/order';

function OrderList({ orders, onOrderPress }: OrderListProps) {
  // FlashList üçün renderItem funksiyası
  const renderItem = ({ item }: { item: Order }) => (
    <OrderCard order={item} onPress={onOrderPress} />
  );

  const keyExtractor = (item: Order) => item.id.toString();

  return (
    <View style={styles.container}>
      <FlashList
        data={orders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
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

export default OrderList;