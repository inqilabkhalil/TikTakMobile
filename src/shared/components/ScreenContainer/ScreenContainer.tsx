import { View, StyleSheet } from 'react-native';
import { LAYOUT } from '../../constants/layout';
import type { ScreenContainerProps } from '../../types/screenContainer';

function ScreenContainer({ children, style, ...rest }: ScreenContainerProps) {
  return (
    <View style={[styles.container, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
});

export default ScreenContainer;
