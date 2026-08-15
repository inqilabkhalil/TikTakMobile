import { lazy } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { withSuspense } from '@/shared/utils/withSuspense';
import type { HomeStackParamList } from '@/shared/types/navigation';

const CategoryScreen = withSuspense(lazy(() => import('../screens/CategoryScreen')));
const ProductsScreen = withSuspense(lazy(() => import('../screens/ProductsScreen')));

const Stack = createNativeStackNavigator<HomeStackParamList>();

function HomeNavigator() {
  return (
    <Stack.Navigator initialRouteName="HomeMain" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={CategoryScreen} />
      <Stack.Screen name="Products" component={ProductsScreen} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
