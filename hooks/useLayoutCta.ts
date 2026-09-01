import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'expo-router';

import { cameraColors } from '../constants/tokens';
import { useGoalStore } from '../store/goalStore';
import { useSessionStore } from '../store/sessionStore';
import { useTheme } from './useTheme';

type LayoutCtaConfig =
  | { variant: 'none' }
  | {
      variant: 'primary';
      label: string;
      onPress: () => void;
      footerColor: string;
    }
  | {
      variant: 'contract';
      label: string;
      onPress: () => void;
      onSecondaryPress: () => void;
      footerColor: string;
    };

export function useLayoutCta() {
  const pathname = usePathname();
  const router = useRouter();
  const { colors } = useTheme();
  const setDeadline = useGoalStore((state) => state.setDeadline);
  const clearSession = useSessionStore((state) => state.clearSession);
  const [pickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    setPickerVisible(false);
  }, [pathname]);

  const goHome = () => {
    clearSession();
    router.replace('/');
  };

  const onConfirmDeadline = (date: Date) => {
    setDeadline(date);
    setPickerVisible(false);
    router.push('/deadline-window');
  };

  let cta: LayoutCtaConfig = { variant: 'none' };

  switch (pathname) {
    case '/match':
      cta = {
        variant: 'primary',
        label: 'Continue',
        onPress: () => router.push('/goal-chat'),
        footerColor: colors.surfaceCard,
      };
      break;
    case '/goal-chat':
      cta = {
        variant: 'primary',
        label: 'Continue',
        onPress: () => setPickerVisible(true),
        footerColor: colors.surfaceCard,
      };
      break;
    case '/deadline-window':
      cta = {
        variant: 'primary',
        label: 'Continue',
        onPress: () => router.push('/time-window'),
        footerColor: colors.surfaceCard,
      };
      break;
    case '/time-window':
      cta = {
        variant: 'primary',
        label: 'Set window',
        onPress: () => router.push('/contract'),
        footerColor: colors.surfaceCard,
      };
      break;
    case '/contract':
      cta = {
        variant: 'contract',
        label: 'Lock it in',
        onPress: () => router.push('/camera-check-in'),
        onSecondaryPress: goHome,
        footerColor: colors.surfaceCard,
      };
      break;
    case '/check-in-success':
      // Continues on to the weight-trend chart (see Figma) rather than
      // ending the flow here — "Done" is with the check-in, not the session.
      cta = {
        variant: 'primary',
        label: 'Done',
        onPress: () => router.push('/weight-trend'),
        footerColor: cameraColors.background,
      };
      break;
    default:
      break;
  }

  return { cta, pickerVisible, onConfirmDeadline };
}
