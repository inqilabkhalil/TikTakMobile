import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';

const STAGGER_DELAY = 40;
const ANIMATION_DURATION = 350;

export function useCardAnimation(index: number) {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const delay = index * STAGGER_DELAY;

    Animated.timing(opacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      delay,
      useNativeDriver: true,
    }).start();
  }, [opacity, index]);

  return {
    opacity,
  };
}