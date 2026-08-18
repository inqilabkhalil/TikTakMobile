import { lazy } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { withSuspense } from '@/shared/utils/withSuspense';
import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import { COLORS } from '../../shared/constants/theme';
import { TYPOGRAPHY } from '../../shared/constants/typography';
import type { MainTabParamList } from '../../shared/types/navigation';

const SearchScreen = withSuspense(lazy(() => import('../screens/SearchScreen')));

// Not exported — purely an internal detail of the 3 icon renderers below.
type TabIconProps = { focused: boolean; color: string; size: number };

function HomeTabIcon({ focused, color, size }: TabIconProps) {
  return (
    <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
  );
}

function SearchTabIcon({ focused, color, size }: TabIconProps) {
  return (
    <Ionicons name={focused ? 'search' : 'search-outline'} size={size} color={color} />
  );
}

function AccountTabIcon({ focused, color, size }: TabIconProps) {
  return (
    <Ionicons name={focused ? 'person' : 'person-outline'} size={size} color={color} />
  );
}

const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textSecondary,
        tabBarLabelStyle: TYPOGRAPHY.tabBarLabel,
        tabBarStyle: styles.tabBar,
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{ tabBarLabel: 'Əsas', tabBarIcon: HomeTabIcon }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('Home', { screen: 'HomeMain' });
          },
        })}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarLabel: 'Axtar', tabBarIcon: SearchTabIcon }}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={{ tabBarLabel: 'Hesabım', tabBarIcon: AccountTabIcon }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('Account', { screen: 'AccountHome' });
          },
        })}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.white,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: COLORS.border,
  },
});

export default MainTabs;
