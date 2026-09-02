import { Redirect } from 'expo-router';

import { GoalNotificationWindow } from '../components/notifications';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function TimeWindowScreen() {
  const persona = useMatchedPersona();
  if (!persona) {
    return <Redirect href="/" />;
  }
  return <GoalNotificationWindow persona={persona} />;
}
