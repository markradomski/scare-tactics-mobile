import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { Persona } from '../types/persona';
import { CoachHeader } from './CoachHeader';
import { FailStamp } from './FailStamp';
import { SecondaryCta } from './SecondaryCta';

type CheckInFailProps = {
  persona: Persona;
  onTryAgain: () => void;
};

export function CheckInFail({ persona, onTryAgain }: CheckInFailProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + spacing.md,
        },
      ]}
    >
      <CoachHeader persona={persona} message={persona.failMessage} />

      <View style={styles.stampWrapper}>
        <FailStamp />
      </View>

      <View style={styles.ctaWrapper}>
        <SecondaryCta label="Try again you big fanny" onPress={onTryAgain} fullWidth />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  stampWrapper: {
    marginTop: 114,
    alignItems: 'center',
  },
  ctaWrapper: {
    marginTop: 'auto',
  },
});
