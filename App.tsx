/**
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
import { enableScreens } from 'react-native-screens';
import Toast from 'react-native-toast-message';
import Providers from './src/app/Providers';
import { AppRoutes } from './src/app/navigation';

enableScreens();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Providers>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppRoutes />
      <Toast />
    </Providers>
  );
}

export default App;
