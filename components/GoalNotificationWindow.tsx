import { StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { spacing, typography } from '../constants/tokens';
import { getMalcolmTimeVariantMessage } from '../data/malcolmTimeVariants';
import { useTheme } from '../hooks/useTheme';
import { useGoalStore } from '../store/goalStore';
import type { Persona } from '../types/persona';
import { CoachHeader } from './CoachHeader';
import { GoalTimeSlider } from './GoalTimeSlider';
import { PersonaMessage } from './PersonaMessage';
import { PrimaryCta } from './PrimaryCta';

type GoalNotificationWindowProps = {
  persona: Persona;
  onContinue: () => void;
};

export function GoalNotificationWindow({ persona, onContinue }: GoalNotificationWindowProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const dailyTimeWindow = useGoalStore((state) => state.dailyTimeWindow);
  const setDailyTimeWindow = useGoalStore((state) => state.setDailyTimeWindow);

  const commitmentMessage =
    persona.id === 'malcolm-tucker'
      ? getMalcolmTimeVariantMessage(dailyTimeWindow)
      : persona.commitmentMessage;

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
      <CoachHeader persona={persona} message={persona.windowPrompt} />

      <View style={styles.controlBlock}>
        <Text style={[styles.controlLabel, { color: colors.textHeading }]}>
          When should {persona.name} check in?
        </Text>
        <GoalTimeSlider value={dailyTimeWindow} onChange={setDailyTimeWindow} />
      </View>

      <View style={styles.messageWrapper}>
        <PersonaMessage text={commitmentMessage} />
      </View>

      <View style={styles.ctaWrapper}>
        <PrimaryCta label="Set window" onPress={onContinue} />
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
  controlBlock: {
    marginTop: spacing.xl,
    gap: 15,
  },
  controlLabel: {
    fontFamily: typography.personaStyleName.fontFamily,
    fontSize: typography.personaStyleName.fontSize,
    lineHeight: typography.personaStyleName.lineHeight,
    letterSpacing: typography.personaStyleName.letterSpacing,
  },
  messageWrapper: {
    marginTop: spacing.xxl,
  },
  ctaWrapper: {
    marginTop: 'auto',
  },
});
