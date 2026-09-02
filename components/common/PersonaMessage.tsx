import { StyleSheet, Text, View } from 'react-native';

import { radius, spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';

type PersonaMessageProps = {
  text: string;
};

export function PersonaMessage({ text }: PersonaMessageProps) {
  const { colors } = useTheme();

  return (
    <View style={[styles.bubble, { backgroundColor: colors.surfaceMessage }]}>
      <Text style={[styles.text, { color: colors.textHeading }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    borderRadius: radius.message,
    paddingHorizontal: 14,
    paddingVertical: spacing.sm,
  },
  text: {
    fontFamily: typography.personaDescription.fontFamily,
    fontSize: typography.personaDescription.fontSize,
    lineHeight: typography.personaDescription.lineHeight,
    letterSpacing: typography.personaDescription.letterSpacing,
  },
});
