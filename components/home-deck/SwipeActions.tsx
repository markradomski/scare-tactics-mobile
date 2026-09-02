import { StyleSheet, View } from 'react-native';

import { sizes } from '../../constants/tokens';
import type { DragActionDirection } from '../../hooks/useSwipeGesture';
import { PersonaAction } from '../match/PersonaAction';

type SwipeActionsProps = {
  onNah: () => void;
  onYeah: () => void;
  dragDirection?: DragActionDirection;
};

export function SwipeActions({ onNah, onYeah, dragDirection = null }: SwipeActionsProps) {
  return (
    <View style={styles.row}>
      <PersonaAction variant="nah" onPress={onNah} forcePressed={dragDirection === 'nah'} />
      <PersonaAction variant="yeah" onPress={onYeah} forcePressed={dragDirection === 'yeah'} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizes.actionGap,
    height: sizes.actionButton,
  },
});
