import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { BasketStackParamList } from '@/shared/types/navigation';
import BasketScreen from '../screens/BasketScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import OrderSuccessScreen from '../screens/OrderSuccessScreen';

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
