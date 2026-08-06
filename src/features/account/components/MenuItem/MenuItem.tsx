import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MenuItemProps } from '../../types/account';
import {
  gapHorizontal,
  gapVertical,
  pixelFont,
  pixelHorizontal,
  pixelVertical,
} from '../../../../shared/utils/metrics';
import { COLORS } from '../../../../shared/constants/theme';

function MenuItem({ Icon, title, onPress }: MenuItemProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.6}
    >
      <View style={styles.iconWrapper}>
        <Icon width={pixelHorizontal(20)} height={pixelHorizontal(20)} />
      </View>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: gapVertical(14),
    paddingHorizontal: gapHorizontal(20),
  },
  iconWrapper: {
    width: pixelHorizontal(32),
    height: pixelHorizontal(32),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: gapHorizontal(16),
  },
  title: {
    fontSize: pixelFont(14),
    paddingLeft: pixelVertical(10),
    color: COLORS.textDark,
    fontWeight: '400',
    lineHeight: pixelFont(14),
    letterSpacing: 0,
  },
});
export default MenuItem;
