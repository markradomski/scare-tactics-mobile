import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { typography } from '../constants/tokens';
import { useTheme } from '../hooks/useTheme';

const CHART_WIDTH = 354;
const GRIDLINE_ROWS = [
  { label: '80', top: 12, labelTop: 3.5 },
  { label: '76', top: 78.13, labelTop: 69.63 },
  { label: '72', top: 144.27, labelTop: 135.77 },
];
const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
const MONTH_TICK_X = [11.5, 62.83, 114.17, 165.5, 216.83, 268.17, 319.5];

type WeightPoint = { cx: number; cy: number };

export type WeightTrendChartProps = {
  faintPath: string;
  faintNativeSize: { width: number; height: number };
  faintPosition: { left: number; top: number };
  points: WeightPoint[];
  sparklinePath: string;
  sparklineNativeSize: { width: number; height: number };
  sparklinePosition: { left: number; top: number };
  sparklineColor: string;
  guideHeight: number;
  guidePosition: { left: number; top: number };
  highlightPosition: { left: number; top: number };
};

export function WeightTrendChart({
  faintPath,
  faintNativeSize,
  faintPosition,
  points,
  sparklinePath,
  sparklineNativeSize,
  sparklinePosition,
  sparklineColor,
  guideHeight,
  guidePosition,
  highlightPosition,
}: WeightTrendChartProps) {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      {GRIDLINE_ROWS.map((row) => (
        <View key={row.label}>
          <View
            style={[
              styles.gridline,
              { top: row.top, backgroundColor: colors.borderCard },
            ]}
          />
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

      <Svg
        style={[styles.absolute, faintPosition]}
        width={faintNativeSize.width}
        height={faintNativeSize.height}
        viewBox={`0 0 ${faintNativeSize.width} ${faintNativeSize.height}`}
        fill="none"
      >
        <Path d={faintPath} stroke={colors.textAccent} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>

      <Svg style={[styles.absolute, { left: 0, top: 0 }]} width={CHART_WIDTH} height={260} fill="none">
        {points.map((point, index) => (
          <Circle key={index} cx={point.cx} cy={point.cy} r={2} fill={colors.textAccent} />
        ))}
      </Svg>

      <Svg
        style={[styles.absolute, sparklinePosition]}
        width={sparklineNativeSize.width}
        height={sparklineNativeSize.height}
        viewBox={`0 0 ${sparklineNativeSize.width} ${sparklineNativeSize.height}`}
        fill="none"
      >
        <Path d={sparklinePath} stroke={sparklineColor} strokeWidth={4} strokeLinecap="round" />
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
    height: 292,
  },
  absolute: {
    position: 'absolute',
  },
  gridline: {
    position: 'absolute',
    left: 12,
    width: 308,
    height: 0.5,
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
    top: 262,
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
    top: 272,
    width: 40,
    marginLeft: -20,
    textAlign: 'center',
  },
});
