import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelHorizontal,
} from '@/shared/utils/metrics';
import type { OrderCardProps } from '../../types/order';

function OrderCard({ order, onPress }: OrderCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => onPress(order)}
    >
      <View style={styles.leftSection}>
        <Text style={styles.label}>No</Text>
        <Text style={styles.value}>{order.order_no}</Text>
      </View>

      <View style={styles.middleSection}>
        <Text style={styles.label}>Çatdırılma ünvanı</Text>
        <Text style={styles.value} numberOfLines={1}>
          {order.delivery_address}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <ArrowRightIcon
          width={pixelHorizontal(8.32)}
          height={pixelHorizontal(14)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Roboto',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: gapVertical(14),
    paddingHorizontal: gapHorizontal(16),
    backgroundColor: COLORS.white,
  },
  leftSection: {
    width: pixelHorizontal(80),
  },
  middleSection: {
    flex: 1,
    marginLeft: gapHorizontal(41),
  },
  rightSection: {
    marginLeft: gapHorizontal(28),
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    marginBottom: gapVertical(4),
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
});

export default OrderCard;