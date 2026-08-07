/**
 * @format
 */

import { useEffect } from 'react';
import { StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { NavigationContainer } from '@react-navigation/native';
import AntProvider from '@ant-design/react-native/lib/provider';
import BootSplash from 'react-native-bootsplash';
import Toast from 'react-native-toast-message';
import { RootNavigator, DevNavigationSheet } from './src/app/navigation';
import { ANT_THEME } from './src/shared/constants/theme';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    BootSplash.hide({ fade: true });
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <AntProvider theme={ANT_THEME}>
          <BottomSheetModalProvider>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            <NavigationContainer>
              <RootNavigator />
              <DevNavigationSheet />
            </NavigationContainer>
            <Toast />
          </BottomSheetModalProvider>
        </AntProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
