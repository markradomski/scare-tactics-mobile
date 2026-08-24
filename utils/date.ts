const MONTH_ABBR = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export function formatShortDate(date: Date): string {
  return `${MONTH_ABBR[date.getMonth()]} ${date.getDate()}`;
}
