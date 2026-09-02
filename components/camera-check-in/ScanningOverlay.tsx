import { useCallback, useEffect, useState } from 'react';
import type { LayoutChangeEvent } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cameraColors, typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';

const SCAN_TEXTS = ['Detecting display…', 'Reading value…', 'Got it.'] as const;
const TEXT_INTERVAL_MS = 4000;
const COMPLETE_DELAY_MS = 100;
const SCAN_LINE_DURATION_MS = 200;
const SCANNED_WEIGHT_KG = 78.1;

type ScanningOverlayProps = {
  onComplete: (weightKg: number) => void;
};

export function ScanningOverlay({ onComplete }: ScanningOverlayProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [textIndex, setTextIndex] = useState(0);
  const [overlayHeight, setOverlayHeight] = useState(0);
  const linePosition = useSharedValue(0);

  const handleLayout = useCallback((event: LayoutChangeEvent) => {
    setOverlayHeight(event.nativeEvent.layout.height);
  }, []);

  // Sweeps down over the measured height, then reverses once back to the top.
  useEffect(() => {
    if (overlayHeight === 0) {
      return;
    }
    linePosition.value = withTiming(
      overlayHeight,
      { duration: SCAN_LINE_DURATION_MS },
      (finished) => {
        if (finished) {
          linePosition.value = withTiming(0, { duration: SCAN_LINE_DURATION_MS });
        }
      },
    );
  }, [overlayHeight, linePosition]);

  // Cycles the status text every 5s, then hands off to the parent shortly
  // after the last one lands — a setTimeout array, no OCR, no external timer lib.
  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    SCAN_TEXTS.forEach((_, index) => {
      if (index === 0) {
        return;
      }
      timeouts.push(setTimeout(() => setTextIndex(index), index * TEXT_INTERVAL_MS));
    });

    timeouts.push(
      setTimeout(
        () => onComplete(SCANNED_WEIGHT_KG),
        SCAN_TEXTS.length * TEXT_INTERVAL_MS + COMPLETE_DELAY_MS,
      ),
    );

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  const lineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: linePosition.value }],
  }));

  return (
    <View
      onLayout={handleLayout}
      style={[
        styles.container,
        { top: insets.top, backgroundColor: cameraColors.scanningOverlay },
      ]}
    >
      <Animated.View style={[styles.scanLine, { backgroundColor: colors.actionYeah }, lineStyle]} />

      <Text style={[styles.statusText, { color: cameraColors.white }]}>
        {SCAN_TEXTS[textIndex]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanLine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
  statusText: {
    fontFamily: typography.personaSectionTitle.fontFamily,
    fontSize: typography.personaSectionTitle.fontSize,
    letterSpacing: typography.personaSectionTitle.letterSpacing,
  },
});
