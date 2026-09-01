import { useCallback, useEffect, useRef } from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ScrollView,
} from 'react-native';

const EXTRA_GAP = 80;

type Measurable = {
  measureInWindow?: (
    callback: (x: number, y: number, width: number, height: number) => void,
  ) => void;
};

export function useKeyboardAwareScroll() {
  const scrollRef = useRef<ScrollView | null>(null);
  const scrollOffsetRef = useRef(0);

  const onScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollOffsetRef.current = event.nativeEvent.contentOffset.y;
    },
    [],
  );

  useEffect(() => {
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';

    const subscription = Keyboard.addListener(showEvent, event => {
      const focusedInput = TextInput.State.currentlyFocusedInput() as
        | Measurable
        | null;

      if (!focusedInput?.measureInWindow || !scrollRef.current) return;

      const keyboardTop = event.endCoordinates.screenY;

      focusedInput.measureInWindow((_x, y, _width, height) => {
        const inputBottom = y + height + EXTRA_GAP;
        const overlap = inputBottom - keyboardTop;

        if (overlap <= 0) return;

        scrollRef.current?.scrollTo({
          y: scrollOffsetRef.current + overlap,
          animated: true,
        });
      });
    });

    return () => subscription.remove();
  }, []);

  return { scrollRef, onScroll };
}
