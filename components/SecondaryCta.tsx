import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, sizes, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';

type SecondaryCtaProps = {
  label: string;
  onPress: () => void;
};

export function SecondaryCta({ label, onPress }: SecondaryCtaProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.button, { borderColor: colors.actionNah }]}
    >
      <Text style={[styles.label, { color: colors.actionNah }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: sizes.actionButton + 2,
    borderRadius: radius.cta,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: typography.cta.fontFamily,
    fontSize: typography.cta.fontSize,
    letterSpacing: typography.cta.letterSpacing,
  },
});
