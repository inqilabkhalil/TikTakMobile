import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '@/shared/types/navigation';
import CategoryScreen from '../screens/CategoryScreen';
import ProductsScreen from '../screens/ProductsScreen';

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
