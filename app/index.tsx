import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeActions } from '../components/SwipeActions';
import type { SwipeDeckCardHandle } from '../components/SwipeDeckCard';
import { SwipeDeckCard } from '../components/SwipeDeckCard';
import { spacing } from '../constants/tokens';
import { personas } from '../data/personas';
import type { DragActionDirection, SwipeDirection } from '../hooks/useSwipeGesture';
import { useTheme } from '../hooks/useTheme';
import { useSessionStore } from '../store/sessionStore';

export default function SwipeBrowse() {
  const { colors } = useTheme();
  const router = useRouter();
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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
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

      <View style={styles.actions}>
        <SwipeActions
          onNah={() => frontCardRef.current?.swipeLeft()}
          onYeah={() => frontCardRef.current?.swipeRight()}
          dragDirection={dragDirection}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  deck: {
    flex: 1,
    width: '100%',
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: {
    paddingBottom: spacing.md,
  },
});
