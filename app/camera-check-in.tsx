import { Redirect, useRouter } from 'expo-router';

import { CameraCheckIn } from '../components/CameraCheckIn';
import { useMatchedPersona } from '../hooks/useMatchedPersona';
import { useSessionStore } from '../store/sessionStore';

export default function CameraCheckInScreen() {
  const persona = useMatchedPersona();
  const router = useRouter();
  const setWeighInKg = useSessionStore((state) => state.setWeighInKg);

  if (!persona) {
    return <Redirect href="/" />;
  }

  return (
    <CameraCheckIn
      persona={persona}
      onCapture={(weightKg) => {
        setWeighInKg(weightKg);
        router.push('/check-in-success');
      }}
      onTimeout={() => router.push('/check-in-fail')}
    />
  );
}
