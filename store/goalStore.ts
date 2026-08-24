import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type DailyTimeWindow = {
  startHour: number;
  endHour: number;
};

type GoalState = {
  goalText: string;
  deadline: string | null;
  dailyTimeWindow: DailyTimeWindow;
};

type GoalActions = {
  setGoalText: (goalText: string) => void;
  setDeadline: (deadline: Date) => void;
  setDailyTimeWindow: (dailyTimeWindow: DailyTimeWindow) => void;
};

const DEFAULT_TIME_WINDOW: DailyTimeWindow = { startHour: 9, endHour: 12 };

export const useGoalStore = create<GoalState & GoalActions>()(
  persist(
    (set) => ({
      goalText: '',
      deadline: null,
      dailyTimeWindow: DEFAULT_TIME_WINDOW,
      setGoalText: (goalText) => set({ goalText }),
      setDeadline: (deadline) => set({ deadline: deadline.toISOString() }),
      setDailyTimeWindow: (dailyTimeWindow) => set({ dailyTimeWindow }),
    }),
    {
      name: 'goal-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
