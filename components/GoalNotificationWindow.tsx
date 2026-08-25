import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, spacing, typography } from '../constants/tokens';
import { getMalcolmTimeVariantMessage } from '../data/malcolmTimeVariants';
import { useTheme } from '../hooks/useTheme';
import { useGoalStore } from '../store/goalStore';
import type { DailyTimeWindow } from '../store/goalStore';
import type { Persona } from '../types/persona';
import { CoachHeader } from './CoachHeader';
import { GoalTimeSlider } from './GoalTimeSlider';
import { PersonaMessage } from './PersonaMessage';
import { PrimaryCta } from './PrimaryCta';

type GoalNotificationWindowProps = {
  persona: Persona;
  onContinue: () => void;
};

// Matches the 4 named goal-notification variants from Figma
// (5am-6am, 9am-12pm, 12pm-6pm, 6am-midnight) — see data/malcolmTimeVariants.ts.
const PRESET_WINDOWS: { label: string; window: DailyTimeWindow }[] = [
  { label: '5am–6am', window: { startHour: 5, endHour: 6 } },
  { label: '9am–12pm', window: { startHour: 9, endHour: 12 } },
  { label: '12pm–6pm', window: { startHour: 12, endHour: 18 } },
  { label: '6am–Midnight', window: { startHour: 6, endHour: 24 } },
];

function isSameWindow(a: DailyTimeWindow, b: DailyTimeWindow) {
  return a.startHour === b.startHour && a.endHour === b.endHour;
}

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

        <View style={styles.presetRow}>
          {PRESET_WINDOWS.map((preset) => {
            const isActive = isSameWindow(dailyTimeWindow, preset.window);
            return (
              <Pressable
                key={preset.label}
                onPress={() => setDailyTimeWindow(preset.window)}
                accessibilityRole="button"
                accessibilityLabel={preset.label}
                style={[
                  styles.presetChip,
                  {
                    backgroundColor: isActive ? colors.textAccent : 'transparent',
                    borderColor: isActive ? colors.textAccent : colors.borderCard,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.presetChipLabel,
                    { color: isActive ? colors.textInverse : colors.textBody },
                  ]}
                >
                  {preset.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
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
  presetRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  presetChip: {
    borderWidth: 1,
    borderRadius: radius.pickerDay,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  presetChipLabel: {
    fontFamily: typography.presetChip.fontFamily,
    fontSize: typography.presetChip.fontSize,
  },
  messageWrapper: {
    marginTop: spacing.xxl,
  },
  ctaWrapper: {
    marginTop: 'auto',
  },
});
