import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, gapVertical, pixelFont, pixelWidth, pixelHeight } from '../../utils/metrics';
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
  onPress,
  isFavorite,
  onToggleFavorite,
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.85 : 1}
      disabled={!onPress}>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} resizeMode="cover" />
        {onToggleFavorite && (
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={onToggleFavorite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={pixelFont(16)}
              color={isFavorite ? COLORS.error : COLORS.textDark}
            />
          </TouchableOpacity>
        )}
      </View>
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
        <TouchableOpacity style={styles.addButton} onPress={onAdd} activeOpacity={0.85}>
          <Text style={styles.addButtonText}>Səbətə əlavə et</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: pixelWidth(165),
    height: pixelHeight(188),
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: pixelWidth(20),
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: pixelWidth(10),
    shadowOpacity: 1,
    elevation: 6,
    padding: gapHorizontal(8),
    alignItems: 'center',
  },
  imageWrapper: {
    width: '100%',
    marginBottom: gapVertical(6),
  },
  favoriteButton: {
    position: 'absolute',
    top: gapVertical(4),
    right: gapHorizontal(4),
    width: pixelWidth(24),
    height: pixelWidth(24),
    borderRadius: pixelWidth(12),
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: pixelFont(100),
    borderRadius: gapHorizontal(8),
  },
  title: {
    fontSize: pixelFont(13),
    fontWeight: '700',
    color: '#2B3043',
    textAlign: 'center',
    marginBottom: gapVertical(4),
  },
  price: {
    fontSize: pixelFont(13),
    color: '#2B3043',
    marginBottom: gapVertical(8),
  },
  quantityLabel: {
    fontSize: pixelFont(13),
    color: '#2B3043',
    marginBottom: gapVertical(8),
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: gapHorizontal(10),
    width: pixelWidth(120),
    height: pixelHeight(27),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: pixelFont(11),
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    width: '100%',
    gap: gapHorizontal(8),
    marginTop: 'auto',
  },
  stepperButton: {
    borderRadius: gapHorizontal(10),
    paddingVertical: gapVertical(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: COLORS.error,
    width: gapHorizontal(32),
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  stepperIcon: {
    color: COLORS.white,
    fontSize: pixelFont(14),
    fontWeight: '700',
  },
  incrementText: {
    color: COLORS.white,
    fontSize: pixelFont(11),
    fontWeight: '600',
  },
});

export default memo(ProductCard);
