import { Redirect, useRouter } from 'expo-router';

import { CheckInFail } from '../components/CheckInFail';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function CheckInFailScreen() {
  const persona = useMatchedPersona();
  const router = useRouter();

  if (!persona) {
    return <Redirect href="/" />;
  }

  return <CheckInFail persona={persona} onTryAgain={() => router.replace('/camera-check-in')} />;
}
