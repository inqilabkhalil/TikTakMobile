import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootScreen } from '../screens';

export type RootStackParamList = {
  Root: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Root">
      <Stack.Screen name="Root" component={RootScreen} />
    </Stack.Navigator>
  );
}

export default RootNavigator;
