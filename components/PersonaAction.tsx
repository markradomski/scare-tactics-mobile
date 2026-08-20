import { Pressable, StyleSheet, Text } from 'react-native';

import { radius, sizes } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { YeahIcon } from './YeahIcon';

type PersonaActionProps = {
  variant: 'nah' | 'yeah';
  onPress: () => void;
  forcePressed?: boolean;
};

export function PersonaAction({ variant, onPress, forcePressed = false }: PersonaActionProps) {
  const { colors } = useTheme();
  const tint = variant === 'nah' ? colors.actionNah : colors.actionYeah;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={variant === 'nah' ? 'Nah' : 'Yeah'}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed || forcePressed ? tint : colors.surfaceCard,
          borderColor: colors.borderDefault,
        },
      ]}
    >
      {({ pressed }) => {
        const glyphColor = pressed || forcePressed ? colors.surfaceCard : tint;
        return variant === 'nah' ? (
          <Text style={[styles.glyphText, { color: glyphColor }]}>✕</Text>
        ) : (
          <YeahIcon size={24} color={glyphColor} />
        );
      }}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: sizes.actionButton,
    height: sizes.actionButton,
    borderRadius: radius.action,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  glyphText: {
    fontSize: 24,
    lineHeight: 24,
  },
});
