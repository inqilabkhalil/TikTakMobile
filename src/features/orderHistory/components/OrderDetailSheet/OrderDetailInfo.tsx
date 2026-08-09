import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
} from '@/shared/utils/metrics';
import {
  formatOrderDate,
  getStatusColor,
  getStatusText,
} from '../../utils/orderHelpers';
import type { OrderDetailInfoProps } from '../../types/order';


interface InfoRowProps {
  leftLabel: string;
  leftValue: string;
  leftValueColor?: string;
  rightLabel: string;
  rightValue: string;
}

function InfoRow({
  leftLabel,
  leftValue,
  leftValueColor,
  rightLabel,
  rightValue,
}: InfoRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.column}>
        <Text style={styles.label}>{leftLabel}</Text>
        <Text
          style={[styles.value, leftValueColor && { color: leftValueColor }]}
          numberOfLines={2}
        >
          {leftValue}
        </Text>
      </View>

      <View style={styles.column}>
        <Text style={styles.label}>{rightLabel}</Text>
        <Text style={styles.value} numberOfLines={2}>
          {rightValue}
        </Text>
      </View>
    </View>
  );
}


function OrderDetailInfo({ order }: OrderDetailInfoProps) {
  return (
    <View style={styles.container}>
      <InfoRow
        leftLabel="Tarix"
        leftValue={formatOrderDate(order.created_at)}
        rightLabel="No"
        rightValue={order.order_no}
      />

      <InfoRow
        leftLabel="Məhsul sayı"
        leftValue={order.product_count.toString()}
        rightLabel="Çatdırılma ünvanı"
        rightValue={order.delivery_address}
      />

      <InfoRow
        leftLabel="Status"
        leftValue={getStatusText(order.status)}
        leftValueColor={getStatusColor(order.status)}
        rightLabel="Subtotal/Çatdırılma"
        rightValue={`${order.subtotal}/${order.delivery_fee}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: gapHorizontal(16),
    paddingBottom: gapVertical(16),
  },
  row: {
    flexDirection: 'row',
    marginBottom: gapVertical(16),
  },
  column: {
    flex: 1,
    paddingRight: gapHorizontal(8),
  },
  label: {
    fontSize: pixelFont(12),
    color: COLORS.textSecondary,
    marginBottom: gapVertical(4),
  },
  value: {
    fontSize: pixelFont(14),
    color: COLORS.textDark,
    fontWeight: '500',
  },
});

export default OrderDetailInfo;