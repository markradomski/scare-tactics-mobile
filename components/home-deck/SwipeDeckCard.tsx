import { forwardRef, useImperativeHandle } from 'react';
import { StyleSheet } from 'react-native';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../../constants/tokens';
import type { DragActionDirection, SwipeDirection } from '../../hooks/useSwipeGesture';
import { useSwipeGesture } from '../../hooks/useSwipeGesture';
import type { Persona } from '../../types/persona';
import { PersonaCard, Stamp } from '../common';

export type SwipeDeckCardHandle = {
  swipeLeft: () => void;
  swipeRight: () => void;
};

type SwipeDeckCardProps = {
  persona: Persona;
  isFront: boolean;
  onSwiped: (direction: SwipeDirection) => void;
  onDragDirectionChange: (direction: DragActionDirection) => void;
};

// Shifts the persona card's inner content (and the stamps) down, while the
// card itself — its background/border, and the gesture surface — stays
// touching the true top of the screen.
const CONTENT_OFFSET_Y = 50;

// Always renders the identical GestureDetector > Animated.View > PersonaCard
// tree regardless of `isFront` — only the gesture's `enabled` flag and the
// animated transform values differ. A card promoted from the back slot to
// the front slot is the *same* React element (matched by key in a keyed
// list, see app/index.tsx), so this never remounts its Image/Text — that
// remount, when it crossed between two differently-shaped component trees,
// was the source of the avatar "flash" on button-triggered swipes.
export const SwipeDeckCard = forwardRef<SwipeDeckCardHandle, SwipeDeckCardProps>(
  function SwipeDeckCard({ persona, isFront, onSwiped, onDragDirectionChange }, ref) {
    const insets = useSafeAreaInsets();
    const { panGesture, cardStyle, nahStampStyle, yeahStampStyle, swipeLeft, swipeRight } =
      useSwipeGesture({ onSwiped, onDragDirectionChange, enabled: isFront });

    useImperativeHandle(ref, () => ({ swipeLeft, swipeRight }), [swipeLeft, swipeRight]);

    // The card is full-bleed now (see styles.card), so the stamps' own
    // top offset needs the safe-area inset added back in — otherwise they'd
    // sit right under the status bar/Dynamic Island instead of where Figma
    // places them relative to a device's actual visible content.
    const stampTop = insets.top + spacing.xxl + CONTENT_OFFSET_Y;

    return (
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.card, cardStyle]}>
          <PersonaCard persona={persona} contentOffsetY={CONTENT_OFFSET_Y} />

          <Animated.View
            style={[styles.stampTopRight, { top: stampTop }, nahStampStyle]}
          >
            <Stamp label="NAH" />
          </Animated.View>
          <Animated.View
            style={[styles.stampTopLeft, { top: stampTop }, yeahStampStyle]}
          >
            <Stamp label="YEAH" />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 6,
  },
  stampTopLeft: {
    position: 'absolute',
    left: spacing.lg,
    transform: [{ rotate: '-12deg' }],
  },
  stampTopRight: {
    position: 'absolute',
    right: spacing.lg,
    transform: [{ rotate: '12deg' }],
  },
});
