import { EmptyStateProps } from '@/shared/types/emptyState';
import EmptyIcon from '@/shared/assets/images/empty-state.svg';
import { gapHorizontal, gapVertical, pixelFont, pixelHorizontal } from '@/shared/utils/metrics';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/shared/constants/theme';

function EmptyState({
  title,
  subtitle,
  icon: Icon = EmptyIcon,
  actionText,
  onActionPress,
}: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <Icon width={pixelHorizontal(136)} height={pixelHorizontal(136)} style={styles.Empimage} />
      <Text style={styles.subtitle}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

      {actionText && onActionPress && (
        <TouchableOpacity
          style={styles.button}
          onPress={onActionPress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>{actionText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: gapVertical(145),
    alignItems: 'center',
    paddingHorizontal: gapHorizontal(32),
  },
  Empimage: {
    marginBottom: gapVertical(30),
  },
  title: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(18),
    fontWeight: '500',
    color: COLORS.emptyText,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    fontWeight: '500',
    color: COLORS.emptyText,
    textAlign: 'center',
    marginTop: gapVertical(8),
  },
  button: {
    marginTop: gapVertical(24),
    paddingHorizontal: gapHorizontal(32),
    paddingVertical: gapVertical(12),
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: 'Roboto',
    fontSize: pixelFont(14),
    fontWeight: '500',
    color: COLORS.white,
  },
});

export default EmptyState;