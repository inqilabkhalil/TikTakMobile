import { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSuspense } from '@/shared/utils/withSuspense';
import type { AccountStackParamList } from '@/shared/types/navigation';

const AccountScreen = withSuspense(lazy(() => import('../screens/AccountScreen')));
const PersonalInfoScreen = withSuspense(lazy(() => import('../screens/PersonalInfoScreen')));
const OrderHistoryScreen = withSuspense(lazy(() => import('../screens/OrderHistoryScreen')));
const OrderDetailScreen = withSuspense(lazy(() => import('../screens/OrderDetailScreen')));
const FavoritesScreen = withSuspense(lazy(() => import('../screens/FavoritesScreen')));

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
