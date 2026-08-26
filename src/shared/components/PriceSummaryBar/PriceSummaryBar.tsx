import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '@/shared/constants/theme';
import {
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '@/shared/utils/metrics';
import { PriceSummaryBarProps } from '@/shared/types/PriceSummaryBar';

function PriceSummaryBar({
  subtotal,
  delivery = 0,
  total,
  buttonTitle,
  onButtonPress,
  isLoading = false,
  disabled = false,
}: PriceSummaryBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.totalsRow}>
        <View style={styles.totalsColLeft}>
          <View style={styles.smallRow}>
            <Text style={styles.smallLabel}>Ümumi: </Text>
            <Text style={styles.smallValue}>{subtotal.toFixed(2)} AZN</Text>
          </View>
          <View style={styles.smallRow}>
            <Text style={styles.smallLabel}>Çatdırılma: </Text>
            <Text style={styles.smallValue}>
              {delivery === 0 ? 'Pulsuz' : `${delivery.toFixed(2)} AZN`}
            </Text>
          </View>
        </View>

        <View style={styles.totalsColRight}>
          <Text style={styles.totalLabel}>Yekun məbləğ:</Text>
          <Text style={styles.totalValue}>{total.toFixed(2)} AZN</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.submitButton, disabled && styles.submitDisabled]}
        onPress={onButtonPress}
        disabled={disabled || isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.submitText}>{buttonTitle}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: pixelHorizontal(20),
    paddingTop: pixelVertical(16),
    paddingBottom: pixelVertical(20),
    backgroundColor: COLORS.white,
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: pixelVertical(16),
  },
  totalsColLeft: {
    flex: 1,
  },
  totalsColRight: {
    alignItems: 'flex-end',
  },
  smallRow: {
    flexDirection: 'row',
    marginBottom: pixelVertical(4),
  },
  smallLabel: {
    fontFamily: 'Roboto',
    color: COLORS.labelText,
    fontSize: pixelFont(14),
    fontWeight: '400',
  },
  smallValue: {
    fontFamily: 'Roboto',
    color: COLORS.labelText,
    fontSize: pixelFont(14),
    fontWeight: '400',
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
  submitButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: pixelVertical(14),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
  },
  submitDisabled: {
    opacity: 0.5,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: pixelFont(16),
  },
});

export default PriceSummaryBar;