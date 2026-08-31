import { create } from 'zustand';

import type { WeightTrendKind } from '../components/WeightTrend';

type SessionState = {
  matchedPersonaId: string | null;
  weighInKg: number;
  weightTrend: WeightTrendKind;
  setMatchedPersonaId: (matchedPersonaId: string) => void;
  setWeighInKg: (weighInKg: number) => void;
  setWeightTrend: (weightTrend: WeightTrendKind) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  matchedPersonaId: null,
  weighInKg: 0,
  weightTrend: 'flat',
  setMatchedPersonaId: (matchedPersonaId) => set({ matchedPersonaId }),
  setWeighInKg: (weighInKg) => set({ weighInKg }),
  setWeightTrend: (weightTrend) => set({ weightTrend }),
  clearSession: () => set({ matchedPersonaId: null, weighInKg: 0, weightTrend: 'flat' }),
}));
