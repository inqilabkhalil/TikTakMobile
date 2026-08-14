import { StyleSheet, Text, View } from 'react-native';
import { pixelHorizontal, pixelFont } from '../../utils/metrics';
import { COLORS } from '@/shared/constants/theme';
import { CountBadgeProps } from '@/shared/types/countBadge';


function CountBadge({ count }: CountBadgeProps) {
  if (count <= 0) return null;

  const displayCount = count > 99 ? '99+' : String(count);

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{displayCount}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -pixelHorizontal(6),
    right: -pixelHorizontal(6),
    minWidth: pixelHorizontal(18),
    height: pixelHorizontal(18),
    borderRadius: pixelHorizontal(9),
    backgroundColor: COLORS.error,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: pixelHorizontal(4),
  },
  text: {
    color: COLORS.white,
    fontSize: pixelFont(10),
    fontWeight: '700',
    lineHeight: pixelFont(12),
  },
});

export default CountBadge;