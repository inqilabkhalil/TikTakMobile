import { COLORS } from '@/shared/constants/theme';
import { FormInputLabelProps } from '@/shared/types/formInput';
import { gapVertical, pixelFont } from '@/shared/utils/metrics';
import { StyleSheet, Text } from 'react-native';

function FormInputLabel({ text }: FormInputLabelProps) {
  return (
      <Text style={styles.label}>{text}</Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: pixelFont(14),
    fontWeight: '400',
    color: COLORS.textPrimary,
    marginBottom: gapVertical(11),
  },
})
export default FormInputLabel;