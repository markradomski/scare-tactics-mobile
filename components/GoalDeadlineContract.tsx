import { Image, StyleSheet, Text, View } from 'react-native';
import Animated, { SlideInLeft } from 'react-native-reanimated';

import { radius, sizes, spacing, typography } from '../constants/tokens';
import { formatHourLabel } from './GoalTimeSlider';
import { useTheme } from '../hooks/useTheme';
import { useGoalStore } from '../store/goalStore';
import type { Persona } from '../types/persona';
import { formatShortDate } from '../utils/date';
import { PrimaryCta } from './PrimaryCta';
import { SecondaryCta } from './SecondaryCta';

type GoalDeadlineContractProps = {
  persona: Persona;
  onLockIn: () => void;
  onPussyOut: () => void;
};

export function GoalDeadlineContract({ persona, onLockIn, onPussyOut }: GoalDeadlineContractProps) {
  const { colors } = useTheme();
  const goalText = useGoalStore((state) => state.goalText);
  const deadline = useGoalStore((state) => state.deadline);
  const dailyTimeWindow = useGoalStore((state) => state.dailyTimeWindow);

  const deadlineLabel = deadline ? formatShortDate(new Date(deadline)) : '—';
  const timeWindowLabel = `${formatHourLabel(dailyTimeWindow.startHour)} – ${formatHourLabel(dailyTimeWindow.endHour)}`;

  return (
    <Animated.View
      entering={SlideInLeft.duration(350)}
      style={[styles.container, { backgroundColor: colors.surfaceCard }]}
    >
      <Image source={persona.avatar} style={styles.avatar} />

      <Text style={[styles.title, { color: colors.textHeading }]}>Lock In The Deal</Text>
      <Text style={[styles.subtitle, { color: colors.textBody }]}>
        {persona.name} will hold you to it.
      </Text>

      <View style={styles.body}>
        <Text style={[styles.fieldLabel, { color: colors.textBody }]}>THE GOAL</Text>
        <View style={[styles.goalBox, { backgroundColor: colors.surfaceMessage }]}>
          <Text style={[styles.goalText, { color: colors.textHeading }]}>{goalText}</Text>
        </View>

        <Text style={[styles.fieldLabel, styles.deadlineLabel, { color: colors.textBody }]}>
          DEADLINE
        </Text>
        <Text style={[styles.deadlineValue, { color: colors.textHeading }]}>{deadlineLabel}</Text>

        <Text style={[styles.fieldLabel, styles.notificationLabel, { color: colors.textBody }]}>
          NOTIFICATION WINDOW
        </Text>
        <Text style={[styles.timeWindowValue, { color: colors.textAccent }]}>{timeWindowLabel}</Text>
      </View>

      <View style={styles.ctaRow}>
        <PrimaryCta label="Lock it in" onPress={onLockIn} fullWidth={false} />
        <SecondaryCta label="Pussy out" onPress={onPussyOut} />
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
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: 56,
    paddingBottom: spacing.xl,
  },
  avatar: {
    width: sizes.matchAvatar - 4,
    height: sizes.matchAvatar - 4,
    borderRadius: (sizes.matchAvatar - 4) / 2,
  },
  title: {
    fontFamily: typography.personaTitle.fontFamily,
    fontSize: typography.personaTitle.fontSize,
    lineHeight: typography.personaTitle.lineHeight,
    letterSpacing: typography.personaTitle.letterSpacing,
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontFamily: typography.personaVoiceLabel.fontFamily,
    fontSize: typography.personaVoiceLabel.fontSize,
    lineHeight: typography.personaVoiceLabel.lineHeight,
    letterSpacing: typography.personaVoiceLabel.letterSpacing,
    textAlign: 'center',
    marginTop: 8,
  },
  body: {
    width: '100%',
    marginTop: 33,
  },
  fieldLabel: {
    fontFamily: typography.fieldLabel.fontFamily,
    fontSize: typography.fieldLabel.fontSize,
    letterSpacing: typography.fieldLabel.letterSpacing,
  },
  goalBox: {
    height: 133,
    borderRadius: radius.textarea,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    marginTop: 8,
  },
  goalText: {
    fontFamily: typography.goalTextarea.fontFamily,
    fontSize: typography.goalTextarea.fontSize,
    lineHeight: typography.goalTextarea.lineHeight,
    letterSpacing: typography.goalTextarea.letterSpacing,
  },
  deadlineLabel: {
    marginTop: 34,
  },
  deadlineValue: {
    fontFamily: typography.contractDate.fontFamily,
    fontSize: typography.contractDate.fontSize,
    marginTop: 4,
  },
  notificationLabel: {
    marginTop: 38,
  },
  timeWindowValue: {
    fontFamily: typography.contractTimeWindow.fontFamily,
    fontSize: typography.contractTimeWindow.fontSize,
    textAlign: 'center',
    marginTop: 8,
  },
  ctaRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 16,
    marginTop: 'auto',
  },
});
