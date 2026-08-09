import { Image, StyleSheet, Text, View } from 'react-native';
import OrangeIcon from '@/shared/assets/images/orange.svg';
import { COLORS } from '@/shared/constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelHorizontal,
} from '@/shared/utils/metrics';
import type { OrderProductItemProps } from '../../types/order';

function OrderProductItem({ product }: OrderProductItemProps) {
  const hasImage = product.img_url && product.img_url.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {hasImage ? (
          <Image source={{ uri: product.img_url }} style={styles.image} />
        ) : (
          <OrangeIcon
            width={pixelHorizontal(60)}
            height={pixelHorizontal(60)}
          />
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {product.name} {product.weight}
        </Text>
        <Text style={styles.price} numberOfLines={1}>
          {product.price}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: gapVertical(10),
  },
  imageWrapper: {
    width: pixelHorizontal(60),
    height: pixelHorizontal(60),
    borderRadius: 8,
    backgroundColor: '#F6F5FB',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  info: {
    flex: 1,
    marginLeft: gapHorizontal(12),
    justifyContent: 'center',
  },
  name: {
    fontSize: pixelFont(14),
    fontWeight: '500',
    color: COLORS.textDark,
    marginBottom: gapVertical(4),
  },
  price: {
    fontSize: pixelFont(12),
    color: COLORS.textSecondary,
  },
});

export default OrderProductItem;