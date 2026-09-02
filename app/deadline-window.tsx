import { Redirect } from 'expo-router';

import { GoalDeadlineNotificationWindow } from '../components/notifications';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function DeadlineWindowScreen() {
  const persona = useMatchedPersona();
  if (!persona) {
    return <Redirect href="/" />;
  }
  return <GoalDeadlineNotificationWindow persona={persona} />;
}
