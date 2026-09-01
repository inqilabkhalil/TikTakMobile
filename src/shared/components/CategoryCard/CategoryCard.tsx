import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { COLORS } from '../../constants/theme';
import { TYPOGRAPHY } from '../../constants/typography';
import { pixelWidth, pixelHeight, pixelVertical, pixelHorizontal } from '../../utils/metrics';
import type { CategoryCardProps } from '../../types/categoryCard';

function CategoryCard({ image, title, onPress, style }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}>
      <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.contain} />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: pixelHorizontal(111),
    height: pixelVertical(105),
    backgroundColor: COLORS.white,
    borderRadius: pixelHorizontal(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: pixelHorizontal(6),
    shadowColor: COLORS.labelText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  image: {
    width: '70%',
    height: '48%',
    marginBottom: pixelHeight(3),
  },
  title: {
    ...TYPOGRAPHY.categoryLabel,
    color: COLORS.textDark,
    width: '100%',
  },
});

export default CategoryCard;