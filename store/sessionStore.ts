import { create } from 'zustand';

type SessionState = {
  matchedPersonaId: string | null;
  weighInKg: number;
  setMatchedPersonaId: (matchedPersonaId: string) => void;
  setWeighInKg: (weighInKg: number) => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  matchedPersonaId: null,
  weighInKg: 0,
  setMatchedPersonaId: (matchedPersonaId) => set({ matchedPersonaId }),
  setWeighInKg: (weighInKg) => set({ weighInKg }),
  clearSession: () => set({ matchedPersonaId: null, weighInKg: 0 }),
}));
