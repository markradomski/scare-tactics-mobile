import { Fragment, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { useGoalStore } from '../store/goalStore';
import type { Persona } from '../types/persona';
import { CoachHeader } from './CoachHeader';
import { DeadlinePickerSheet } from './DeadlinePickerSheet';
import { GoalTextarea } from './GoalTextarea';
import { PrimaryCta } from './PrimaryCta';

type GoalDeadlineChatProps = {
  persona: Persona;
  onContinue: () => void;
};

export function GoalDeadlineChat({ persona, onContinue }: GoalDeadlineChatProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const goalText = useGoalStore((state) => state.goalText);
  const setGoalText = useGoalStore((state) => state.setGoalText);
  const setDeadline = useGoalStore((state) => state.setDeadline);
  const [pickerVisible, setPickerVisible] = useState(false);

  const handleConfirmDeadline = (date: Date) => {
    setDeadline(date);
    setPickerVisible(false);
    onContinue();
  };

  return (
    <Fragment>
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
        <GoalTextarea
          value={goalText}
          onChangeText={setGoalText}
          placeholder="I want to run a half marathon by Christmas"
        />

        <View style={styles.ctaWrapper}>
          <PrimaryCta label="Continue" onPress={() => setPickerVisible(true)} />
        </View>
      </Animated.View>

      <DeadlinePickerSheet visible={pickerVisible} onConfirm={handleConfirmDeadline} />
    </Fragment>
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
  ctaWrapper: {
    marginTop: 'auto',
  },
});
