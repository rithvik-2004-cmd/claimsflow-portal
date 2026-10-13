// Design tokens: raw values only. No React, no MUI.
// Anything that needs a color, radius or timing (theme, charts, animations)
// should import it from here.

export const colors = {
  primary: {
    main: '#0F4C81',
    light: '#3B7BB5',
    dark: '#0A3560',
    tint: '#EAF2FA', // selected rows, active nav background
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#2563EB',
    light: '#60A5FA',
    dark: '#1D4ED8',
    contrastText: '#FFFFFF',
  },
  accent: {
    main: '#F97316',
    light: '#FB923C',
    dark: '#C2410C',
    contrastText: '#1F1305', // dark text: white fails contrast on orange
  },
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#047857', // use for text on light backgrounds
    contrastText: '#052E1F',
  },
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#B45309', // use for text on light backgrounds
    contrastText: '#2B1B02',
  },
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#B91C1C', // use for text on light backgrounds
    contrastText: '#FFFFFF',
  },
};

export const neutral = {
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceSubtle: '#F1F5F9',
  border: '#E2E8F0', // cards, dividers
  borderStrong: '#CBD5E1',
  inputBorder: '#8392A5', // meets 3:1 contrast for form controls
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textTertiary: '#64748B',
  textDisabled: '#94A3B8',
};

// Fill / border / text triplets for status badges, alerts and banners.
export const statusTones = {
  success: { fill: '#ECFDF5', border: '#A7F3D0', text: '#047857' },
  warning: { fill: '#FFFBEB', border: '#FDE68A', text: '#B45309' },
  error: { fill: '#FEF2F2', border: '#FECACA', text: '#B91C1C' },
  info: { fill: '#EFF6FF', border: '#BFDBFE', text: '#1D4ED8' },
  accent: { fill: '#FFF7ED', border: '#FED7AA', text: '#C2410C' },
  primary: { fill: '#EAF2FA', border: '#C5DAEE', text: '#0F4C81' },
  neutral: { fill: '#F1F5F9', border: '#E2E8F0', text: '#475569' },
};

export const radii = { sm: 6, md: 8, lg: 12, xl: 16 };

export const shadows = {
  xs: '0 1px 2px rgba(15, 23, 42, 0.04)',
  sm: '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
  md: '0 4px 12px rgba(15, 23, 42, 0.08)',
  lg: '0 12px 32px rgba(15, 23, 42, 0.12)',
};

// Durations are in seconds (Framer Motion's unit).
export const motion = {
  duration: { instant: 0.08, fast: 0.14, base: 0.2, slow: 0.32, deliberate: 0.5 },
  // Arrays for Framer Motion
  easing: {
    standard: [0.4, 0, 0.2, 1],
    decelerate: [0, 0, 0.2, 1],
    accelerate: [0.4, 0, 1, 1],
  },
  // Same standard curve as a CSS string
  cssEasing: 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const breakpoints = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280 };