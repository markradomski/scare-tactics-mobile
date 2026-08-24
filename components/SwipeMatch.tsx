import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import { sizes, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';
import { PersonaMessage } from './PersonaMessage';
import { PrimaryCta } from './PrimaryCta';

type SwipeMatchProps = {
  persona: Persona;
  onContinue: () => void;
};

export function SwipeMatch({ persona, onContinue }: SwipeMatchProps) {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={SlideInLeft.duration(350)}
      style={[styles.container, { backgroundColor: colors.surfaceCard }]}
    >
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

      <View style={styles.ctaWrapper}>
        <PrimaryCta label="Continue" onPress={onContinue} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
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
  ctaWrapper: {
    width: '100%',
    marginTop: 'auto',
  },
});
