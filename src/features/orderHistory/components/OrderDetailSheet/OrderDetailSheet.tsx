import React, { forwardRef } from 'react';
import { StyleSheet, View } from 'react-native';
import type { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import AppBottomSheet from '@/shared/components/AppBottomSheet';
import { gapHorizontal, gapVertical } from '@/shared/utils/metrics';
import OrderDetailInfo from './OrderDetailInfo';
import OrderProductItem from './OrderProductItem';
import type { OrderDetailSheetProps } from '../../types/order';
import { COLORS } from '@/shared/constants/theme';

const SNAP_POINTS = ['75%'];

const OrderDetailSheet = forwardRef<BottomSheetModal, OrderDetailSheetProps>(
  ({ order }, ref) => {
    return (
      <AppBottomSheet ref={ref} snapPoints={SNAP_POINTS}>
        {order ? (
          <BottomSheetScrollView
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            bounces={false}
            overScrollMode="never"
          >
            <OrderDetailInfo order={order} />

            {order.items.map((item, index) => (
              <React.Fragment key={String(item.id)}>
                <OrderProductItem item={item} />
                {index < order.items.length - 1 ? (
                  <View style={styles.separator} />
                ) : null}
              </React.Fragment>
            ))}
          </BottomSheetScrollView>
        ) : (
          <View style={styles.empty} />
        )}
      </AppBottomSheet>
    );
  },
);

OrderDetailSheet.displayName = 'OrderDetailSheet';

const styles = StyleSheet.create({
  empty: {
    minHeight: 120,
  },
  listContent: {
    paddingHorizontal: gapHorizontal(16),
    paddingBottom: gapVertical(32),
  },
  separator: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: gapVertical(12),
  },
});

export default OrderDetailSheet;