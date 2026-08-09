import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, pixelFont, pixelWidth, pixelHeight } from '../../utils/metrics';
import type { OrderSummaryBarProps } from '../../types/orderSummaryBar';

function OrderSummaryBar({ itemCount, totalPrice, onPress }: OrderSummaryBarProps) {
  if (itemCount <= 0) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.countBadge}>
        <Text style={styles.countText}>{itemCount}</Text>
      </View>
      <Text style={styles.label}>Sifarişlər</Text>
      <Text style={styles.price}>₼{totalPrice.toFixed(2)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: pixelWidth(350),
    height: pixelHeight(48),
    borderRadius: pixelWidth(12),
    backgroundColor: COLORS.primary,
    paddingHorizontal: gapHorizontal(12),
  },
  countBadge: {
    width: pixelWidth(28),
    height: pixelWidth(28),
    borderRadius: pixelWidth(14),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(13),
    color: COLORS.primary,
  },
  label: {
    flex: 1,
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(14),
    color: COLORS.white,
    marginLeft: gapHorizontal(10),
  },
  price: {
    fontFamily: 'Roboto-Bold',
    fontSize: pixelFont(14),
    color: COLORS.white,
  },
});

export default OrderSummaryBar;
