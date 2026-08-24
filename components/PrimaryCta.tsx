import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, sizes, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';

type PrimaryCtaProps = {
  label: string;
  onPress: () => void;
};

export function PrimaryCta({ label, onPress }: PrimaryCtaProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.button, { backgroundColor: colors.actionYeah }]}
    >
      <Text style={[styles.label, { color: colors.textOnAccent }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: sizes.actionButton + 2,
    borderRadius: radius.cta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: typography.cta.fontFamily,
    fontSize: typography.cta.fontSize,
    letterSpacing: typography.cta.letterSpacing,
  },
});
