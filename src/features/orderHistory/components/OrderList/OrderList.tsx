import { StyleSheet, View } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import OrderCard from '../OrderCard';
import { COLORS } from '@/shared/constants/theme';
import type { OrderListProps} from '../../types/order';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import { Order } from '@/shared/types/order';

function OrderList({ orders, onOrderPress }: OrderListProps) {
  const renderItem = ({ item }: { item: Order }) => (
    <OrderCard order={item} onPress={onOrderPress} />
  );

  const keyExtractor = (item: Order) => item.id.toString();

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <FlashList
        data={orders}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    paddingHorizontal: gapHorizontal(16),
    paddingTop: gapVertical(16),
  },
  separator: {
    height: gapVertical(16),
  },
});

export default OrderList;