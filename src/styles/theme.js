import { createTheme } from '@mui/material/styles';
import {
  breakpoints,
  colors,
  motion,
  neutral,
  radii,
  shadows,
} from './tokens';

const fontFamily = [
  '"Inter Variable"',
  'Inter',
  'system-ui',
  '-apple-system',
  '"Segoe UI"',
  'Roboto',
  'sans-serif',
].join(',');

// Replace MUI's default shadow levels with our softer ones.
const themeShadows = [...createTheme().shadows];
themeShadows[1] = shadows.xs;
themeShadows[2] = shadows.sm;
themeShadows[3] = shadows.md;
themeShadows[4] = shadows.md;
themeShadows[8] = shadows.lg;
themeShadows[16] = shadows.lg;
themeShadows[24] = shadows.lg;

const fast = `${motion.duration.fast}s ${motion.cssEasing}`;

const theme = createTheme({
  breakpoints: { values: breakpoints },
  shape: { borderRadius: radii.md },
  shadows: themeShadows,

  palette: {
    mode: 'light',
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    info: colors.secondary,
    background: { default: neutral.background, paper: neutral.surface },
    text: {
      primary: neutral.textPrimary,
      secondary: neutral.textSecondary,
      tertiary: neutral.textTertiary,
      disabled: neutral.textDisabled,
    },
    divider: neutral.border,
  },

  typography: {
    fontFamily,
    fontSize: 14,
    h1: { fontSize: '1.75rem', lineHeight: 1.29, fontWeight: 650, letterSpacing: '-0.01em' },
    h2: { fontSize: '1.25rem', lineHeight: 1.4, fontWeight: 600, letterSpacing: '-0.005em' },
    h3: { fontSize: '1rem', lineHeight: 1.5, fontWeight: 600 },
    h4: { fontSize: '0.875rem', lineHeight: 1.43, fontWeight: 600 },
    h5: { fontSize: '0.8125rem', lineHeight: 1.54, fontWeight: 600 },
    h6: { fontSize: '0.75rem', lineHeight: 1.33, fontWeight: 600 },
    body1: { fontSize: '0.875rem', lineHeight: 1.57 },
    body2: { fontSize: '0.8125rem', lineHeight: 1.54 },
    caption: { fontSize: '0.75rem', lineHeight: 1.33, fontWeight: 500 },
    overline: {
      fontSize: '0.6875rem',
      lineHeight: 1.45,
      fontWeight: 600,
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
    },
    button: { fontSize: '0.875rem', fontWeight: 600, textTransform: 'none' },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { WebkitFontSmoothing: 'antialiased' },
        ':focus-visible': {
          outline: `2px solid ${colors.secondary.main}`,
          outlineOffset: 2,
        },
      },
    },

    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: ({ ownerState }) => ({
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: radii.md,
          transition: `background-color ${fast}, border-color ${fast}, box-shadow ${fast}`,
          '&:active': { transform: 'translateY(0.5px)' },
          ...(ownerState.size === 'small' && {
            height: 28, padding: '0 12px', fontSize: '0.8125rem',
          }),
          ...(ownerState.size === 'medium' && { height: 36, padding: '0 16px' }),
          ...(ownerState.size === 'large' && {
            height: 44, padding: '0 20px', fontSize: '0.9375rem',
          }),
          // "Secondary" look: white fill, neutral border
          ...(ownerState.variant === 'outlined' &&
            ownerState.color === 'primary' && {
              color: neutral.textPrimary,
              backgroundColor: neutral.surface,
              borderColor: neutral.inputBorder,
              '&:hover': {
                backgroundColor: neutral.surfaceSubtle,
                borderColor: neutral.textTertiary,
              },
            }),
          // "Ghost" look
          ...(ownerState.variant === 'text' &&
            ownerState.color === 'primary' && {
              '&:hover': { backgroundColor: colors.primary.tint },
            }),
        }),
      },
    },

    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          border: `1px solid ${neutral.border}`,
          borderRadius: radii.lg,
          boxShadow: shadows.xs,
          backgroundImage: 'none',
        },
      },
    },

    MuiCardContent: {
      styleOverrides: {
        root: { padding: 20, '&:last-child': { paddingBottom: 20 } },
      },
    },

    MuiPaper: {
      styleOverrides: { root: { backgroundImage: 'none' } },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radii.md,
          backgroundColor: neutral.surface,
          transition: `box-shadow ${fast}`,
          '& .MuiOutlinedInput-notchedOutline': { borderColor: neutral.inputBorder },
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: neutral.textTertiary },
          '&.Mui-focused': { boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.2)' },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.secondary.main,
            borderWidth: 1,
          },
          '&.Mui-error': { boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.15)' },
          '&.Mui-disabled': { backgroundColor: neutral.surfaceSubtle },
          '&.MuiInputBase-multiline': { padding: 0 },
        },
        input: { padding: '10px 12px' },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: { borderRadius: radii.sm, fontWeight: 600, fontSize: '0.75rem', height: 24 },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: neutral.textPrimary,
          fontSize: '0.75rem',
          borderRadius: radii.sm,
          padding: '6px 10px',
        },
      },
    },
  },
});

export default theme;