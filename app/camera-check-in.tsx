import { Redirect, useRouter } from 'expo-router';

import { CameraCheckIn } from '../components/CameraCheckIn';
import type { WeightTrendKind } from '../components/WeightTrend';
import { useMatchedPersona } from '../hooks/useMatchedPersona';
import { useSessionStore } from '../store/sessionStore';

const TREND_KINDS: WeightTrendKind[] = ['up', 'down', 'flat'];

export default function CameraCheckInScreen() {
  const persona = useMatchedPersona();
  const router = useRouter();
  const setWeighInKg = useSessionStore((state) => state.setWeighInKg);
  const setWeightTrend = useSessionStore((state) => state.setWeightTrend);

  // Status bar visibility for this route is handled centrally in
  // app/_layout.tsx (STATUS_BAR_HIDDEN_ROUTES) — see the comment there for why.

  if (!persona) {
    return <Redirect href="/" />;
  }

  return (
    <CameraCheckIn
      persona={persona}
      onCapture={(weightKg) => {
        setWeighInKg(weightKg);
        // No real weight history to compute a trend from yet — pick a demo
        // variant, same "no OCR, randomized demo value" pattern as weighInKg.
       // setWeightTrend(TREND_KINDS[Math.floor(Math.random() * TREND_KINDS.length)]);
        setWeightTrend('down');
        router.push('/weight-trend');
      }}
      onTimeout={() => router.push('/check-in-fail')}
    />
  );
}
