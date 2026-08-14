import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './BottomTabs';
import AuthNavigator from './AuthNavigator';
import BasketNavigator from './BasketNavigator';
import type { RootStackParamList } from '../../shared/types/navigation';
import { useIsAuthenticated } from '../../shared/store/userStore';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isLoggedIn = useIsAuthenticated();

  return (
    <Stack.Navigator
      initialRouteName={isLoggedIn ? 'Main' : 'Auth'}
      screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthNavigator} />
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="Basket" component={BasketNavigator} />
    </Stack.Navigator>
  );
}

export default RootNavigator;