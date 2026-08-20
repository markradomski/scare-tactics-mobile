import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, View } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import { spacing } from '../constants/tokens';
import type { DragActionDirection, SwipeDirection } from '../hooks/useSwipeGesture';
import { useSwipeGesture } from '../hooks/useSwipeGesture';
import type { Persona } from '../types/persona';
import { PersonaCard } from './PersonaCard';
import { Stamp } from './Stamp';

export type SwipeDeckCardHandle = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

type SwipeDeckCardProps = {
  persona: Persona;
  onSwiped: (direction: SwipeDirection) => void;
  onDragDirectionChange: (direction: DragActionDirection) => void;
};

export const SwipeDeckCard = forwardRef<SwipeDeckCardHandle, SwipeDeckCardProps>(
  function SwipeDeckCard({ persona, onSwiped, onDragDirectionChange }, ref) {
    const { panGesture, cardStyle, nahStampStyle, yeahStampStyle, swipeLeft, swipeRight } =
      useSwipeGesture({ onSwiped, onDragDirectionChange });

    useImperativeHandle(ref, () => ({ swipeLeft, swipeRight }), [swipeLeft, swipeRight]);

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <PersonaCard persona={persona} />

          <Animated.View style={[styles.stampTopRight, nahStampStyle]}>
            <Stamp label="NAH" />
          </Animated.View>
          <Animated.View style={[styles.stampTopLeft, yeahStampStyle]}>
            <Stamp label="YEAH" />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

export function StaticSwipeCard({ persona }: { persona: Persona }) {
  return (
    <View style={styles.card} pointerEvents="none">
      <PersonaCard persona={persona} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    aspectRatio: 354 / 706,
    height: '96%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  stampTopLeft: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.lg,
    transform: [{ rotate: '-12deg' }],
  },
  stampTopRight: {
    position: 'absolute',
    top: spacing.xxl,
    right: spacing.lg,
    transform: [{ rotate: '12deg' }],
  },
});
