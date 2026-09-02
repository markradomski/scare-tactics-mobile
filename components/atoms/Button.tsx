import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, sizes, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';

type ButtonProps = {
  label: string;
  onPress: () => void;
  fullWidth?: boolean;
  variant: 'primary' | 'secondary';
};

export function Button({ label, onPress, fullWidth = true, variant }: ButtonProps) {
  const { colors } = useTheme();

  const backgroundColor = variant === 'primary' ? colors.actionYeah : undefined;
  const borderColor = variant === 'secondary' ? colors.actionNah : undefined;
  const textColor =
    variant === 'primary' ? colors.textOnAccent : colors.actionNah;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[
        styles.button,
        fullWidth ? styles.fullWidth : styles.halfWidth,
        variant === 'secondary' && styles.secondary,
        { backgroundColor, borderColor },
      ]}
    >
      <Text style={[styles.label, { color: textColor }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: sizes.actionButton + 2,
    borderRadius: radius.cta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: { width: '100%' },
  halfWidth: { flex: 1 },
  secondary: {
    borderWidth: 2,
  },
  label: {
    fontFamily: typography.cta.fontFamily,
    fontSize: typography.cta.fontSize,
    letterSpacing: typography.cta.letterSpacing,
  },
});
