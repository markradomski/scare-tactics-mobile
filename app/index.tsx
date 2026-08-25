import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CameraCheckIn } from '../components/CameraCheckIn';
import { CheckInFail } from '../components/CheckInFail';
import { CheckInSuccess } from '../components/CheckInSuccess';
import { GoalDeadlineChat } from '../components/GoalDeadlineChat';
import { GoalDeadlineContract } from '../components/GoalDeadlineContract';
import { GoalDeadlineNotificationWindow } from '../components/GoalDeadlineNotificationWindow';
import { GoalNotificationWindow } from '../components/GoalNotificationWindow';
import { SwipeActions } from '../components/SwipeActions';
import type { SwipeDeckCardHandle } from '../components/SwipeDeckCard';
import { SwipeDeckCard } from '../components/SwipeDeckCard';
import { SwipeMatch } from '../components/SwipeMatch';
import { spacing } from '../constants/tokens';
import { personas } from '../data/personas';
import type { DragActionDirection, SwipeDirection } from '../hooks/useSwipeGesture';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';

type PostSwipeStage =
  | 'match'
  | 'goal-chat'
  | 'deadline-window'
  | 'time-window'
  | 'contract'
  | 'camera-check-in'
  | 'check-in-success'
  | 'check-in-fail'
  | null;

export default function SwipeBrowse() {
  const { colors } = useTheme();
  const [queue, setQueue] = useState(personas);
  const [dragDirection, setDragDirection] = useState<DragActionDirection>(null);
  const [matchedPersona, setMatchedPersona] = useState<Persona | null>(null);
  const [postSwipeStage, setPostSwipeStage] = useState<PostSwipeStage>(null);
  const [weighInKg, setWeighInKg] = useState(0);
  const frontCardRef = useRef<SwipeDeckCardHandle>(null);

  const front = queue[0];
  const back = queue[1] ?? queue[0];

  const handleSwiped = (direction: SwipeDirection) => {
    if (direction === 'right') {
      setMatchedPersona(front);
      setPostSwipeStage('match');
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

      {matchedPersona && postSwipeStage === 'match' && (
        <SwipeMatch persona={matchedPersona} onContinue={() => setPostSwipeStage('goal-chat')} />
      )}

      {matchedPersona && postSwipeStage === 'goal-chat' && (
        <GoalDeadlineChat
          persona={matchedPersona}
          onContinue={() => setPostSwipeStage('deadline-window')}
        />
      )}

      {matchedPersona && postSwipeStage === 'deadline-window' && (
        <GoalDeadlineNotificationWindow
          persona={matchedPersona}
          onContinue={() => setPostSwipeStage('time-window')}
        />
      )}

      {matchedPersona && postSwipeStage === 'time-window' && (
        <GoalNotificationWindow
          persona={matchedPersona}
          onContinue={() => setPostSwipeStage('contract')}
        />
      )}

      {matchedPersona && postSwipeStage === 'contract' && (
        <GoalDeadlineContract
          persona={matchedPersona}
          onLockIn={() => setPostSwipeStage('camera-check-in')}
          onPussyOut={() => {
            setPostSwipeStage(null);
            setMatchedPersona(null);
          }}
        />
      )}

      {matchedPersona && postSwipeStage === 'camera-check-in' && (
        <CameraCheckIn
          persona={matchedPersona}
          onCapture={() => {
            setWeighInKg(Math.round((60 + Math.random() * 30) * 10) / 10);
            setPostSwipeStage('check-in-success');
          }}
          onTimeout={() => setPostSwipeStage('check-in-fail')}
        />
      )}

      {matchedPersona && postSwipeStage === 'check-in-success' && (
        <CheckInSuccess
          persona={matchedPersona}
          weightKg={weighInKg}
          onDone={() => {
            setPostSwipeStage(null);
            setMatchedPersona(null);
          }}
        />
      )}

      {matchedPersona && postSwipeStage === 'check-in-fail' && (
        <CheckInFail
          persona={matchedPersona}
          onTryAgain={() => setPostSwipeStage('camera-check-in')}
        />
      )}
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
