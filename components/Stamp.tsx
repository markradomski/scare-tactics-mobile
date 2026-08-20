import { StyleSheet, Text } from 'react-native';

import { radius, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';

type StampProps = {
  label: 'NAH' | 'YEAH';
};

export function Stamp({ label }: StampProps) {
  const { colors } = useTheme();
  const tint = label === 'YEAH' ? colors.actionYeah : colors.actionNah;

  return (
    <Text style={[styles.stamp, { borderColor: tint, color: tint }]}>{label}</Text>
  );
}

const styles = StyleSheet.create({
  stamp: {
    borderWidth: 4,
    borderRadius: radius.stamp,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontFamily: typography.stamp.fontFamily,
    fontSize: typography.stamp.fontSize,
    letterSpacing: typography.stamp.letterSpacing,
    overflow: 'hidden',
  },
});
