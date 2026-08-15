import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ArrowRightIcon from '@/shared/assets/icons/arrow-right.svg';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelHorizontal,
} from '@/shared/utils/metrics';
import type { OrderCardProps } from '../../types/order';
import { formatOrderNumber } from '../../utils/orderHelpers';
import { useCardAnimation } from '../../hooks/useCardAnimation';

function OrderCard({ order, onPress, index = 0 }: OrderCardProps) {
  const { opacity } = useCardAnimation(index);

  return (
    <Animated.View
      style={{opacity}}
    >
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.7}
        onPress={() => onPress(order)}
      >
        <View style={styles.leftSection}>
          <Text style={styles.label}>No</Text>
          <Text style={styles.value} numberOfLines={1}>
            {formatOrderNumber(order.orderNumber)}
          </Text>
        </View>

        <View style={styles.middleSection}>
          <Text style={styles.label}>Çatdırılma ünvanı</Text>
          <Text style={styles.value} numberOfLines={1}>
            {order.address}
          </Text>
        </View>

        <View style={styles.rightSection}>
          <ArrowRightIcon
            width={pixelHorizontal(8.32)}
            height={pixelHorizontal(14)}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
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
    width: pixelHorizontal(56),
  },
  middleSection: {
    flex: 1,
    marginLeft: gapHorizontal(40),
  },
  rightSection: {
    marginRight: gapHorizontal(19),
  },
  label: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textSecondary,
    marginBottom: gapVertical(4),
    fontWeight: '400',
  },
  value: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    color: COLORS.textPrimary,
    fontWeight: '400',
  },
});

export default OrderCard;
