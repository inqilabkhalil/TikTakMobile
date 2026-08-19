import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { AccountStackParamList } from '@/shared/types/navigation';
import AccountScreen from '../screens/AccountScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailScreen from '../screens/OrderDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

function AccountNavigator() {
  return (
    <Stack.Navigator initialRouteName="AccountHome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AccountHome" component={AccountScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <Stack.Screen name="OrderDetail" component={OrderDetailScreen} />
      <Stack.Screen name="Favorites" component={FavoritesScreen} />
    </Stack.Navigator>
  );
}

export default AccountNavigator;
