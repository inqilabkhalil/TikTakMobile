import { forwardRef, type ComponentRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal, BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import Button from '@/shared/components/Button';
import FavoritesIcon from '@/shared/assets/icons/favorites.svg';
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
>(({ image, title, description, price, inBasket, quantityKg, onAdd, onIncrement, onDecrement }, ref) => {
  const { dismiss } = useBottomSheetModal();

  return (
    <BottomSheetModal ref={ref}>
      <BottomSheetView style={styles.container}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => dismiss()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
          <FavoritesIcon width={pixelWidth(20)} height={pixelHeight(18)} />
        </View>
        <Image source={image} style={styles.image} resizeMode="contain" />
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        {description ? (
          <Text style={styles.description} numberOfLines={3}>
            {description}
          </Text>
        ) : null}
        <Text style={styles.price}>{price.toFixed(2)} AZN</Text>

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
          <Button title="Səbətə əlavə et" type="primary" onPress={onAdd} />
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: pixelWidth(16),
    paddingBottom: gapVertical(24),
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  closeIcon: {
    fontSize: pixelFont(18),
    color: COLORS.textDark,
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
    width: pixelWidth(95),
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
