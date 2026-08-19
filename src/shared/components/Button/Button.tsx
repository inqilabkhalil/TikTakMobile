import { Pressable, StyleSheet, Text } from 'react-native';
import type { ButtonProps } from '../../types/button';

function Button({
  title,
  onPress,
  type = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isPrimary = type === 'primary';
  const isGhost = type === 'ghost';
  const isWarning = type === 'warning';

  const buttonStyle = isGhost
    ? styles.ghost
    : isWarning
      ? styles.warning
      : styles.primary;

  const labelStyle = isGhost
    ? styles.ghostLabel
    : isWarning
      ? styles.warningLabel
      : styles.primaryLabel;

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        buttonStyle,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
      ]}>
      <Text style={[styles.label, labelStyle]}>{loading ? 'Loading...' : title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#76CB4F',
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#76CB4F',
  },
  warning: {
    backgroundColor: '#F4333C',
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: {
    opacity: 0.9,
  },
  label: {
    fontWeight: '600',
  },
  primaryLabel: {
    color: '#FFFFFF',
  },
  ghostLabel: {
    color: '#76CB4F',
  },
  warningLabel: {
    color: '#FFFFFF',
  },
});

export default Button;
