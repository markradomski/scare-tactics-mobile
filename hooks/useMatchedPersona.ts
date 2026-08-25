import { personas } from '../data/personas';
import { useSessionStore } from '../store/sessionStore';
import type { Persona } from '../types/persona';

export function useMatchedPersona(): Persona | null {
  const matchedPersonaId = useSessionStore((state) => state.matchedPersonaId);
  return personas.find((persona) => persona.id === matchedPersonaId) ?? null;
}
