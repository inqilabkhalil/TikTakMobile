import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
} from '@/shared/utils/metrics';
import {
  formatDeliveryFee,
  formatOrderDate,
  formatOrderNumber,
  formatTotal,
  getPaymentMethodText,
  getStatusColor,
  getStatusText,
} from '../../utils/orderHelpers';
import type { InfoRowProps, OrderDetailInfoProps } from '../../types/order';

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
  if (!order) return null;
  const subtotalDelivery = `${formatTotal(order.total)} / ${formatDeliveryFee(order.deliveryFee)}`
  return (
    <View style={styles.container}>
      <InfoRow
        leftLabel="Tarix"
        leftValue={formatOrderDate(order.createdAt)}
        rightLabel="No"
        rightValue={formatOrderNumber(order.orderNumber)}
      />

      <InfoRow
        leftLabel="Məhsul sayı"
        leftValue={order.items.length.toString()}
        rightLabel="Çatdırılma ünvanı"
        rightValue={order.address}
      />

      <InfoRow
        leftLabel="Status"
        leftValue={getStatusText(order.status)}
        leftValueColor={getStatusColor(order.status)}
        rightLabel="Subtotal/Çatdırılma"
        rightValue={subtotalDelivery}
      />

      <InfoRow
      leftLabel='Ödəniş növü'
      leftValue={getPaymentMethodText(order.paymentMethod)}
      rightLabel='Telefon'
      rightValue={order.phone}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    paddingHorizontal: gapHorizontal(16),
    paddingTop: gapVertical(24),
    paddingBottom: gapVertical(20),
  },
  row: {
    flexDirection: 'row',
    marginBottom: gapVertical(20),
  },
  column: {
    flex: 1,
    paddingRight: gapHorizontal(8),
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textDark,
    marginBottom: gapVertical(6),
    fontWeight: '600',
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    fontWeight: '300',
  },
});

export default OrderDetailInfo;