import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  AccountScreen,
  PersonalInfoScreen,
  OrderHistoryScreen,
  OrderDetailScreen,
  FavoritesScreen,
} from '../screens';
import type { AccountStackParamList } from '@/shared/types/navigation';

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
