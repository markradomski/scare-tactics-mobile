import { StyleSheet, Text, View } from 'react-native';

import { radius, spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import type { Persona } from '../../types/persona';
import { Avatar } from '../atoms/Avatar';
import { PersonaVoice } from './PersonaVoice';

type PersonaCardProps = {
  persona: Persona;
  // Extra top padding for the inner content (avatar, title, etc.) — the
  // card's own background/border isn't affected, so it still touches
  // whatever edge its parent gives it (the full-bleed screen top, in
  // SwipeDeckCard).
  contentOffsetY?: number;
};

export function PersonaCard({ persona, contentOffsetY = 0 }: PersonaCardProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.card,
        { backgroundColor: colors.surfaceCard, borderColor: colors.borderCard },
        { paddingTop: spacing.xxl + contentOffsetY },
      ]}
    >
      <Avatar source={persona.avatar} size="large" />

      <Text style={[styles.title, { color: colors.textHeading }]}>{persona.name}</Text>

      <PersonaVoice persona={persona} />

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
  title: {
    fontFamily: typography.personaTitle.fontFamily,
    fontSize: typography.personaTitle.fontSize,
    lineHeight: typography.personaTitle.lineHeight,
    letterSpacing: typography.personaTitle.letterSpacing,
    textAlign: 'center',
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
