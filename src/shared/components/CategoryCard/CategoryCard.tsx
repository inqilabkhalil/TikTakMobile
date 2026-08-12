import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../constants/theme';
import { TYPOGRAPHY } from '../../constants/typography';
import { pixelWidth, pixelHeight } from '../../utils/metrics';
import type { CategoryCardProps } from '../../types/categoryCard';

function CategoryCard({ image, title, onPress, style }: CategoryCardProps) {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.85}>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: pixelWidth(156),
    height: pixelHeight(153),
    backgroundColor: COLORS.white,
    borderRadius: pixelWidth(12),
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    justifyContent: 'center',
    padding: pixelWidth(8),
  },
  image: {
    width: '70%',
    height: '65%',
    marginBottom: pixelHeight(8),
  },
  title: {
    ...TYPOGRAPHY.categoryLabel,
    color: COLORS.textDark,
  },
});

export default CategoryCard;
