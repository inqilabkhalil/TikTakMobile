import { Pressable, StyleSheet, Text } from 'react-native';
import type { ButtonProps } from '../../types/button';
import { pixelHorizontal, pixelVertical } from '@/shared/utils/metrics';

function Button({
  title,
  onPress,
  type = 'primary',
  size = 'default',
  loading = false,
  disabled = false,
}: ButtonProps) {
  const isGhost = type === 'ghost';
  const isWarning = type === 'warning';
  const isLarge = size === 'large';

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
        isLarge && styles.baseLarge,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && !loading && styles.pressed,
      ]}
    >
      <Text style={[styles.label, labelStyle, isLarge && styles.labelLarge]}>
        {loading ? 'Loading...' : title}
      </Text>
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
  baseLarge: {
    width: 243,
    height: 50,
    borderRadius: 10,
  },
  primary: {
    backgroundColor: '#76CB4F',
    paddingVertical: pixelVertical(14),
    borderRadius: pixelHorizontal(10),
    alignItems: 'center',
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
  labelLarge: {
    fontSize: 15,
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
