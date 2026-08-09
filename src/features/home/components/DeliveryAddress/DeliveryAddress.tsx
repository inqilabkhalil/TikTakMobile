import { StyleSheet, Text, View } from 'react-native';
import { TYPOGRAPHY } from '../../../../shared/constants/typography';
import { COLORS } from '../../../../shared/constants/theme';
import { pixelWidth, pixelHeight } from '../../../../shared/utils/metrics';
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
    width: pixelWidth(345),
    height: pixelHeight(50),
    borderRadius: pixelWidth(10),
    backgroundColor: COLORS.inputBackground,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: pixelWidth(12),
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
