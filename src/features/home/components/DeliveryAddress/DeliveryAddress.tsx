import { StyleSheet, Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../../../shared/constants/typography';
import { COLORS } from '../../../../shared/constants/theme';
import { pixelHeight, pixelVertical, pixelHorizontal } from '../../../../shared/utils/metrics';
import type { DeliveryAddressProps } from '../../types/deliveryAddress';

function DeliveryAddress({ address, label = 'Çatdırılma ünvanı:' }: DeliveryAddressProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>
      <Text style={styles.address} numberOfLines={1}>
        {address}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: pixelVertical(10),
    minHeight: pixelVertical(50),         
    borderRadius: pixelHorizontal(10),      
    marginTop: pixelVertical(8),
    backgroundColor: COLORS.inputBackground,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelHorizontal(12),
  },
  label: {
    ...TYPOGRAPHY.deliveryLabel,
    color: COLORS.textDark,
  },
  address: {
    ...TYPOGRAPHY.deliveryAddress,
    color: COLORS.textSecondary,
    marginTop: pixelHeight(2),
  },
});

export default DeliveryAddress;
