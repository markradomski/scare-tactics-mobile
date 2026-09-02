import { Pressable, StyleSheet, Text, View } from 'react-native';

import { typography } from '../../constants/tokens';
import { useTheme } from '../../hooks/useTheme';
import {
  extrapolateTrendLine,
  formatWeightRange,
  PLOT_RIGHT,
  pointsToPolyline,
  pointsToTrendLine,
  weightsToPoints,
} from '../../utils/weightTrend';
import { WeightPointCallout } from './WeightPointCallout';
import { MONTH_GRIDLINE_Y, WeightTrendChart } from './WeightTrendChart';

export type WeightTrendKind = 'up' | 'down' | 'flat';

// Chart placement, matching styles.chartWrapper below — needed here to turn
// a chart-local point into the screen-space top the callout bubble (a
// sibling of the chart, not a child of it) gets positioned at.
const CHART_TOP = 130;
// Screen x of the chart's own left edge (matches styles.chartWrapper.left)
// plus the callout bubble's own layout (width 240, tail centered at its
// local x:121 — see WeightPointCallout) — needed to horizontally align the
// bubble's tail with the highlighted point instead of a fixed left.
const CHART_LEFT = 40;
const BUBBLE_WIDTH = 240;
const TAIL_CENTER_X = 121;
const SCREEN_WIDTH = 402;

type WeightTrendVariant = {
  // 20 check-ins, Jul 1 – Sep 1.
  weightsKg: number[];
  // Day offsets (0 = Jul 1, 62 = Sep 1) matching weightsKg 1:1 — omit for
  // the default even ~3.3-day spacing.
  checkInDays?: number[];
  sparklineColorKey: 'actionNah' | 'actionYeah' | 'trendFlat';
  calloutHeight: number;
  calloutTitle: string;
  calloutTitleColorKey: 'actionNah' | 'actionYeah' | 'trendFlat';
  calloutBody: string;
};

