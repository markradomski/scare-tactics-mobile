import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, sizes, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';

type SecondaryCtaProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
};

export function SecondaryCta({ label, onPress, fullWidth = false }: SecondaryCtaProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.button,
        fullWidth ? styles.fullWidth : styles.halfWidth,
        { borderColor: colors.actionNah },
      ]}
    >
      <Text style={[styles.label, { color: colors.actionNah }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: sizes.actionButton + 2,
    borderRadius: radius.cta,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  halfWidth: { flex: 1 },
  label: {
    fontFamily: typography.cta.fontFamily,
    fontSize: typography.cta.fontSize,
    letterSpacing: typography.cta.letterSpacing,
  },
});
