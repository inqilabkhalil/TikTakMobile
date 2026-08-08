import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../constants/theme';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelVertical,
} from '../../utils/metrics';
import type { FormInputProps } from '../../types/formInput';
import FormInputLabel from './FormInputLabel';
import FormInputError from './FormInputError';

function FormInput({
  value,
  onChangeText,
  label,
  placeholder,
  required = false,
  error,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  maxLength,
  autoCapitalize = 'sentences',
}: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.container}>
      {label && <FormInputLabel text={label} required={required} />}

      <View
        style={[
          styles.inputWrapper,
          isFocused && styles.inputWrapperFocused,
          error && styles.inputWrapperError,
          !editable && styles.inputWrapperDisabled,
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textSecondary}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          maxLength={maxLength}
          autoCapitalize={autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
        />
      </View>

      {error && <FormInputError message={error} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: gapVertical(16),
  },
  inputWrapper: {
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: gapHorizontal(14),
    height: pixelVertical(50),
    justifyContent: 'center',
  },
  inputWrapperFocused: {
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  inputWrapperError: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  inputWrapperDisabled: {
    opacity: 0.6,
  },
  input: {
    fontSize: pixelFont(14),
    color: COLORS.textDark,
    padding: 0,
    margin: 0,
  },
});

export default FormInput;