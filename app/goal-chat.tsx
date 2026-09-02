import { Redirect } from 'expo-router';

import { GoalDeadlineChat } from '../components/goal-chat';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function GoalChatScreen() {
  const persona = useMatchedPersona();
  if (!persona) {
    return <Redirect href="/" />;
  }
  return <GoalDeadlineChat persona={persona} />;
}
