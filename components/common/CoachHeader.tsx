import { StyleSheet, View } from 'react-native';

import { spacing } from '../../constants/tokens';
import type { Persona } from '../../types/persona';
import { Avatar } from '../atoms/Avatar';
import { PersonaMessage } from './PersonaMessage';

type CoachHeaderProps = {
  persona: Persona;
  message: string;
};

export function CoachHeader({ persona, message }: CoachHeaderProps) {
  return (
    <View style={styles.row}>
      <Avatar source={persona.avatar} size="small" />
      <View style={styles.messageWrapper}>
        <PersonaMessage text={message} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    width: '100%',
  },
  messageWrapper: {
    flex: 1,
  },
});
