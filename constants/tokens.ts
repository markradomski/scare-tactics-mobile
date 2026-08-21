const darkColors = {
  background: '#16171d',
  surfaceCard: '#1f2028',
  surfaceVoice: '#404353',
  surfaceMessage: '#1e2740',
  borderCard: '#2e303a',
  borderDefault: '#2e303a',
  borderAvatarRing: '#3f4350',
  borderVoiceHover: '#454857',
  textHeading: '#f3f4f6',
  textBody: '#9ca3af',
  textAccent: '#60a5fa',
  textOnAccent: '#17171c',
  actionNah: '#fd5068',
  actionYeah: '#2ecc8f',
} as const;

// The Figma "persona" variable collection only documents a Dark mode palette
// ("Dark mode shown" note on the Colour page) — Light has no distinct values yet,
// so it falls back to the same tokens until Figma defines it.
export const colors = {
  dark: darkColors,
  light: darkColors,
} as const;

export type ColorScheme = keyof typeof colors;
export type ThemeColors = typeof darkColors;

export const spacing = {
  xs: 8,
  sm: 10,
  md: 12,
  lg: 20,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  card: 18,
  action: 28,
  voice: 19,
  stamp: 12,
  message: 12,
  matchCta: 16,
} as const;

export const sizes = {
  avatar: 240,
  voiceIcon: 22,
  voiceCircle: 38,
  actionButton: 56,
  actionGap: 36,
  matchAvatar: 220,
  matchAvatarRing: 232,
} as const;

export const typography = {
  personaTitle: {
    fontFamily: 'Geist_600SemiBold',
    fontSize: 26,
    lineHeight: 31.2,
    letterSpacing: -0.25,
  },
  personaSectionTitle: {
    fontFamily: 'Geist_500Medium',
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.1,
  },
  personaStyleName: {
    fontFamily: 'DMSans_600SemiBold',
    fontSize: 14,
    lineHeight: 19.6,
    letterSpacing: 1,
  },
  personaDescription: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 1,
  },
  personaVoiceLabel: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 14,
    lineHeight: 20.3,
    letterSpacing: 1,
  },
  stamp: {
    fontFamily: 'Geist_600SemiBold',
    fontSize: 34,
    letterSpacing: 3,
  },
  matchTitle: {
    fontFamily: 'Geist_600SemiBold',
    fontSize: 34,
    letterSpacing: 0,
  },
  matchSubtitle: {
    fontFamily: 'DMSans_400Regular',
    fontSize: 16,
    letterSpacing: 0,
  },
  matchCta: {
    fontFamily: 'Geist_600SemiBold',
    fontSize: 17,
    letterSpacing: 0,
  },
} as const;
