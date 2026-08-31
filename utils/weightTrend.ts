// Geometry helpers for the WeightTrend chart. The chart's x-axis spans
// Jul 1 – Jan 1 (6 months: Jul–Dec), but all 20 check-ins fall in the first
// Jul 1 – Sep 1 stretch of it — see WeightTrend.tsx. This module turns a
// plain kg-per-check-in array into the SVG points/paths WeightTrendChart
// renders, so the chart data itself can just be numbers.

export type WeightTrendPoint = { cx: number; cy: number };

// Plot area, matching WeightTrendChart's gridlines/baseline layout.
export const PLOT_LEFT = 12;
export const PLOT_RIGHT = 320;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
export const BASELINE_Y = 260;
const TOP_Y = 12;
const TOP_KG = 80;
const BASELINE_KG = 65; // matches the unlabeled bottom of the 80/76/72 gridlines
const PX_PER_KG = (BASELINE_Y - TOP_Y) / (TOP_KG - BASELINE_KG);

// Jul 1 – Jan 1: Jul(31) + Aug(31) + Sep(30) + Oct(31) + Nov(30) + Dec(31).
const TOTAL_AXIS_DAYS = 184;
// All 20 check-ins fall within Jul 1 – Sep 1.
const DATA_SPAN_DAYS = 62;

export const MONTHS = [
  { label: 'Jul', dayOffset: 0 },
  { label: 'Aug', dayOffset: 31 },
  { label: 'Sep', dayOffset: 62 },
  { label: 'Oct', dayOffset: 92 },
  { label: 'Nov', dayOffset: 123 },
  { label: 'Dec', dayOffset: 153 },
  { label: 'Jan', dayOffset: 183 },
] as const;

function dayToX(dayOffset: number): number {
  return PLOT_LEFT + (dayOffset / TOTAL_AXIS_DAYS) * PLOT_WIDTH;
}

export function monthTickX(): number[] {
  return MONTHS.map((month) => dayToX(month.dayOffset));
}

function weightToY(weightKg: number): number {
  return TOP_Y + (TOP_KG - weightKg) * PX_PER_KG;
}

// Default check-in spacing: evenly spread across the Jul 1 – Sep 1 window.
function evenlySpacedDays(count: number): number[] {
  return Array.from({ length: count }, (_, index) => (index * DATA_SPAN_DAYS) / (count - 1));
}

// `days` lets a variant space its check-ins irregularly (real weigh-ins
// don't land on a metronome) — pass explicit day offsets (0 = Jul 1, 62 =
// Sep 1) matching weightsKg 1:1. Omit it for the default even spacing.
export function weightsToPoints(weightsKg: number[], days: number[] = evenlySpacedDays(weightsKg.length)): WeightTrendPoint[] {
  return weightsKg.map((kg, index) => ({
    cx: dayToX(days[index]),
    cy: weightToY(kg),
  }));
}

export function pointsToPolyline(points: WeightTrendPoint[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.cx} ${point.cy}`).join(' ');
}

type LinearFit = { slope: number; intercept: number };

// Least-squares fit of y (cy) over x (cx) across the raw points — shared by
// the trend line and its extrapolation below.
function fitTrendLine(points: WeightTrendPoint[]): LinearFit | null {
  if (points.length < 2) {
    return null;
  }
  const meanX = points.reduce((sum, point) => sum + point.cx, 0) / points.length;
  const meanY = points.reduce((sum, point) => sum + point.cy, 0) / points.length;
  const numerator = points.reduce((sum, point) => sum + (point.cx - meanX) * (point.cy - meanY), 0);
  const denominator = points.reduce((sum, point) => sum + (point.cx - meanX) ** 2, 0);
  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = meanY - slope * meanX;
  return { slope, intercept };
}

// The coloured "trend" line is a straight least-squares fit through the raw
// points (not a curve through each one) — it shows direction, not the
// day-to-day wobble the grey line already shows.
export function pointsToTrendLine(points: WeightTrendPoint[]): string {
  if (points.length === 0) {
    return '';
  }
  const fit = fitTrendLine(points);
  if (!fit) {
    return `M ${points[0].cx} ${points[0].cy} L ${points[0].cx} ${points[0].cy}`;
  }

  const firstX = points[0].cx;
  const lastX = points[points.length - 1].cx;
  return `M ${firstX} ${fit.slope * firstX + fit.intercept} L ${lastX} ${fit.slope * lastX + fit.intercept}`;
}

// Continues the same fitted trend line past the last data point out to
// `toX` — the dotted "if this keeps up" extension some variants show.
export function extrapolateTrendLine(points: WeightTrendPoint[], toX: number): string {
  const fit = fitTrendLine(points);
  if (!fit || points.length === 0) {
    return '';
  }
  const lastX = points[points.length - 1].cx;
  return `M ${lastX} ${fit.slope * lastX + fit.intercept} L ${toX} ${fit.slope * toX + fit.intercept}`;
}

export function formatWeightRange(weightsKg: number[]): string {
  const min = Math.min(...weightsKg);
  const max = Math.max(...weightsKg);
  return `${min.toFixed(1)}–${max.toFixed(1)} kg`;
}
