import { Suspense, type ComponentType, type LazyExoticComponent } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../constants/theme';

function ScreenFallback() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

export function withSuspense<P extends object>(
  LazyComponent: LazyExoticComponent<ComponentType<P>>,
) {
  return function SuspendedScreen(props: P) {
    return (
      <Suspense fallback={<ScreenFallback />}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
});
