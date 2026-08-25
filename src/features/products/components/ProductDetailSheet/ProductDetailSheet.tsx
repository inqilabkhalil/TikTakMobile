import { forwardRef, type ComponentRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppBottomSheet from '@/shared/components/AppBottomSheet';
import Button from '@/shared/components/Button';
import { COLORS } from '@/shared/constants/theme';
import { TYPOGRAPHY } from '@/shared/constants/typography';
import {
  pixelWidth,
  pixelHeight,
  pixelFont,
  gapHorizontal,
  gapVertical,
} from '@/shared/utils/metrics';
import type { ProductDetailSheetProps } from '../../types/productDetailSheet';

const ProductDetailSheet = forwardRef<
  ComponentRef<typeof BottomSheetModal>,
  ProductDetailSheetProps
>(
  (
    {
      image,
      title,
      description,
      price,
      inBasket,
      quantityKg,
      onAdd,
      onIncrement,
      onDecrement,
      isFavorite,
      onToggleFavorite,
    },
    ref,
  ) => {
    return (
      <AppBottomSheet ref={ref} snapPoints={[pixelHeight(468)]}>
        <View style={styles.container}>
          {onToggleFavorite && (
            <View style={styles.topRow}>
              <TouchableOpacity
                onPress={onToggleFavorite}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Ionicons
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={24}
                  color={isFavorite ? COLORS.primary : COLORS.textDark}
                />
              </TouchableOpacity>
            </View>
          )}
          <Image source={image} style={styles.image} resizeMode="contain" />
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {description ? (
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          ) : null}
          <Text style={styles.price} numberOfLines={1}>
            {price.toFixed(2)} AZN
          </Text>

          {inBasket ? (
            <View style={styles.stepper}>
              <TouchableOpacity
                style={[styles.stepperButton, styles.decrementButton]}
                onPress={onDecrement}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.stepperIcon}>−</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantityKg} kq</Text>
              <TouchableOpacity
                style={[styles.stepperButton, styles.incrementButton]}
                onPress={onIncrement}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Text style={styles.stepperIcon}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Button title="Səbətə əlavə et" type="primary" size="large" onPress={onAdd} />
          )}
        </View>
      </AppBottomSheet>
    );
  },
);

ProductDetailSheet.displayName = 'ProductDetailSheet';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: pixelWidth(16),
    paddingBottom: gapVertical(24),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  image: {
    width: pixelWidth(180),
    height: pixelHeight(150),
    marginTop: gapVertical(8),
  },
  title: {
    ...TYPOGRAPHY.productSheetTitle,
    width: pixelWidth(221),
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: gapVertical(16),
  },
  description: {
    ...TYPOGRAPHY.productSheetDescription,
    width: pixelWidth(295),
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: pixelHeight(6),
  },
  price: {
    ...TYPOGRAPHY.productSheetPrice,
    color: COLORS.textDark,
    textAlign: 'center',
    marginTop: gapVertical(16),
    marginBottom: gapVertical(20),
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: gapHorizontal(16),
  },
  stepperButton: {
    width: pixelWidth(48),
    height: pixelHeight(48),
    borderRadius: pixelWidth(24),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: COLORS.error,
  },
  incrementButton: {
    backgroundColor: COLORS.primary,
  },
  stepperIcon: {
    color: COLORS.white,
    fontSize: pixelFont(20),
    fontWeight: '700',
  },
  quantityText: {
    fontFamily: 'Roboto-Medium',
    fontSize: pixelFont(16),
    color: COLORS.textDark,
  },
});

export default ProductDetailSheet;