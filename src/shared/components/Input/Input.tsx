import { StyleSheet, Text, View } from 'react-native';
import InputItem from '@ant-design/react-native/lib/input-item';
import { COLORS } from '../../constants/theme';
import type { InputProps } from '../../types/input';

function Input({
  value,
  onChangeText,
  placeholder,
  label,
  error,
  secureTextEntry,
  keyboardType,
}: InputProps) {
  return (
    <View style={styles.container}>
      <InputItem
        value={value}
        onChange={onChangeText}
        placeholder={placeholder}
        error={!!error}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}>
        {label}
      </InputItem>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 8,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 12,
    marginTop: 4,
  },
});

export default Input;
