import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import type { BasketItem as BasketItemType } from '../types/basket';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

import DeleteIcon from '@/shared/assets/icons/deleteIcon.svg';
import MinusIcon from '@/shared/assets/icons/minusIcon.svg';
import PlusIcon from '@/shared/assets/icons/plusIcon.svg';

type Props = {
  item: BasketItemType;
  onIncrement: () => void;
  onDecrement: () => void;
};

function BasketItem({ item, onIncrement, onDecrement }: Props) {
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;
  const isLastQuantity = item.quantity === 1;

  return (
    <View style={styles.container}>
      {item.image ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)} AZN</Text>
      </View>

      <View style={styles.counterContainer}>
        <Pressable
          onPress={onDecrement}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
        >
          {isLastQuantity ? (
            <DeleteIcon
              width={pixelHorizontal(16)}
              height={pixelHorizontal(16)}
              fill="#FFFFFF"
              color="#FFFFFF"
            />
          ) : (
            <MinusIcon
              width={pixelHorizontal(14)}
              height={pixelHorizontal(14)}
              fill="#FFFFFF"
              color="#FFFFFF"
              stroke="#FFFFFF"
            />
          )}
        </Pressable>

        <Text style={styles.qty}>{item.quantity}</Text>

        <Pressable
          onPress={onIncrement}
          style={({ pressed }) => [
            styles.iconButton,
            pressed && styles.iconButtonPressed,
          ]}
        >
          <PlusIcon
            width={pixelHorizontal(14)}
            height={pixelHorizontal(14)}
            fill="#FFFFFF"
            color="#FFFFFF"
            stroke="#FFFFFF"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: pixelVertical(12),
    paddingHorizontal: pixelHorizontal(16),
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F2',
  },
  image: {
    width: pixelHorizontal(56),
    height: pixelVertical(56),
    borderRadius: pixelHorizontal(8),
    marginRight: pixelHorizontal(12),
  },
  imagePlaceholder: {
    width: pixelHorizontal(56),
    height: pixelVertical(56),
    borderRadius: pixelHorizontal(8),
    marginRight: pixelHorizontal(12),
    backgroundColor: '#F5F5F5',
  },
  info: {
    flex: 1,
    paddingRight: pixelHorizontal(8),
  },
  name: {
    fontSize: pixelFont(15),
    fontWeight: '600',
    color: '#1A1A1A',
  },
  price: {
    marginTop: pixelVertical(6),
    fontSize: pixelFont(13),
    color: '#8E8E93',
  },
  counterContainer: {
    width: pixelHorizontal(115),
    height: pixelVertical(40),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#92D871',
    borderRadius: pixelHorizontal(10),
    padding: pixelHorizontal(5),
  },
  iconButton: {
    width: pixelHorizontal(30),
    height: pixelHorizontal(30),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  iconButtonPressed: {
    backgroundColor: 'rgba(255, 255, 255, 0.42)',
  },
  qty: {
    marginHorizontal: pixelHorizontal(15),
    fontSize: pixelFont(15),
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default BasketItem;