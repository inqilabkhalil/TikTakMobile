import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '@/shared/types/navigation';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const BUTTON_APPEAR_DELAY = 1000;
const FADE_DURATION = 500;

export function useOrderSuccess() {
  const navigation = useNavigation<NavigationProp>();
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }).start();
    }, BUTTON_APPEAR_DELAY);

    return () => clearTimeout(timer);
  }, [buttonOpacity]);

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
    buttonOpacity,
    goToOrders,
  };
}
