import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, pixelFont, pixelWidth, pixelHeight } from '../../utils/metrics';
import type { CategoriesBannerProps } from '../../types/categoriesBanner';

function GridIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth={2} />
      <Rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth={2} />
      <Rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth={2} />
      <Rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

function CategoriesBanner({
  label = 'Əsas kateqoriyalara bax',
  onPress,
}: CategoriesBannerProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrapper}>
        <GridIcon size={pixelFont(18)} color={COLORS.white} />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    width: pixelWidth(345),
    height: pixelHeight(50),
    paddingHorizontal: gapHorizontal(16),
    marginTop: 16,
    shadowColor: 'rgba(0, 0, 0, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 4,
  },
  iconWrapper: {
    marginRight: gapHorizontal(10),
  },
  label: {
    fontFamily: 'Roboto-Medium',
    color: COLORS.white,
    fontSize: pixelFont(15),
  },
});

export default CategoriesBanner;