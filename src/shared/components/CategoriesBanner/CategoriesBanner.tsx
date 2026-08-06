import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { gapHorizontal, gapVertical, pixelFont } from '../../utils/metrics';
import type { CategoriesBannerProps } from '../../types/categoriesBanner';

const ACCENT_GREEN = 'rgba(118, 203, 79, 1)';

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
        <GridIcon size={pixelFont(18)} color="#FFFFFF" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ACCENT_GREEN,
    borderRadius: 10,
    paddingVertical: gapVertical(14),
    paddingHorizontal: gapHorizontal(16),
    marginTop: 16,
  },
  iconWrapper: {
    marginRight: gapHorizontal(10),
  },
  label: {
    fontFamily: 'Roboto',
    color: '#FFFFFF',
    fontSize: pixelFont(15),
    fontWeight: '600',
  },
});

export default CategoriesBanner;