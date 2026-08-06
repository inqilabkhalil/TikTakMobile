import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, gapVertical, pixelFont } from '../../utils/metrics';
import type { ProductCardProps } from '../../types/productCard';

function ProductCard({
  image,
  title,
  price,
  inBasket,
  quantityLabel,
  onAdd,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>

      {inBasket ? (
        <Text style={styles.quantityLabel}>{quantityLabel}</Text>
      ) : (
        <Text style={styles.price}>{price}</Text>
      )}

      {inBasket ? (
        <View style={styles.stepper}>
          <TouchableOpacity
            style={[styles.stepperButton, styles.decrementButton]}
            onPress={onDecrement}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.stepperIcon}>−</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.stepperButton, styles.incrementButton]}
            onPress={onIncrement}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.incrementText}>+ 1 kq</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={onAdd}
          activeOpacity={0.85}>
          <Text style={styles.addButtonText}>Səbətə əlavə et</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: gapHorizontal(16),
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: gapHorizontal(5),
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: pixelFont(110),
    borderRadius: gapHorizontal(8),
    marginBottom: gapVertical(8),
  },
  title: {
    fontSize: pixelFont(14),
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: gapVertical(4),
  },
  price: {
    fontSize: pixelFont(14),
    color: '#1A1A1A',
    marginBottom: gapVertical(10),
  },
  quantityLabel: {
    fontSize: pixelFont(14),
    color: '#1A1A1A',
    marginBottom: gapVertical(10),
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: gapHorizontal(15),
    paddingVertical: gapVertical(10),
    alignItems: 'center',
    width: '100%',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    width: '100%',
    gap: gapHorizontal(8),
  },
  stepperButton: {
    borderRadius: gapHorizontal(15),
    paddingVertical: gapVertical(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: '#F4333C',
    width: gapHorizontal(40),
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  stepperIcon: {
    color: COLORS.white,
    fontSize: pixelFont(18),
    fontWeight: '700',
  },
  incrementText: {
    color: COLORS.white,
    fontSize: pixelFont(13),
    fontWeight: '600',
  },
});

export default memo(ProductCard);