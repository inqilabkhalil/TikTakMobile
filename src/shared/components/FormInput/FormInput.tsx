import { useState } from 'react';
import { Platform, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          textContentType={secureTextEntry ? 'password' : undefined}
          autoComplete={secureTextEntry ? 'password' : 'off'}
          autoCorrect={!secureTextEntry}
          editable={editable}
          maxLength={maxLength}
          autoCapitalize={secureTextEntry ? 'none' : autoCapitalize}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={styles.input}
        />

        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(prev => !prev)}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={COLORS.textSecondary}
            />
          </TouchableOpacity>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.border,
    borderRadius: 10,
    backgroundColor: COLORS.inputBackground,
    paddingHorizontal: gapHorizontal(14),
    height: pixelVertical(50),
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
    flex: 1,
    fontSize: pixelFont(14),
    color: COLORS.textDark,
    padding: 0,
    margin: 0,
  },
});

export default FormInput;