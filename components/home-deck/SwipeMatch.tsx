import { Image, StyleSheet, Text, View } from 'react-native';

import { sizes, spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import type { Persona } from '../../types/persona';
import { PersonaMessage } from '../common';

type SwipeMatchProps = {
  persona: Persona;
};

export function SwipeMatch({ persona }: SwipeMatchProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceCard }]}>
      <View style={[styles.avatarRing, { borderColor: colors.actionYeah }]}>
        <Image source={persona.avatar} style={styles.avatar} />
      </View>

      <Text style={[styles.title, { color: colors.actionYeah }]}>IT&apos;S A MATCH</Text>
      <Text style={[styles.subtitle, { color: colors.textBody }]}>
        {persona.name} is now your accountability buddy.
      </Text>

      <View style={styles.messageWrapper}>
        <PersonaMessage text={persona.matchMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: 140,
    paddingBottom: spacing.xxl,
  },
  avatarRing: {
    width: sizes.matchAvatarRing,
    height: sizes.matchAvatarRing,
    borderRadius: sizes.matchAvatarRing / 2,
    borderWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: sizes.matchAvatar,
    height: sizes.matchAvatar,
    borderRadius: sizes.matchAvatar / 2,
  },
  title: {
    fontFamily: typography.matchTitle.fontFamily,
    fontSize: typography.matchTitle.fontSize,
    letterSpacing: typography.matchTitle.letterSpacing,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
  subtitle: {
    fontFamily: typography.matchSubtitle.fontFamily,
    fontSize: typography.matchSubtitle.fontSize,
    letterSpacing: typography.matchSubtitle.letterSpacing,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  messageWrapper: {
    width: '100%',
    marginTop: spacing.xxl,
  },
});