const VARIANTS: Record<WeightTrendKind, WeightTrendVariant> = {
  up: {
    weightsKg: [
      68.4, 69.1, 68.8, 69.6, 70.2, 69.9, 70.8, 71.3, 71.0, 71.9,
      72.4, 72.1, 73.0, 73.6, 73.2, 74.1, 74.8, 74.5, 75.3, 76.1,
    ],
    sparklineColorKey: 'actionNah',
    // One line of body text at width 240: paddingVertical 10*2 + lineHeight
    // ~16.9, plus the tail's own 10px height (so the tail hangs below the
    // bubble's real bottom edge instead of overlapping it).
    calloutHeight: 47,
    calloutTitle: 'Up. Again.',
    calloutTitleColorKey: 'actionNah',
    calloutBody: 'Did the Shadow eat your weekend?',
  },
  down: {
    // Shape: a sharp early peak/drop (day 0-9), then a long, gently
    // declining noisy plateau through Aug-Sep — matching a real "lost it
    // fast, then plateaued" weight-loss curve. Last check-in (Sep 1) is
    // exactly 3kg above the one before it (75.0 -> 78.0) — a real cheat
    // day, not a synthesized trend point.
    weightsKg: [
      78.5, 79.8, 76.5, 77.2, 76.0, 76.8, 76.2, 75.8, 76.5, 75.6,
      76.0, 75.3, 75.9, 75.2, 75.7, 75.0, 75.5, 75.1, 75.0, 78.1,
    ],
    // Real weigh-ins don't land on a metronome — gaps of 1-8 days apart
    // instead of the default even ~3.3-day spacing, still spanning Jul 1
    // (0) to Sep 1 (62).
    checkInDays: [
      0, 1, 7, 9, 16, 17, 22, 25, 32, 33,
      37, 44, 46, 52, 53, 57, 58, 60, 61, 62,
    ],
    sparklineColorKey: 'actionYeah',
    // One line of body text at width 240: paddingVertical 10*2 + lineHeight
    // ~16.9, plus the tail's own 10px height (so the tail hangs below the
    // bubble's real bottom edge instead of overlapping it).
    calloutHeight: 47,
    calloutTitle: 'Down.',
    calloutTitleColorKey: 'actionYeah',
    calloutBody: 'Did the Shadow eat your weekend?',
  },
  flat: {
    weightsKg: [
      72.0, 72.6, 71.8, 73.1, 72.3, 71.5, 73.4, 72.0, 71.2, 73.7,
      72.5, 71.9, 73.0, 72.2, 71.4, 73.3, 72.6, 71.8, 72.9, 72.1,
    ],
    sparklineColorKey: 'trendFlat',
    // Four lines of body text at width 240: paddingVertical 10*2 + 4*lineHeight
    // ~16.9, plus the tail's own 10px height.
    calloutHeight: 98,
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
  // Gates the callout's fade-in — pass false until the screen itself has
  // finished any entrance transition, so the callout doesn't start fading
  // in while the screen is still sliding into view.
  calloutVisible?: boolean;
};

export function WeightTrend({
  trend,
  onPrevYear,
  onNextYear,
  year = 2026,
  calloutVisible = true,
}: WeightTrendProps) {
  const { colors } = useTheme();
  const variant = VARIANTS[trend];

  const points = weightsToPoints(variant.weightsKg, variant.checkInDays);
  const rawLinePath = pointsToPolyline(points);
  const trendLinePath = pointsToTrendLine(points);
  const subtitle = formatWeightRange(variant.weightsKg);
  // Only the down variant projects an "if this keeps up" dotted extension
  // of its trend line out to the edge of the graph.
  const extrapolatedTrendLinePath = trend === 'down' ? extrapolateTrendLine(points, PLOT_RIGHT) : undefined;

  // The most recent check-in (Sep 1) is the "you are here" point: guide
  // line down to the month-label gridline, highlight ring on the point,
  // callout bubble sitting directly above it with its tail touching the
  // point.
  const latestPoint = points[points.length - 1];
  const guideHeight = MONTH_GRIDLINE_Y + 10 - latestPoint.cy;
  const guidePosition = { left: latestPoint.cx, top: latestPoint.cy };
  const highlightPosition = { left: latestPoint.cx - 7, top: latestPoint.cy - 7 };
  // Touch the top edge of the highlight ring (radius 7), not its center —
  // landing on the center buries the tail inside the ring instead of
  // pointing at it.
  const calloutTop = CHART_TOP + latestPoint.cy - 7 - variant.calloutHeight;
  const calloutLeft = Math.max(
    0,
    Math.min(CHART_LEFT + latestPoint.cx - TAIL_CENTER_X, SCREEN_WIDTH - BUBBLE_WIDTH),
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.surfaceCard }]}>
      <Pressable onPress={onPrevYear} hitSlop={12} style={styles.prevChevron}>
        <Text style={[styles.chevron, { color: colors.textBody }]}>‹</Text>
      </Pressable>
      <Text style={[styles.year, { color: colors.textHeading }]}>{year}</Text>
      <Pressable onPress={onNextYear} hitSlop={12} style={styles.nextChevron}>
        <Text style={[styles.chevron, { color: colors.textBody }]}>›</Text>
      </Pressable>

      <Text style={[styles.subtitle, { color: colors.textBody }]}>{subtitle}</Text>

      <View style={styles.chartWrapper}>
        <WeightTrendChart
          points={points}
          rawLinePath={rawLinePath}
          trendLinePath={trendLinePath}
          sparklineColor={colors[variant.sparklineColorKey]}
          extrapolatedTrendLinePath={extrapolatedTrendLinePath}
          guideHeight={guideHeight}
          guidePosition={guidePosition}
          highlightPosition={highlightPosition}
        />
      </View>

      <View style={[styles.calloutWrapper, { top: calloutTop, left: calloutLeft }]}>
        <WeightPointCallout
          title={variant.calloutTitle}
          titleColor={colors[variant.calloutTitleColorKey]}
          body={variant.calloutBody}
          height={variant.calloutHeight}
          visible={calloutVisible}
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
  },
});
