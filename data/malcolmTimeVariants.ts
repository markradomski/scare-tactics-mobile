import type { DailyTimeWindow } from '../store/goalStore';

// Figma only wrote 4 example goal-notification copy variants, and only for
// Malcolm Tucker — every other persona uses persona.commitmentMessage
// regardless of the picked window. Buckets are inferred from those 4
// named states (5am-6am, 9am-12pm, 12pm-6pm, 6am-midnight): duration first
// (short vs. very wide), then time-of-day for the remaining middle range.
const NARROW_WINDOW_MESSAGE =
  "One hour? You've basically dared me to fit a full psychological dismantling into a lunch break, you magnificent wee psychopath. Challenge accepted.";

const WIDE_WINDOW_MESSAGE =
  "Right, so I've got a decent window to catch you scratching your arse when you should be grafting. Don't worry—I'll find you at the exact moment you think you've gotten away with it, you slippery wee shite.";

const MORNING_WINDOW_MESSAGE =
  "You've given me the run of the place like some feckless landlord handing keys to a sociopath. Either you're genuinely committed or you've lost the will to live. Either way—I'm going to make something of you whether you like it or not, you absolute weapon.";

const AFTERNOON_WINDOW_MESSAGE =
  "Six hours plus? That's no' confidence, that's a cry for help dressed up as bravery. You want me crawling around inside your day like a fucking tapeworm? Fine. Your funeral. Your resurrection.";

export function getMalcolmTimeVariantMessage({ startHour, endHour }: DailyTimeWindow): string {
  const duration = endHour - startHour;

  if (duration <= 2) return NARROW_WINDOW_MESSAGE;
  if (duration >= 12) return WIDE_WINDOW_MESSAGE;
  return startHour < 12 ? MORNING_WINDOW_MESSAGE : AFTERNOON_WINDOW_MESSAGE;
}
