import { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSuspense } from '@/shared/utils/withSuspense';
import type { BasketStackParamList } from '@/shared/types/navigation';

const BasketScreen = withSuspense(lazy(() => import('../screens/BasketScreen')));
const CheckoutScreen = withSuspense(lazy(() => import('../screens/CheckoutScreen')));
const OrderSuccessScreen = withSuspense(lazy(() => import('../screens/OrderSuccessScreen')));

const Stack = createNativeStackNavigator<BasketStackParamList>();

function BasketNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="BasketHome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="BasketHome" component={BasketScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}

export default BasketNavigator;
