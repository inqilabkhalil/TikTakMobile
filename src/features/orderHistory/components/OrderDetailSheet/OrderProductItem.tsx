import { StyleSheet, Text, View } from 'react-native';
import FastImage from '@d11/react-native-fast-image';
import OrangeIcon from '@/shared/assets/images/orange.svg';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelHorizontal,
} from '@/shared/utils/metrics';
import type { OrderProductItemProps } from '../../types/order';
import { formatTotal } from '../../utils/orderHelpers';

function OrderProductItem({ item }: OrderProductItemProps) {
  const hasImage = item.product.img_url && item.product.img_url.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.imageColumn}>
        {hasImage ? (
          <FastImage
          source={{ uri: item.product.img_url }}
          style={styles.image}
          resizeMode={FastImage.resizeMode.cover}
          />
        ) : (
          <OrangeIcon
            width={pixelHorizontal(48)}
            height={pixelHorizontal(48)}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.product.title} {item.quantity}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {formatTotal(item.product.price)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: gapVertical(12),
    paddingHorizontal: gapHorizontal(16),
  },
  imageColumn: {
    flex: 1,
    paddingRight: gapHorizontal(8),
  },
  image: {
    width: pixelHorizontal(48),
    height: pixelHorizontal(48),
    borderRadius: 8,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    fontWeight: '400',
    color: COLORS.textPrimary,
    marginBottom: gapVertical(4),
  },
  price: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(12),
    color: COLORS.textSecondary,
    fontWeight: '300',
  },
});

export default OrderProductItem;
