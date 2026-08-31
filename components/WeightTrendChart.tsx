import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';
import { BASELINE_Y, MONTHS, monthTickX, type WeightTrendPoint } from '../utils/weightTrend';

const CHART_WIDTH = 354;
const GRIDLINE_ROWS = [
  { label: '80', top: 12, labelTop: 3.5, showLine: true },
  { label: '76', top: 78.13, labelTop: 69.63, showLine: true },
  { label: '72', top: 144.27, labelTop: 135.77, showLine: true },
  { label: '68', top: 211.27, labelTop: 201.77, showLine: true },
  // No line for this row — it sits too close to the separator line above
  // the month row (styles.monthTick.top) to have its own; the label alone
  // still reads fine against that line.
  { label: '64', top: 278.27, labelTop: 268.77, showLine: false },
];
// The axis spans Jul–Dec; the 20 check-ins only fill the Jul–Sep third of it
// (see WeightTrend.tsx), leaving the rest of the year visibly blank.
const MONTH_LABELS = MONTHS.map((month) => month.label);
const MONTH_TICK_X = monthTickX();
// The month-tick row sits below the lowest gridline row's own label, with
// a bit of clearance, so an added row (e.g. '64') never collides with it.
const LAST_GRIDLINE_LABEL_TOP = GRIDLINE_ROWS[GRIDLINE_ROWS.length - 1].labelTop;
const MONTH_TICK_TOP = LAST_GRIDLINE_LABEL_TOP + 26;
const MONTH_LABEL_TOP = MONTH_TICK_TOP + 10;
const CHART_HEIGHT = MONTH_LABEL_TOP + 25;
// Extra faint full-width reference lines: one behind each gridline row that
// has its own line, plus one sitting just above the month-label row.
const FAINT_LINE_TOPS = [
  ...GRIDLINE_ROWS.filter((row) => row.showLine).map((row) => row.top),
  MONTH_TICK_TOP - 6,
];

export type WeightTrendChartProps = {
  points: WeightTrendPoint[];
  rawLinePath: string;
  trendLinePath: string;
  sparklineColor: string;
  // Dotted continuation of the trend line past the last data point, out to
  // the graph's edge — an "if this keeps up" extrapolation. Optional: only
  // some variants show it.
  extrapolatedTrendLinePath?: string;
  guideHeight: number;
  guidePosition: { left: number; top: number };
  highlightPosition: { left: number; top: number };
};

export function WeightTrendChart({
  points,
  rawLinePath,
  trendLinePath,
  sparklineColor,
  extrapolatedTrendLinePath,
  guideHeight,
  guidePosition,
  highlightPosition,
}: WeightTrendChartProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {FAINT_LINE_TOPS.map((top) => (
        <View
          key={top}
          style={[styles.faintLine, { top, backgroundColor: colors.borderCard }]}
        />
      ))}

      {GRIDLINE_ROWS.map((row) => (
        <View key={row.label}>
          {row.showLine ? (
            <View
              style={[
                styles.gridline,
                { top: row.top, backgroundColor: colors.borderCard },
              ]}
            />
          ) : null}
          <Text
            style={[styles.axisLabel, styles.gridLabel, { top: row.labelTop, color: colors.textBody }]}
          >
            {row.label}
          </Text>
        </View>
      ))}

      <View style={[styles.baseline, { backgroundColor: colors.borderCard }]} />

      {MONTH_LABELS.map((month, index) => (
        <View key={month}>
          <View
            style={[
              styles.monthTick,
              { left: MONTH_TICK_X[index], backgroundColor: colors.borderCard },
            ]}
          />
          <Text style={[styles.axisLabel, styles.monthLabel, { left: MONTH_TICK_X[index] + 0.5, color: colors.textBody }]}>
            {month}
          </Text>
        </View>
      ))}

      <Svg style={styles.absolute} width={CHART_WIDTH} height={BASELINE_Y} viewBox={`0 0 ${CHART_WIDTH} ${BASELINE_Y}`} fill="none">
        <Path d={rawLinePath} stroke={colors.textBody} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        {points.map((point, index) => (
          <Circle key={index} cx={point.cx} cy={point.cy} r={2} fill={colors.textBody} />
        ))}
        <Path d={trendLinePath} stroke={sparklineColor} strokeWidth={4} strokeLinecap="round" />
        {extrapolatedTrendLinePath ? (
          <Path
            d={extrapolatedTrendLinePath}
            stroke={sparklineColor}
            strokeWidth={4}
            strokeLinecap="round"
            strokeDasharray="1 8"
            opacity={0.35}
          />
        ) : null}
      </Svg>

      <Svg style={[styles.absolute, guidePosition]} width={2} height={guideHeight}>
        <Line x1={1} y1={0} x2={1} y2={guideHeight} stroke={colors.textBody} strokeWidth={1.5} strokeDasharray="4 4" />
      </Svg>

      <Svg style={[styles.absolute, highlightPosition]} width={14} height={14} viewBox="0 0 14 14">
        <Circle cx={7} cy={7} r={5.5} fill={colors.surfaceCard} stroke={colors.textAccent} strokeWidth={3} />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CHART_WIDTH,
    height: CHART_HEIGHT,
  },
  absolute: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  gridline: {
    position: 'absolute',
    left: 12,
    width: 308,
    height: 0.5,
  },
  faintLine: {
    position: 'absolute',
    left: 0,
    width: CHART_WIDTH,
    height: 0.5,
    opacity: 0.35,
  },
  baseline: {
    position: 'absolute',
    left: 12,
    top: 260,
    width: 308,
    height: 1,
  },
  monthTick: {
    position: 'absolute',
    top: MONTH_TICK_TOP,
    width: 1,
    height: 6,
  },
  axisLabel: {
    position: 'absolute',
    fontFamily: typography.chartAxisLabel.fontFamily,
    fontSize: typography.chartAxisLabel.fontSize,
  },
  gridLabel: {
    right: 0,
    width: 30,
    textAlign: 'right',
  },
  monthLabel: {
    top: MONTH_LABEL_TOP,
    width: 40,
    marginLeft: -20,
    textAlign: 'center',
  },
});
