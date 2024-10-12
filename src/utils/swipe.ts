import { Dimensions, GestureResponderEvent } from 'react-native';

const windowHeight = Dimensions.get('window').height;

export const useSwipeVertical = (
  onSwipeUp?: () => void,
  onSwipeDown?: () => void,
  rangeOffset = 4
): {
  onTouchEnd: (e: GestureResponderEvent) => void;
  onTouchStart: (e: GestureResponderEvent) => void;
} => {
  let firstTouch = 0;

  function onTouchStart(e: GestureResponderEvent): void {
    firstTouch = e.nativeEvent.pageY;
  }

  function onTouchEnd(e: GestureResponderEvent): void {
    const positionY = e.nativeEvent.pageY;
    const range = windowHeight / rangeOffset;

    if (positionY - firstTouch > range) onSwipeDown?.();
    else if (firstTouch - positionY > range) onSwipeUp?.();
  }

  return { onTouchStart, onTouchEnd };
};
