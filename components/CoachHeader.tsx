import { Image, StyleSheet, View } from 'react-native';

import { sizes, spacing } from '../constants/tokens';
import type { Persona } from '../types/persona';
import { PersonaMessage } from './PersonaMessage';

type CoachHeaderProps = {
  persona: Persona;
  message: string;
};

export function CoachHeader({ persona, message }: CoachHeaderProps) {
  return (
    <View style={styles.row}>
      <Image source={persona.avatar} style={styles.avatar} />
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
  avatar: {
    width: sizes.coachAvatar,
    height: sizes.coachAvatar,
    borderRadius: sizes.coachAvatar / 2,
  },
  messageWrapper: {
    flex: 1,
  },
});
