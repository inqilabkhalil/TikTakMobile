import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BasketScreen, CheckoutScreen, OrderSuccessScreen } from '../screens';
import type { BasketStackParamList } from '@/shared/types/navigation';

const Stack = createNativeStackNavigator<BasketStackParamList>();

function BasketNavigator() {
  return (
    <Stack.Navigator initialRouteName="BasketHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BasketHome" component={BasketScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
      <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
    </Stack.Navigator>
  );
}

export default BasketNavigator;
