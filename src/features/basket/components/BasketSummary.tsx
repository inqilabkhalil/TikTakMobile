import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '@/shared/components/Button';
import type { BasketItem } from '../types/basket';
import { calculateSubtotal } from '../utils/basketCalculations';
import { useNavigation } from '@react-navigation/native';
import {
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '@/shared/utils/metrics';
import { COLORS } from '@/shared/constants/theme';

type Props = {
  items: BasketItem[];
  onCheckout: () => void;
};

function BasketSummary({ items, onCheckout }: Props) {
  const navigation = useNavigation();
  const subtotal = calculateSubtotal(items);
  const delivery: number = 0;
  const total = subtotal + delivery;

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <View style={styles.leftCol}>
          <Text style={styles.label}>
            Ümumi:{' '}
            <Text style={styles.boldValue}>{subtotal.toFixed(2)} AZN</Text>
          </Text>
          <Text style={styles.label}>
            Çatdırılma:{' '}
            <Text style={styles.boldValue}>
              {delivery === 0 ? 'Pulsuz' : `${delivery.toFixed(2)} AZN`}
            </Text>
          </Text>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.totalLabel}>Yekun məbləğ:</Text>
          <Text style={styles.totalValue}>{total.toFixed(2)} AZN</Text>
        </View>
      </View>

      <Button
        title="Sifarişi tamamla"
        onPress={() => {
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
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: '#F2F2F2',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: pixelVertical(16),
  },
  leftCol: {
    gap: pixelVertical(4),
  },
  rightCol: {
    alignItems: 'flex-end',
    gap: pixelVertical(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: pixelVertical(8),
  },
  label: {
    fontFamily: 'Roboto',
    color: COLORS.labelText,
    fontSize: pixelFont(14),
    fontWeight: '400',
  },
  boldValue: {
    fontFamily: 'Roboto',
    color: COLORS.labelText,
    fontSize: pixelFont(14),
    fontWeight: '400',
  },
  rowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: pixelVertical(8),
    marginBottom: pixelVertical(12),
  },
  totalLabel: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(16),
    fontWeight: '700',
    color: COLORS.labelText,
  },
  totalValue: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(16),
    fontWeight: '700',
    color: COLORS.labelText,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '84%',
    backgroundColor: COLORS.white,
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
    backgroundColor: '#92D871',
    paddingVertical: pixelVertical(12),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
  },
  modalButtonText: {
    color: COLORS.white,
    fontWeight: '700',
  },
});

export default BasketSummary;
