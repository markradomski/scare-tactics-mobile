import { Redirect } from 'expo-router';

import { GoalDeadlineContract } from '../components/contract';
import { useMatchedPersona } from '../hooks/useMatchedPersona';

export default function ContractScreen() {
  const persona = useMatchedPersona();
  if (!persona) {
    return <Redirect href="/" />;
  }
  return <GoalDeadlineContract persona={persona} />;
}
