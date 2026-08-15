import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@/shared/components/Button';
import type { BasketItem } from '../types/basket';
import { calculateSubtotal } from '../utils/basketCalculations';
import { useNavigation } from '@react-navigation/native';
import { pixelFont, pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

type Props = {
  items: BasketItem[];
  onCheckout: () => void;
};

function BasketSummary({ items, onCheckout }: Props) {
  const navigation = useNavigation();
  const subtotal = calculateSubtotal(items);
  const delivery = subtotal > 0 ? 0.0 : 0.0;
  const total = subtotal + delivery;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Ümumi:</Text>
        <Text style={styles.value}>{subtotal.toFixed(2)} AZN</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Çatdırılma:</Text>
        <Text style={styles.value}>{delivery.toFixed(2)} AZN</Text>
      </View>
      <View style={styles.rowTotal}>
        <Text style={styles.totalLabel}>Yekun məbləğ</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} AZN</Text>
      </View>

      <Button
        title="Sifarişi tamamlə"
        onPress={() => {
          // Open Checkout screen first
          // @ts-ignore navigation type
          navigation.navigate('Checkout');
          if (onCheckout) onCheckout();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: pixelHorizontal(16),
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pixelVertical(8),
  },
  label: {
    color: '#8E8E93',
  },
  value: {
    color: '#1A1A1A',
    fontWeight: '600',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pixelVertical(8),
    marginBottom: pixelVertical(12),
  },
  totalLabel: {
    fontWeight: '700',
  },
  totalValue: {
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '84%',
    backgroundColor: '#FFFFFF',
    borderRadius: pixelHorizontal(12),
    padding: pixelHorizontal(20),
    alignItems: 'center',
  },
  checkCircle: {
    width: pixelHorizontal(88),
    height: pixelVertical(88),
    borderRadius: pixelHorizontal(44),
    backgroundColor: '#E9F7EF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: pixelVertical(12),
  },
  checkMark: {
    fontSize: pixelFont(40),
    color: '#1A9C2B',
  },
  modalTitle: {
    fontSize: pixelFont(18),
    fontWeight: '700',
    marginBottom: pixelVertical(8),
  },
  modalText: {
    fontSize: pixelFont(14),
    color: '#6B6B6B',
    textAlign: 'center',
    marginBottom: pixelVertical(16),
  },
  modalButton: {
    width: '100%',
    backgroundColor: '#4FC76E',
    paddingVertical: pixelVertical(12),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});

export default BasketSummary;
