import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SwipeActions } from '../components/SwipeActions';
import type { SwipeDeckCardHandle } from '../components/SwipeDeckCard';
import { SwipeDeckCard } from '../components/SwipeDeckCard';
import { personas } from '../data/personas';
import type { DragActionDirection, SwipeDirection } from '../hooks/useSwipeGesture';
import { useTheme } from '../hooks/useTheme';
import { useSessionStore } from '../store/sessionStore';

// Figma's swipe-actions row sits 34pt above the bottom of its 874pt-tall
// frame (row top:784, height:56) — added to the real safe-area inset so it
// clears the home indicator on-device instead of just matching one mockup.
const ACTIONS_BOTTOM_OFFSET = 34;

export default function SwipeBrowse() {
  const { colors } = useTheme();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const setMatchedPersonaId = useSessionStore((state) => state.setMatchedPersonaId);
  const [queue, setQueue] = useState(personas);
  const [dragDirection, setDragDirection] = useState<DragActionDirection>(null);
  const frontCardRef = useRef<SwipeDeckCardHandle>(null);

  const front = queue[0];
  const back = queue[1] ?? queue[0];

  const handleSwiped = (direction: SwipeDirection) => {
    if (direction === 'right') {
      setMatchedPersonaId(front.id);
      router.push('/match');
    }
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setDragDirection(null);
  };

  // Rendered as a single keyed array (back first, front last so it stays on
  // top) so React's keyed reconciliation tracks each persona's card across
  // the front/back role change as a prop update — never an unmount/remount.
  const visibleCards = back.id === front.id ? [front] : [back, front];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Full-bleed, edge-to-edge deck (matches Figma's updated swipe-card,
          which now covers the whole 402x874 frame) — deliberately not a
          SafeAreaView, since the card renders behind the status bar/home
          indicator, not inset from them. */}
      <View style={styles.deck}>
        {visibleCards.map((persona) => {
          const isFront = persona.id === front.id;
          return (
            <SwipeDeckCard
              key={persona.id}
              ref={isFront ? frontCardRef : undefined}
              persona={persona}
              isFront={isFront}
              onSwiped={handleSwiped}
              onDragDirectionChange={setDragDirection}
            />
          );
        })}
      </View>

      {/* Floats on top of the full-bleed card, per Figma — box-none so the
          empty space around the two buttons still reaches the card's pan
          gesture underneath instead of swallowing the touch. */}
      <View
        pointerEvents="box-none"
        style={[styles.actions, { bottom: insets.bottom + ACTIONS_BOTTOM_OFFSET }]}
      >
        <SwipeActions
          onNah={() => frontCardRef.current?.swipeLeft()}
          onYeah={() => frontCardRef.current?.swipeRight()}
          dragDirection={dragDirection}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  deck: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  actions: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});
