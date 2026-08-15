import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BUTTON_APPEAR_DELAY = 1000;
const FADE_DURATION = 500;
const ICON_ANIMATION_DURATION = 600;

export function useOrderSuccess() {
  const navigation = useNavigation<NavigationProp>();

  const iconScale = useRef(new Animated.Value(0.3)).current;
  const iconOpacity = useRef(new Animated.Value(0)).current;

  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(iconOpacity, {
        toValue: 1,
        duration: ICON_ANIMATION_DURATION,
        useNativeDriver: true,
      }),
      Animated.spring(iconScale, {
        toValue: 1,
        friction: 4,
        tension: 80,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    }, BUTTON_APPEAR_DELAY);

    return () => clearTimeout(timer);
  }, [buttonOpacity, iconOpacity, iconScale]);

  const goToOrders = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [
                {
                  name: 'Account',
                  state: {
                    routes: [{ name: 'OrderHistory' }],
                  },
                },
              ],
            },
          },
        ],
      }),
    );
  };

  return {
    iconScale,
    iconOpacity,
    buttonOpacity,
    goToOrders,
  };
}
