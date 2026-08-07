import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabs from './BottomTabs';
import AuthNavigator from './AuthNavigator';
import BasketNavigator from './BasketNavigator';
import type { RootStackParamList } from '../../shared/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  const isLoggedIn = false; // TODO: real auth qoşulanda authStore-dan oxu

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
