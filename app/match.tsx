import { Redirect } from 'expo-router';

import { SwipeMatch } from '../components/SwipeMatch';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function MatchScreen() {
  const persona = useMatchedPersona();
  if (!persona) {
    return <Redirect href="/" />;
  }
  return <SwipeMatch persona={persona} />;
}
