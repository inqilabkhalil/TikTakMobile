import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import AppBottomSheet from '@/shared/components/AppBottomSheet';
import { COLORS } from '@/shared/constants/theme';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import OrderDetailInfo from './OrderDetailInfo';
import OrderProductItem from './OrderProductItem';
import type { OrderDetailSheetProps, OrderProduct } from '../../types/order';

const OrderDetailSheet = forwardRef<BottomSheetModal, OrderDetailSheetProps>(
  ({ order }, ref) => {
    if (!order) {
      return (
        <AppBottomSheet ref={ref} snapPoints={['50%', '90%']}>
          <View />
        </AppBottomSheet>
      );
    }

    const renderProduct = ({ item }: { item: OrderProduct }) => (
      <OrderProductItem product={item} />
    );

    const keyExtractor = (item: OrderProduct) => item.id.toString();

    const renderHeader = () => (
      <>
        <OrderDetailInfo order={order} />
        <View style={styles.divider} />
      </>
    );

    return (
      <AppBottomSheet ref={ref} snapPoints={['50%', '90%']}>
        <BottomSheetFlashList
          data={order.products}
          renderItem={renderProduct}
          keyExtractor={keyExtractor}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </AppBottomSheet>
    );
  },
);

OrderDetailSheet.displayName = 'OrderDetailSheet';

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: gapHorizontal(16),
    marginBottom: gapVertical(12),
  },
  listContent: {
    paddingHorizontal: gapHorizontal(16),
    paddingBottom: gapVertical(20),
  },
});

export default OrderDetailSheet;
