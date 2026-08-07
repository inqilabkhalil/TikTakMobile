import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LAYOUT } from '../../constants/layout';
import type { ScreenContainerProps } from '../../types/screenContainer';

function ScreenContainer({ children, style, ...rest }: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]} {...rest}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: LAYOUT.screenPaddingHorizontal,
  },
});

export default ScreenContainer;
