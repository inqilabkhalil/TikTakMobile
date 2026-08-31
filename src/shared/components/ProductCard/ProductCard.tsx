import { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import { COLORS } from '../../constants/theme';
import { gapHorizontal, gapVertical, pixelFont, pixelWidth, pixelHeight, pixelHorizontal } from '../../utils/metrics';
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
}: ProductCardProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={onPress ? 0.85 : 1}
      disabled={!onPress}>
      <View style={styles.imageWrapper}>
        <FastImage source={image} style={styles.image} resizeMode={FastImage.resizeMode.cover} />
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
    flex: 1,
    maxWidth: '48%',
    width: pixelWidth(165), 
    height: pixelHeight(210),  
    backgroundColor: '#FFFFFF',
    borderRadius: pixelHorizontal(10), 
    padding: gapHorizontal(10),
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.11,
    shadowRadius: 10,
    elevation: 3,                       
  },
  imageWrapper: {
    width: '100%',
    height: pixelHeight(90),
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: pixelHorizontal(6),
  },
  detailsContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: pixelFont(13),
    fontWeight: '600',
    color: '#2B3043',
    textAlign: 'center',
    marginBottom: gapVertical(2),
  },
  price: {
    fontSize: pixelFont(12),
    fontWeight: '600',
    color: '#2B3043',
    textAlign: 'center',
  },
  quantityLabel: {
    fontSize: pixelFont(12),
    fontWeight: '600',
    color: '#2B3043',
    textAlign: 'center',
  },
  quantityHighlight: {
    color: COLORS.error,                
    fontWeight: '700',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    borderRadius: pixelHorizontal(8),
    width: '100%',                      
    height: pixelHeight(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: pixelFont(12),
    fontWeight: '600',
  },
  stepper: {
    flexDirection: 'row',
    width: '100%',
    gap: gapHorizontal(6),
  },
  stepperButton: {
    height: pixelHeight(32),
    borderRadius: pixelHorizontal(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: COLORS.error,
    width: pixelWidth(32),
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  stepperIcon: {
    color: COLORS.white,
    fontSize: pixelFont(16),
    fontWeight: '700',
    marginTop: -2,
  },
  incrementText: {
    color: COLORS.white,
    fontSize: pixelFont(12),
    fontWeight: '600',
  },
});

export default memo(ProductCard);
