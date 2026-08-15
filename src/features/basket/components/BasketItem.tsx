import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { BasketItem as BasketItemType } from '../types/basket';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

type Props = {
  item: BasketItemType;
  onIncrement: () => void;
  onDecrement: () => void;
};

function BasketItem({ item, onIncrement, onDecrement }: Props) {
  const imageSource = typeof item.image === 'string' ? { uri: item.image } : item.image;

  return (
    <View style={styles.container}>
      {item.image ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder} />
      )}

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toFixed(2)} AZN</Text>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity
          onPress={onDecrement}
          style={[styles.controlButton, styles.decrementButton]}
        >
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity
          onPress={onIncrement}
          style={[styles.controlButton, styles.incrementButton]}
        >
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
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
    marginRight: pixelHorizontal(50),
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
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    width: pixelHorizontal(32),
    height: pixelVertical(32),
    borderRadius: pixelHorizontal(8),
    alignItems: 'center',
    justifyContent: 'center',
  },
  decrementButton: {
    backgroundColor: '#4FC76E',
  },
  incrementButton: {
    backgroundColor: '#4FC76E',
  },
  controlText: {
    fontSize: pixelFont(18),
    color: '#FFFFFF',
  },
  qty: {
    marginHorizontal: pixelHorizontal(8),
    fontSize: pixelFont(15),
  },
});

export default BasketItem;
