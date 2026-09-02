import { Redirect } from 'expo-router';

import { CheckInSuccess } from '../components/check-in-success';
import { useMatchedPersona } from '../hooks/useMatchedPersona';
import { useSessionStore } from '../store/sessionStore';

export default function CheckInSuccessScreen() {
  const persona = useMatchedPersona();
  const weighInKg = useSessionStore((state) => state.weighInKg);

  if (!persona) {
    return <Redirect href="/" />;
  }

  return <CheckInSuccess persona={persona} weightKg={weighInKg} />;
}
