import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeActions } from '../components/SwipeActions';
import type { SwipeDeckCardHandle } from '../components/SwipeDeckCard';
import { StaticSwipeCard, SwipeDeckCard } from '../components/SwipeDeckCard';
import { spacing } from '../constants/tokens';
import { personas } from '../data/personas';
import type { DragActionDirection, SwipeDirection } from '../hooks/useSwipeGesture';
import { useTheme } from '../hooks/useTheme';

export default function SwipeBrowse() {
  const { colors } = useTheme();
  const [queue, setQueue] = useState(personas);
  const [dragDirection, setDragDirection] = useState<DragActionDirection>(null);
  const frontCardRef = useRef<SwipeDeckCardHandle>(null);

  const front = queue[0];
  const back = queue[1] ?? queue[0];

  const handleSwiped = (_direction: SwipeDirection) => {
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
    setDragDirection(null);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.deck}>
        <StaticSwipeCard key={back.id} persona={back} />
        <SwipeDeckCard
          key={front.id}
          ref={frontCardRef}
          persona={front}
          onSwiped={handleSwiped}
          onDragDirectionChange={setDragDirection}
        />
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
