import { useCallback } from 'react';
import { Redirect, useFocusEffect, useRouter } from 'expo-router';
import { setStatusBarHidden } from 'expo-status-bar';

import { CameraCheckIn } from '../components/CameraCheckIn';
import { useMatchedPersona } from '../hooks/useMatchedPersona';
import { useSessionStore } from '../store/sessionStore';

export default function CameraCheckInScreen() {
  const persona = useMatchedPersona();
  const router = useRouter();
  const setWeighInKg = useSessionStore((state) => state.setWeighInKg);

  // expo-router's Stack keeps previous screens mounted rather than
  // unmounting them, so a <StatusBar hidden /> component here never cleans
  // up on navigation. Focus/blur is the reliable signal instead.
  useFocusEffect(
    useCallback(() => {
      setStatusBarHidden(true, 'fade');
      return () => setStatusBarHidden(false, 'fade');
    }, []),
  );

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
