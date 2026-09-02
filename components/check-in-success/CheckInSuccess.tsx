import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cameraColors, spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import type { Persona } from '../../types/persona';
import { CoachHeader } from '../common';

type CheckInSuccessProps = {
  persona: Persona;
  weightKg: number;
};

export function CheckInSuccess({ persona, weightKg }: CheckInSuccessProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <View pointerEvents="none" style={styles.topScrim} />

      <View style={{ paddingTop: insets.top + spacing.sm }}>
        <CoachHeader persona={persona} message={persona.successMessage} />
      </View>

      <View style={[styles.weighIn, { backgroundColor: colors.surfaceWeighIn }]}>
        <Text style={[styles.weighInValue, { color: colors.textHeading }]}>
          {weightKg.toFixed(1)}
        </Text>
        <Text style={[styles.weighInUnit, { color: colors.textBody }]}>kg</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: cameraColors.background,
    paddingHorizontal: spacing.md,
  },
  topScrim: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 220,
    backgroundColor: cameraColors.topScrim,
  },
  weighIn: {
    position: 'absolute',
    left: 52,
    top: 220,
    width: 300,
    height: 300,
    borderRadius: 150,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  weighInValue: {
    fontFamily: typography.weighInValue.fontFamily,
    fontSize: typography.weighInValue.fontSize,
  },
  weighInUnit: {
    fontFamily: typography.weighInUnit.fontFamily,
    fontSize: typography.weighInUnit.fontSize,
    letterSpacing: typography.weighInUnit.letterSpacing,
    textAlign: 'center',
  },
});
