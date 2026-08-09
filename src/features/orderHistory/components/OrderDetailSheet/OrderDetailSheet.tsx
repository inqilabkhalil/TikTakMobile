import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import AppBottomSheet from '@/shared/components/AppBottomSheet';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import OrderDetailInfo from './OrderDetailInfo';
import OrderProductItem from './OrderProductItem';
import type { OrderDetailSheetProps, OrderProduct } from '../../types/order';

const OrderDetailSheet = forwardRef<BottomSheetModal, OrderDetailSheetProps>(
  ({ order }, ref) => {
    if (!order) {
      return (
        <AppBottomSheet ref={ref} snapPoints={['60%', '90%']}>
          <View />
        </AppBottomSheet>
      );
    }

    const renderProduct = ({ item }: { item: OrderProduct }) => (
      <OrderProductItem product={item} />
    );

    const keyExtractor = (item: OrderProduct) => item.id.toString();

    const renderHeader = () => <OrderDetailInfo order={order} />;

    const renderSeparator = () => <View style={styles.separator}/>

    return (
      <AppBottomSheet ref={ref} snapPoints={['60%', '90%']}>
        <BottomSheetFlashList
          data={order.products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          ItemSeparatorComponent={renderSeparator}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </AppBottomSheet>
    );
  },
);

OrderDetailSheet.displayName = 'OrderDetailSheet';

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: gapHorizontal(16),
    paddingBottom: gapVertical(20),
  },
   separator: {
    height: gapVertical(12),
  },
});

export default OrderDetailSheet;
