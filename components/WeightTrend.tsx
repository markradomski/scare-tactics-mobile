import { Pressable, StyleSheet, Text, View } from 'react-native';

import { typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { WeightPointCallout } from './WeightPointCallout';
import { WeightTrendChart } from './WeightTrendChart';

export type WeightTrendKind = 'up' | 'down' | 'flat';

type WeightTrendVariant = {
  subtitle: string;
  chart: {
    faintPath: string;
    faintNativeSize: { width: number; height: number };
    faintPosition: { left: number; top: number };
    points: { cx: number; cy: number }[];
    sparklinePath: string;
    sparklineNativeSize: { width: number; height: number };
    sparklinePosition: { left: number; top: number };
    sparklineColorKey: 'actionNah' | 'actionYeah' | 'trendFlat';
    guideHeight: number;
    guidePosition: { left: number; top: number };
    highlightPosition: { left: number; top: number };
  };
  calloutTop: number;
  calloutHeight: number;
  calloutTitle: string;
  calloutTitleColorKey: 'actionNah' | 'actionYeah' | 'trendFlat';
  calloutBody: string;
};

// Every path/point below is the exact vector data exported from the Figma
// "weight-trend" component's 3 variants (trend=up/down/flat) — not
// synthesized chart data, since each variant renders a real bezier line.
const VARIANTS: Record<WeightTrendKind, WeightTrendVariant> = {
  up: {
    subtitle: '67.3–76.3 kg',
    chart: {
      faintPath:
        'M0.750204 149.55L52.0802 132.19L103.42 142.11L154.75 99.95L206.08 82.59L257.42 50.35L308.75 0.750001',
      faintNativeSize: { width: 309.5, height: 150.3 },
      faintPosition: { left: 12, top: 74 },
      points: [
        { cx: 12, cy: 222.8 },
        { cx: 63.33, cy: 205.44 },
        { cx: 114.67, cy: 215.36 },
        { cx: 217.33, cy: 155.84 },
        { cx: 268.67, cy: 123.6 },
        { cx: 320, cy: 74 },
      ],
      sparklinePath:
        'M2 117.321C10.56 117.391 36.22 120.421 53.33 117.731C70.44 115.051 87.56 106.711 104.67 101.201C121.78 95.6905 138.89 92.5205 156 84.6705C173.11 76.8105 190.22 64.6905 207.33 54.0805C224.44 43.4705 241.56 29.6905 258.67 21.0105C275.78 12.3305 301.44 5.17054 310 2.00054',
      sparklineNativeSize: { width: 312.001, height: 120.842 },
      sparklinePosition: { left: 12, top: 98.8 },
      sparklineColorKey: 'actionNah',
      guideHeight: 86.8,
      guidePosition: { left: 166, top: 173.2 },
      highlightPosition: { left: 159, top: 166.2 },
    },
    calloutTop: 175.2,
    calloutHeight: 114,
    calloutTitle: 'Up. Again.',
    calloutTitleColorKey: 'actionNah',
    calloutBody:
      'Do you have a personal vendetta against that scale, or is this just laziness with extra steps?',
  },
  down: {
    subtitle: '67.7–77.3 kg',
    chart: {
      faintPath:
        'M0.750124 0.750124L52.0801 30.5101L103.42 18.1101L154.75 67.7101L206.08 85.0701L257.42 124.75L308.75 159.47',
      faintNativeSize: { width: 309.5, height: 160.22 },
      faintPosition: { left: 12, top: 56.64 },
      points: [
        { cx: 12, cy: 56.64 },
        { cx: 63.33, cy: 86.4 },
        { cx: 114.67, cy: 74 },
        { cx: 217.33, cy: 140.96 },
        { cx: 268.67, cy: 180.64 },
        { cx: 320, cy: 215.36 },
      ],
      sparklinePath:
        'M2.00001 3.09257C10.56 3.23257 36.22 0.0625656 53.33 3.92257C70.44 7.77257 87.56 19.4926 104.67 26.2426C121.78 32.9926 138.89 35.4726 156 44.4226C173.11 53.3826 190.22 68.9526 207.33 79.9726C224.44 90.9926 241.56 102.293 258.67 110.563C275.78 118.823 301.44 126.403 310 129.573',
      sparklineNativeSize: { width: 312.001, height: 131.573 },
      sparklinePosition: { left: 12, top: 71.52 },
      sparklineColorKey: 'actionYeah',
      guideHeight: 136.4,
      guidePosition: { left: 166, top: 123.6 },
      highlightPosition: { left: 159, top: 116.6 },
    },
    calloutTop: 125.6,
    calloutHeight: 114,
    calloutTitle: 'Down.',
    calloutTitleColorKey: 'actionYeah',
    calloutBody: "Actual progress. Don't let it go to your head - I'm still not proud of you.",
  },
  flat: {
    subtitle: '71.0–73.7 kg',
    chart: {
      faintPath:
        'M0.750124 30.51L52.0801 0.750008L103.42 45.39L154.75 8.19001L206.08 35.47L257.42 15.63L308.75 28.03',
      faintNativeSize: { width: 309.5, height: 46.14 },
      faintPosition: { left: 12, top: 116.16 },
      points: [
        { cx: 12, cy: 145.92 },
        { cx: 63.33, cy: 116.16 },
        { cx: 114.67, cy: 160.8 },
        { cx: 217.33, cy: 150.88 },
        { cx: 268.67, cy: 131.04 },
        { cx: 320, cy: 143.44 },
      ],
      sparklinePath:
        'M2.00037 2.00037C10.5604 3.65037 36.2204 11.5104 53.3304 11.9204C70.4404 12.3304 87.5604 3.79037 104.67 4.48037C121.78 5.17037 138.89 15.7804 156 16.0504C173.11 16.3304 190.22 6.68037 207.33 6.13037C224.44 5.58037 241.56 12.4004 258.67 12.7504C275.78 13.0904 301.44 8.96037 310 8.20037',
      sparklineNativeSize: { width: 312, height: 18.0563 },
      sparklinePosition: { left: 12, top: 131.04 },
      sparklineColorKey: 'trendFlat',
      guideHeight: 136.4,
      guidePosition: { left: 166, top: 123.6 },
      highlightPosition: { left: 159, top: 116.6 },
    },
    calloutTop: 108.6,
    calloutHeight: 131,
    calloutTitle: 'Flat?',
    calloutTitleColorKey: 'trendFlat',
    calloutBody:
      'Absolutely nothing moved. What exactly have you been doing - orbiting the gym rather than entering it?',
  },
};

type WeightTrendProps = {
  trend: WeightTrendKind;
  onPrevYear?: () => void;
  onNextYear?: () => void;
  year?: number;
};

export function WeightTrend({ trend, onPrevYear, onNextYear, year = 2026 }: WeightTrendProps) {
  const { colors } = useTheme();
  const variant = VARIANTS[trend];

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceCard }]}>
      <Pressable onPress={onPrevYear} hitSlop={12} style={styles.prevChevron}>
        <Text style={[styles.chevron, { color: colors.textBody }]}>‹</Text>
      </Pressable>
      <Text style={[styles.year, { color: colors.textHeading }]}>{year}</Text>
      <Pressable onPress={onNextYear} hitSlop={12} style={styles.nextChevron}>
        <Text style={[styles.chevron, { color: colors.textBody }]}>›</Text>
      </Pressable>

      <Text style={[styles.subtitle, { color: colors.textBody }]}>{variant.subtitle}</Text>

      <View style={styles.chartWrapper}>
        <WeightTrendChart
          faintPath={variant.chart.faintPath}
          faintNativeSize={variant.chart.faintNativeSize}
          faintPosition={variant.chart.faintPosition}
          points={variant.chart.points}
          sparklinePath={variant.chart.sparklinePath}
          sparklineNativeSize={variant.chart.sparklineNativeSize}
          sparklinePosition={variant.chart.sparklinePosition}
          sparklineColor={colors[variant.chart.sparklineColorKey]}
          guideHeight={variant.chart.guideHeight}
          guidePosition={variant.chart.guidePosition}
          highlightPosition={variant.chart.highlightPosition}
        />
      </View>

      <View style={[styles.calloutWrapper, { top: variant.calloutTop }]}>
        <WeightPointCallout
          title={variant.calloutTitle}
          titleColor={colors[variant.calloutTitleColorKey]}
          body={variant.calloutBody}
          height={variant.calloutHeight}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  prevChevron: {
    position: 'absolute',
    left: 10,
    top: 40,
  },
  nextChevron: {
    position: 'absolute',
    left: 385,
    top: 40,
  },
  chevron: {
    fontFamily: typography.pickerChevron.fontFamily,
    fontSize: typography.pickerChevron.fontSize,
  },
  year: {
    position: 'absolute',
    left: 10,
    top: 34,
    width: 382,
    textAlign: 'center',
    fontFamily: typography.personaTitle.fontFamily,
    fontSize: typography.personaTitle.fontSize,
    lineHeight: typography.personaTitle.lineHeight,
    letterSpacing: typography.personaTitle.letterSpacing,
  },
  subtitle: {
    position: 'absolute',
    left: 10,
    top: 74,
    width: 382,
    textAlign: 'center',
    fontFamily: typography.chartSubtitle.fontFamily,
    fontSize: typography.chartSubtitle.fontSize,
  },
  chartWrapper: {
    position: 'absolute',
    left: 10,
    top: 130,
  },
  calloutWrapper: {
    position: 'absolute',
    left: 56,
  },
});
