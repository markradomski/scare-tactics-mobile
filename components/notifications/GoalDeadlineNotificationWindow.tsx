import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import { useGoalStore } from '../../store/goalStore';
import type { Persona } from '../../types/persona';
import { formatShortDate } from '../../utils/date';
import { CoachHeader } from '../common';
import { GoalTextarea } from '../forms';

type GoalDeadlineNotificationWindowProps = {
  persona: Persona;
};

export function GoalDeadlineNotificationWindow({ persona }: GoalDeadlineNotificationWindowProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const goalText = useGoalStore((state) => state.goalText);
  const deadline = useGoalStore((state) => state.deadline);

  const deadlineLabel = deadline ? formatShortDate(new Date(deadline)) : '—';

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surfaceCard,
          paddingTop: insets.top + spacing.md,
        },
      ]}
    >
      <CoachHeader persona={persona} message={persona.chatOpener} />

      <Text style={[styles.label, { color: colors.textAccent }]}>Your goal</Text>
      <GoalTextarea value={goalText} editable={false} />

      <Text style={[styles.fieldLabel, { color: colors.textBody }]}>DEADLINE</Text>
      <Text style={[styles.deadlineValue, { color: colors.textHeading }]}>{deadlineLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
