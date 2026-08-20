import { Image, StyleSheet, Text, View } from 'react-native';

import { radius, sizes, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';
import { VoiceIcon } from './VoiceIcon';

type PersonaCardProps = {
  persona: Persona;
};

export function PersonaCard({ persona }: PersonaCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
      ]}
    >
      <View style={styles.avatarWrapper}>
        <Image source={persona.avatar} style={styles.avatar} />
      </View>

      <Text style={[styles.title, { color: colors.textHeading }]}>{persona.name}</Text>

      <View style={styles.voiceRow}>
        <View
          style={[
            styles.voiceCircle,
            { backgroundColor: colors.surfaceVoice, borderColor: colors.borderCard },
          ]}
        >
          <VoiceIcon size={sizes.voiceIcon} color={colors.textHeading} />
        </View>
        <Text style={[styles.voiceLabel, { color: colors.textBody }]}>
          {persona.voiceLabel}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textHeading }]}>
          Communication Style
        </Text>
        <Text style={[styles.styleName, { color: colors.textAccent }]}>
          {persona.styleName}
        </Text>
        <Text style={[styles.description, { color: colors.textBody }]}>
          {persona.description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: '100%',
    borderRadius: radius.card,
    borderWidth: 1,
    alignItems: 'center',
    overflow: 'hidden',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
    gap: spacing.lg,
  },
  avatarWrapper: {
    width: sizes.avatar,
    height: sizes.avatar,
    borderRadius: sizes.avatar / 2,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontFamily: typography.personaTitle.fontFamily,
    fontSize: typography.personaTitle.fontSize,
    lineHeight: typography.personaTitle.lineHeight,
    letterSpacing: typography.personaTitle.letterSpacing,
    textAlign: 'center',
  },
  voiceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  voiceCircle: {
    width: sizes.voiceCircle,
    height: sizes.voiceCircle,
    borderRadius: sizes.voiceCircle / 2,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voiceLabel: {
    fontFamily: typography.personaVoiceLabel.fontFamily,
    fontSize: typography.personaVoiceLabel.fontSize,
    lineHeight: typography.personaVoiceLabel.lineHeight,
    letterSpacing: typography.personaVoiceLabel.letterSpacing,
  },
  section: {
    width: '100%',
    gap: spacing.xs,
  },
  sectionTitle: {
    fontFamily: typography.personaSectionTitle.fontFamily,
    fontSize: typography.personaSectionTitle.fontSize,
    lineHeight: typography.personaSectionTitle.lineHeight,
    letterSpacing: typography.personaSectionTitle.letterSpacing,
  },
  styleName: {
    fontFamily: typography.personaStyleName.fontFamily,
    fontSize: typography.personaStyleName.fontSize,
    lineHeight: typography.personaStyleName.lineHeight,
    letterSpacing: typography.personaStyleName.letterSpacing,
  },
  description: {
    fontFamily: typography.personaDescription.fontFamily,
    fontSize: typography.personaDescription.fontSize,
    lineHeight: typography.personaDescription.lineHeight,
    letterSpacing: typography.personaDescription.letterSpacing,
  },
});
