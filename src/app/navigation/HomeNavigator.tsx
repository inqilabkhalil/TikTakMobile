import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CategoryScreen, ProductsScreen } from '../screens';
import type { HomeStackParamList } from '@/shared/types/navigation';

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
