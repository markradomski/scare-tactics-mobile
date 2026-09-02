import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import { useGoalStore } from '../../store/goalStore';
import type { Persona } from '../../types/persona';
import { CoachHeader } from '../common';
import { GoalTextarea } from '../forms';

type GoalDeadlineChatProps = {
  persona: Persona;
};

export function GoalDeadlineChat({ persona }: GoalDeadlineChatProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const goalText = useGoalStore((state) => state.goalText);
  const setGoalText = useGoalStore((state) => state.setGoalText);

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
      <GoalTextarea
        value={goalText}
        onChangeText={setGoalText}
        placeholder="I want to run a half marathon by Christmas"
      />
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
});
