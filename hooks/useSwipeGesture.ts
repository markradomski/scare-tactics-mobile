import { useCallback, useMemo, useRef } from 'react';
import { Gesture } from 'react-native-gesture-handler';
import {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

export type SwipeDirection = 'left' | 'right';
export type DragActionDirection = 'nah' | 'yeah' | null;

const DRAG_ACTION_THRESHOLD = 20;

type UseSwipeGestureOptions = {
  onSwiped: (direction: SwipeDirection) => void;
  onDragDirectionChange?: (direction: DragActionDirection) => void;
  threshold?: number;
};

export function useSwipeGesture({
  onSwiped,
  onDragDirectionChange,
  threshold = 120,
}: UseSwipeGestureOptions) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // Keep callback identities stable so the Pan gesture and reaction below are
  // built once — re-handing GestureDetector a fresh Gesture.Pan() mid-drag
  // (which setState-driven re-renders would otherwise cause) corrupts the
  // native recognizer after repeated swipes.
  const onSwipedRef = useRef(onSwiped);
  onSwipedRef.current = onSwiped;
  const onDragDirectionChangeRef = useRef(onDragDirectionChange);
  onDragDirectionChangeRef.current = onDragDirectionChange;

  const triggerSwiped = useCallback((direction: SwipeDirection) => {
    onSwipedRef.current(direction);
  }, []);

  const triggerDragDirectionChange = useCallback((direction: DragActionDirection) => {
    onDragDirectionChangeRef.current?.(direction);
  }, []);

  const commit = (direction: SwipeDirection) => {
    'worklet';
    const toX = direction === 'right' ? 600 : -600;
    translateX.value = withTiming(toX, { duration:400 }, (finished) => {
      if (finished) {
        runOnJS(triggerSwiped)(direction);
      }
    });
  };

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .onUpdate((event) => {
          translateX.value = event.translationX;
          translateY.value = event.translationY;
        })
        .onEnd((event) => {
          if (event.translationX > threshold) {
            commit('right');
          } else if (event.translationX < -threshold) {
            commit('left');
          } else {
            translateX.value = withSpring(0);
            translateY.value = withSpring(0);
          }
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-300, 0, 300],
      [-15, 0, 15],
      Extrapolation.CLAMP,
    );
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const nahStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-150, -20], [1, 0], Extrapolation.CLAMP),
  }));

  const yeahStampStyle = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [20, 150], [0, 1], Extrapolation.CLAMP),
  }));

  const dragDirection = useDerivedValue<DragActionDirection>(() => {
    if (translateX.value < -DRAG_ACTION_THRESHOLD) return 'nah';
    if (translateX.value > DRAG_ACTION_THRESHOLD) return 'yeah';
    return null;
  });

  useAnimatedReaction(
    () => dragDirection.value,
    (current, previous) => {
      if (current !== previous) {
        runOnJS(triggerDragDirectionChange)(current);
      }
    },
    [],
  );

  const swipeLeft = () => commit('left');
  const swipeRight = () => commit('right');

  return {
    panGesture,
    cardStyle,
    nahStampStyle,
    yeahStampStyle,
    swipeLeft,
    swipeRight,
  };
}
