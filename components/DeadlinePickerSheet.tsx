import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import DateTimePicker from 'react-native-calendars-datepicker';
import Animated, { FadeIn, SlideInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { radius, sizes, spacing, typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { PrimaryCta } from './PrimaryCta';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

type DeadlinePickerSheetProps = {
  visible: boolean;
  onConfirm: (date: Date) => void;
};

export function DeadlinePickerSheet({ visible, onConfirm }: DeadlinePickerSheetProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  if (!visible) {
    return null;
  }

  const goToPrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((year) => year - 1);
    } else {
      setViewMonth((month) => month - 1);
    }
  };

  const goToNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((year) => year + 1);
    } else {
      setViewMonth((month) => month + 1);
    }
  };

  return (
    <View style={styles.overlay}>
      <Animated.View entering={FadeIn.duration(200)} style={styles.scrimWrapper}>
        <View style={[styles.scrim, { backgroundColor: colors.surfaceCard }]} />
      </Animated.View>

      <Animated.View
        entering={SlideInDown.duration(300)}
        style={[
          styles.sheet,
          { backgroundColor: colors.surfaceCard, paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        <View style={[styles.handle, { backgroundColor: colors.borderCard }]} />

        <Text style={[styles.title, { color: colors.textHeading }]}>Set your deadline</Text>

        <View style={styles.calendarBlock}>
          <View style={styles.monthRow}>
            <Pressable onPress={goToPrevMonth} hitSlop={8} accessibilityRole="button" accessibilityLabel="Previous month">
              <Text style={[styles.chevron, { color: colors.textBody }]}>‹</Text>
            </Pressable>
            <Text style={[styles.monthLabel, { color: colors.textHeading }]}>
              {MONTH_NAMES[viewMonth]} {viewYear}
            </Text>
            <Pressable onPress={goToNextMonth} hitSlop={8} accessibilityRole="button" accessibilityLabel="Next month">
              <Text style={[styles.chevron, { color: colors.textBody }]}>›</Text>
            </Pressable>
          </View>

          <DateTimePicker
            mode="single"
            date={selectedDate}
            month={viewMonth}
            year={viewYear}
            onMonthChange={setViewMonth}
            onYearChange={setViewYear}
            onChange={({ date }) => {
              if (date) {
                setSelectedDate(new Date(date as string));
              }
            }}
            hideHeader
            weekdaysFormat="min"
            firstDayOfWeek={0}
            minDate={today}
            components={{
              Weekday: (weekday) => (
                <Text style={[styles.weekdayLabel, { color: colors.textBody }]}>
                  {weekday.name.min.charAt(0)}
                </Text>
              ),
            }}
            styles={{
              weekday_label: {
                fontFamily: typography.pickerWeekday.fontFamily,
                fontSize: typography.pickerWeekday.fontSize,
                color: colors.textBody,
                textTransform: 'none',
              },
              day_cell: { padding: 3 },
              day: { borderRadius: radius.pickerDay, aspectRatio: 1 },
              day_label: {
                fontFamily: typography.pickerDay.fontFamily,
                fontSize: typography.pickerDay.fontSize,
                color: colors.textHeading,
              },
              selected: { backgroundColor: colors.textAccent },
              selected_label: {
                fontFamily: typography.pickerDaySelected.fontFamily,
                fontSize: typography.pickerDaySelected.fontSize,
                color: colors.textInverse,
              },
              outside_label: { color: colors.textBody, opacity: 0.4 },
              disabled_label: { color: colors.textBody, opacity: 0.3 },
            }}
          />
        </View>

        <PrimaryCta label="Set deadline" onPress={() => onConfirm(selectedDate)} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scrimWrapper: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
  scrim: { flex: 1, opacity: 0.8 },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: radius.sheet,
    borderTopRightRadius: radius.sheet,
    paddingTop: spacing.md,
    paddingHorizontal: spacing.xl,
    alignItems: 'center',
    gap: spacing.xl,
  },
  handle: {
    width: sizes.sheetHandleWidth,
    height: sizes.sheetHandleHeight,
    borderRadius: sizes.sheetHandleHeight / 2,
  },
  title: {
    fontFamily: typography.personaSectionTitle.fontFamily,
    fontSize: typography.personaSectionTitle.fontSize,
    lineHeight: typography.personaSectionTitle.lineHeight,
    letterSpacing: typography.personaSectionTitle.letterSpacing,
  },
  calendarBlock: { width: '100%', gap: 14 },
  weekdayLabel: {
    fontFamily: typography.pickerWeekday.fontFamily,
    fontSize: typography.pickerWeekday.fontSize,
    textAlign: 'center',
  },
  monthRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: spacing.sm },
  chevron: {
    fontFamily: typography.pickerChevron.fontFamily,
    fontSize: typography.pickerChevron.fontSize,
    width: spacing.xl,
    textAlign: 'center',
  },
  monthLabel: {
    flex: 1,
    fontFamily: typography.personaTitle.fontFamily,
    fontSize: typography.personaTitle.fontSize,
    lineHeight: typography.personaTitle.lineHeight,
    letterSpacing: typography.personaTitle.letterSpacing,
    textAlign: 'center',
  },
});
