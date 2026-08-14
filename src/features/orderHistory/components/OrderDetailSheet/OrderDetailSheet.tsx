import { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import AppBottomSheet from '@/shared/components/AppBottomSheet';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import OrderDetailInfo from './OrderDetailInfo';
import OrderProductItem from './OrderProductItem';
import type { OrderDetailSheetProps } from '../../types/order';
import type { OrderProductItem as OrderProductItemType } from '@/shared/types/order';
import { COLORS } from '@/shared/constants/theme';

const OrderDetailSheet = forwardRef<BottomSheetModal, OrderDetailSheetProps>(
  ({ order }, ref) => {
    if (!order) {
      return (
        <AppBottomSheet ref={ref} snapPoints={['60%', '90%']}>
          <View />
        </AppBottomSheet>
      );
    }

    const renderItem = ({ item }: { item: OrderProductItemType }) => (
      <OrderProductItem item={item} />
    );

    const keyExtractor = (item: OrderProductItemType) => item.id.toString();

    const renderHeader = () => <OrderDetailInfo order={order} />;

    const renderSeparator = () => <View style={styles.separator}/>

    return (
      <AppBottomSheet ref={ref} snapPoints={['60%', '90%']}>
        <BottomSheetFlashList
          data={order.items}
          renderItem={renderItem}
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
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: gapVertical(12),
    marginHorizontal: gapHorizontal(16),
  },
});

export default OrderDetailSheet;
