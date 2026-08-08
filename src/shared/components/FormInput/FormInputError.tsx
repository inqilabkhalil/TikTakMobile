import { COLORS } from '@/shared/constants/theme';
import { FormInputErrorProps } from '@/shared/types/formInput';
import { gapVertical, pixelFont } from '@/shared/utils/metrics';
import { StyleSheet, Text } from 'react-native';

function FormInputError({ message }: FormInputErrorProps) {
  return <Text style={styles.error}>{message}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: COLORS.error,
    fontSize: pixelFont(12),
    marginTop: gapVertical(4),
  },
});

export default FormInputError;
