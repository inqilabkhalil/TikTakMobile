import { useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeNavigator from './HomeNavigator';
import AccountNavigator from './AccountNavigator';
import SearchScreen from '../screens/SearchScreen';
import { COLORS } from '../../shared/constants/theme';
import { TYPOGRAPHY } from '../../shared/constants/typography';
import type { MainTabParamList } from '../../shared/types/navigation';

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
  const tabScreenOptions = useMemo(
    () => ({
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textSecondary,
      tabBarLabelStyle: TYPOGRAPHY.tabBarLabel,
      tabBarStyle: styles.tabBar,
      tabBarHideOnKeyboard: true,
    }),
    [],
  );

  const homeTabOptions = useMemo(
    () => ({
      tabBarLabel: 'Əsas',
      tabBarIcon: HomeTabIcon,
    }),
    [],
  );

  const searchTabOptions = useMemo(
    () => ({
      tabBarLabel: 'Axtar',
      tabBarIcon: SearchTabIcon,
    }),
    [],
  );

  const accountTabOptions = useMemo(
    () => ({
      tabBarLabel: 'Hesabım',
      tabBarIcon: AccountTabIcon,
    }),
    [],
  );

  const homeListeners = useCallback(({ navigation }: { navigation: any }) => ({
    tabPress: () => {
      navigation.navigate('Home', { screen: 'HomeMain' });
    },
  }), []);

  const accountListeners = useCallback(({ navigation }: { navigation: any }) => ({
    tabPress: () => {
      navigation.navigate('Account', { screen: 'AccountHome' });
    },
  }), []);

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={tabScreenOptions}>
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={homeTabOptions}
        listeners={homeListeners}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={searchTabOptions}
      />
      <Tab.Screen
        name="Account"
        component={AccountNavigator}
        options={accountTabOptions}
        listeners={accountListeners}
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
