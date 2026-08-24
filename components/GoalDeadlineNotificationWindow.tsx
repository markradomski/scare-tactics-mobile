import { StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { useGoalStore } from '../store/goalStore';
import type { Persona } from '../types/persona';
import { formatShortDate } from '../utils/date';
import { CoachHeader } from './CoachHeader';
import { GoalTextarea } from './GoalTextarea';
import { PrimaryCta } from './PrimaryCta';

type GoalDeadlineNotificationWindowProps = {
  persona: Persona;
  onContinue: () => void;
};

export function GoalDeadlineNotificationWindow({ persona, onContinue }: GoalDeadlineNotificationWindowProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const goalText = useGoalStore((state) => state.goalText);
  const deadline = useGoalStore((state) => state.deadline);

  const deadlineLabel = deadline ? formatShortDate(new Date(deadline)) : '—';

  return (
    <Animated.View
      entering={SlideInLeft.duration(350)}
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          paddingTop: insets.top + spacing.md,
          paddingBottom: insets.bottom + spacing.md,
        },
      ]}
    >
      <CoachHeader persona={persona} message={persona.chatOpener} />

      <Text style={[styles.label, { color: colors.textAccent }]}>Your goal</Text>
      <GoalTextarea value={goalText} editable={false} />

      <Text style={[styles.fieldLabel, { color: colors.textBody }]}>DEADLINE</Text>
      <Text style={[styles.deadlineValue, { color: colors.textHeading }]}>{deadlineLabel}</Text>

      <View style={styles.ctaWrapper}>
        <PrimaryCta label="Continue" onPress={onContinue} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: spacing.md,
  },
  label: {
    fontFamily: typography.personaStyleName.fontFamily,
    fontSize: typography.personaStyleName.fontSize,
    letterSpacing: typography.personaStyleName.letterSpacing,
    marginTop: spacing.xl,
    marginBottom: spacing.sm,
  },
  fieldLabel: {
    fontFamily: typography.fieldLabel.fontFamily,
    fontSize: typography.fieldLabel.fontSize,
    letterSpacing: typography.fieldLabel.letterSpacing,
    marginTop: 153,
  },
  deadlineValue: {
    fontFamily: typography.contractDate.fontFamily,
    fontSize: typography.contractDate.fontSize,
    marginTop: 20,
  },
  ctaWrapper: {
    marginTop: 'auto',
  },
});
