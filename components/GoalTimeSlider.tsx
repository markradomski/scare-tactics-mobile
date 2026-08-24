import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import type { DailyTimeWindow } from '../store/goalStore';

const TRACK_WIDTH = 360;
const TRACK_LEFT = 10;
const HOUR_WIDTH = TRACK_WIDTH / 24;
const HANDLE_SIZE = 20;
const MIN_GAP_HOURS = 1;
const MAX_HOUR = 24;

function clamp(value: number, min: number, max: number) {
  'worklet';
  return Math.min(Math.max(value, min), max);
}

export function formatHourLabel(hour: number) {
  if (hour === 24) return 'midnight';
  const normalized = ((hour % 24) + 24) % 24;
  if (normalized === 0) return '12am';
  if (normalized === 12) return '12pm';
  return normalized < 12 ? `${normalized}am` : `${normalized - 12}pm`;
}

type GoalTimeSliderProps = {
  value: DailyTimeWindow;
  onChange: (value: DailyTimeWindow) => void;
};

export function GoalTimeSlider({ value, onChange }: GoalTimeSliderProps) {
  const { colors } = useTheme();
  const [startHour, setStartHour] = useState(value.startHour);
  const [endHour, setEndHour] = useState(value.endHour);

  const startPx = useSharedValue(startHour * HOUR_WIDTH);
  const endPx = useSharedValue(endHour * HOUR_WIDTH);

  // Gesture objects are rebuilt every render (not memoized), so these can be
  // plain closures over the latest startHour/endHour — no ref mirroring needed.
  const commitStart = (hour: number) => {
    setStartHour(hour);
    onChange({ startHour: hour, endHour });
  };

  const commitEnd = (hour: number) => {
    setEndHour(hour);
    onChange({ startHour, endHour: hour });
  };

  const startGesture = Gesture.Pan()
    .onChange((e) => {
      const maxAllowed = endPx.value - MIN_GAP_HOURS * HOUR_WIDTH;
      startPx.value = clamp(startPx.value + e.changeX, 0, maxAllowed);
    })
    .onEnd(() => {
      const hour = Math.round(startPx.value / HOUR_WIDTH);
      startPx.value = withSpring(hour * HOUR_WIDTH);
      runOnJS(commitStart)(hour);
    });

  const endGesture = Gesture.Pan()
    .onChange((e) => {
      const minAllowed = startPx.value + MIN_GAP_HOURS * HOUR_WIDTH;
      endPx.value = clamp(endPx.value + e.changeX, minAllowed, MAX_HOUR * HOUR_WIDTH);
    })
    .onEnd(() => {
      const hour = Math.round(endPx.value / HOUR_WIDTH);
      endPx.value = withSpring(hour * HOUR_WIDTH);
      runOnJS(commitEnd)(hour);
    });

  const startHandleStyle = useAnimatedStyle(() => ({ left: startPx.value }));
  const endHandleStyle = useAnimatedStyle(() => ({ left: endPx.value }));
  const rangeStyle = useAnimatedStyle(() => ({
    left: TRACK_LEFT + startPx.value,
    width: endPx.value - startPx.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={[styles.rangeLabel, { color: colors.textAccent }]}>
        {formatHourLabel(startHour)} – {formatHourLabel(endHour)}
      </Text>

      <View style={styles.trackWrapper}>
        <View style={[styles.track, { backgroundColor: colors.borderCard }]} />
        <Animated.View style={[styles.range, { backgroundColor: colors.textAccent }, rangeStyle]} />

        <GestureDetector gesture={startGesture}>
          <Animated.View hitSlop={16} style={[styles.handle, startHandleStyle]}>
            <View
              style={[
                styles.handleDot,
                { backgroundColor: colors.surfaceCard, borderColor: colors.textAccent },
              ]}
            />
          </Animated.View>
        </GestureDetector>

        <GestureDetector gesture={endGesture}>
          <Animated.View hitSlop={16} style={[styles.handle, endHandleStyle]}>
            <View
              style={[
                styles.handleDot,
                { backgroundColor: colors.surfaceCard, borderColor: colors.textAccent },
              ]}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.ticksRow}>
        {Array.from({ length: 25 }, (_, hour) => (
          <View
            key={hour}
            style={[
              styles.tick,
              {
                height: hour % 6 === 0 ? 8 : 4,
                backgroundColor: hour % 6 === 0 ? colors.textBody : colors.borderCard,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.labelsRow}>
        <Text style={[styles.tickLabel, { color: colors.textBody }]}>12am</Text>
        <Text style={[styles.tickLabel, { color: colors.textBody }]}>6am</Text>
        <Text style={[styles.tickLabel, { color: colors.textBody }]}>12pm</Text>
        <Text style={[styles.tickLabel, { color: colors.textBody }]}>6pm</Text>
        <Text style={[styles.tickLabel, { color: colors.textBody }]}>midnight</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: TRACK_WIDTH + TRACK_LEFT * 2 },
  rangeLabel: {
    fontFamily: typography.personaStyleName.fontFamily,
    fontSize: typography.personaStyleName.fontSize,
    lineHeight: typography.personaStyleName.lineHeight,
    letterSpacing: typography.personaStyleName.letterSpacing,
    marginBottom: 8,
  },
  trackWrapper: { height: HANDLE_SIZE + 4, justifyContent: 'center' },
  track: {
    position: 'absolute',
    left: TRACK_LEFT,
    right: TRACK_LEFT,
    height: 4,
    borderRadius: 2,
  },
  range: {
    position: 'absolute',
    height: 4,
    borderRadius: 2,
  },
  handle: {
    position: 'absolute',
    top: 2,
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  handleDot: {
    width: HANDLE_SIZE,
    height: HANDLE_SIZE,
    borderRadius: HANDLE_SIZE / 2,
    borderWidth: 3,
  },
  ticksRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 8,
    marginTop: 8,
    paddingHorizontal: TRACK_LEFT - 1,
  },
  tick: { width: 1 },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: TRACK_LEFT - 1,
  },
  tickLabel: {
    fontFamily: typography.personaVoiceLabel.fontFamily,
    fontSize: typography.personaVoiceLabel.fontSize,
    lineHeight: typography.personaVoiceLabel.lineHeight,
    letterSpacing: typography.personaVoiceLabel.letterSpacing,
  },
});
