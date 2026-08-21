import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { radius, sizes, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';

type SwipeMatchProps = {
  persona: Persona;
  onContinue: () => void;
};

export function SwipeMatch({ persona, onContinue }: SwipeMatchProps) {
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

      <View style={[styles.messageBubble, { backgroundColor: colors.surfaceMessage }]}>
        <Text style={[styles.messageText, { color: colors.textHeading }]}>
          {persona.matchMessage}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Continue"
        onPress={onContinue}
        style={[styles.cta, { backgroundColor: colors.actionYeah }]}
      >
        <Text style={[styles.ctaLabel, { color: colors.textOnAccent }]}>Continue</Text>
      </Pressable>
    </View>
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
  messageBubble: {
    width: '100%',
    borderRadius: radius.message,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
    marginTop: spacing.xxl,
  },
  messageText: {
    fontFamily: typography.personaDescription.fontFamily,
    fontSize: typography.personaDescription.fontSize,
    lineHeight: typography.personaDescription.lineHeight,
    letterSpacing: typography.personaDescription.letterSpacing,
  },
  cta: {
    width: '100%',
    height: sizes.actionButton + 2,
    borderRadius: radius.matchCta,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  ctaLabel: {
    fontFamily: typography.matchCta.fontFamily,
    fontSize: typography.matchCta.fontSize,
    letterSpacing: typography.matchCta.letterSpacing,
  },
});
