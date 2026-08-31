import type { DailyTimeWindow } from '../store/goalStore';

// Same 4-bucket pattern as data/malcolmTimeVariants.ts, in Phil Stutz's own
// voice — blunt compassion, action over motivation, leaning on the
// vocabulary his other copy in this app already established (the Shadow,
// "showing up," treating the window like gravity).
const NARROW_WINDOW_MESSAGE =
  "An hour's plenty. The Shadow doesn't need a big window to talk you out of it — just a five-minute gap. Show up right when it opens and you won't give it the chance.";

const WIDE_WINDOW_MESSAGE =
  "Give yourself the whole day and you've just built an excuse factory. The wider the window, the easier it is to push it to 'later' — and later never opens the door. Pick a window you can't hide in.";

const MORNING_WINDOW_MESSAGE =
  "Morning's the smart move. You show up before your excuses have had coffee. Treat this slot like gravity — not something you decide on, just something that happens now.";

const AFTERNOON_WINDOW_MESSAGE =
  "Afternoon means half the day to talk yourself out of it before you even get there. Doesn't matter. I don't need your motivation, I need your feet at the door when it opens. Show up tired. Show up annoyed. Just show up.";

export function getPhilStutzTimeVariantMessage({ startHour, endHour }: DailyTimeWindow): string {
  const duration = endHour - startHour;

  if (duration <= 2) return NARROW_WINDOW_MESSAGE;
  if (duration >= 12) return WIDE_WINDOW_MESSAGE;
  return startHour < 12 ? MORNING_WINDOW_MESSAGE : AFTERNOON_WINDOW_MESSAGE;
}
