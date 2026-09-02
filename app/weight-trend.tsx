import { Redirect, useNavigation } from 'expo-router';
import { useEffect, useState } from 'react';

import { WeightTrend } from '../components/weight-trend';
import { useMatchedPersona } from '../hooks/useMatchedPersona';
import { useSessionStore } from '../store/sessionStore';

// expo-router's useNavigation() types its return against the generic
// EventMapCore, which doesn't know about 'transitionEnd' — that event
// belongs to the native-stack navigator underneath, which isn't a directly
// importable package in this project. It's still emitted at runtime; this
// narrows just the bit of the navigation object this screen actually uses.
type TransitionEndNavigation = {
  addListener: (event: 'transitionEnd', callback: () => void) => () => void;
};

export default function WeightTrendScreen() {
  const persona = useMatchedPersona();
  const weightTrend = useSessionStore((state) => state.weightTrend);
  const navigation = useNavigation() as unknown as TransitionEndNavigation;
  const [isScreenVisible, setIsScreenVisible] = useState(false);

  // The push transition (screenOptions.animation in app/_layout.tsx) is
  // still sliding this screen in when it first mounts — 'transitionEnd'
  // fires once that's done, which is what gates the callout's fade-in.
  useEffect(() => {
    return navigation.addListener('transitionEnd', () => {
      setIsScreenVisible(true);
    });
  }, [navigation]);

  if (!persona) {
    return <Redirect href="/" />;
  }

  return <WeightTrend trend={weightTrend} calloutVisible={isScreenVisible} />;
}
