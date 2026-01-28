'use client';

import { createTheme, alpha } from '@mui/material/styles';

// Medical-grade color palette
const colors = {
  // Primary - Medical Blue (trust, professionalism)
  primary: {
    50: '#E8F4FC',
    100: '#C5E4F7',
    200: '#9DD2F2',
    300: '#75BFEC',
    400: '#58B0E8',
    500: '#4B9CD3', // Main
    600: '#3D8AC4',
    700: '#2F75AE',
    800: '#236097',
    900: '#0F3D6B',
  },
  // Secondary - Deep Navy (authority, stability)
  secondary: {
    50: '#E6EBF0',
    100: '#C1CDD9',
    200: '#97ACC1',
    300: '#6D8BA9',
    400: '#4D7297',
    500: '#2E5985',
    600: '#264B73',
    700: '#1E3C5D',
    800: '#162D47',
    900: '#0F2A44', // Main
  },
  // Success - Medical Green
  success: {
    50: '#E6F7F0',
    100: '#C2EBD9',
    200: '#99DEC0',
    300: '#6FD1A7',
    400: '#50C793',
    500: '#10B981', // Main
    600: '#0EA574',
    700: '#0C9165',
    800: '#0A7D56',
    900: '#065F42',
  },
  // Warning - Attention Orange
  warning: {
    50: '#FFF8E6',
    100: '#FFEDC1',
    200: '#FFE097',
    300: '#FFD36D',
    400: '#FFC94D',
    500: '#F59E0B', // Main
    600: '#E08D0A',
    700: '#C77A09',
    800: '#AE6808',
    900: '#8B5206',
  },
  // Error - Alert Red
  error: {
    50: '#FEE8E8',
    100: '#FCC5C5',
    200: '#FA9E9E',
    300: '#F87777',
    400: '#F65959',
    500: '#EF4444', // Main
    600: '#DC3D3D',
    700: '#C53434',
    800: '#AE2C2C',
    900: '#8B2222',
  },
  // Neutral
  grey: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary[500],
      light: colors.primary[300],
      dark: colors.primary[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: colors.secondary[900],
      light: colors.secondary[600],
      dark: colors.secondary[900],
      contrastText: '#FFFFFF',
    },
    success: {
      main: colors.success[500],
      light: colors.success[300],
      dark: colors.success[700],
    },
    warning: {
      main: colors.warning[500],
      light: colors.warning[300],
      dark: colors.warning[700],
    },
    error: {
      main: colors.error[500],
      light: colors.error[300],
      dark: colors.error[700],
    },
    grey: colors.grey,
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
      subtle: colors.grey[50],
    },
    text: {
      primary: colors.grey[900],
      secondary: colors.grey[600],
      disabled: colors.grey[400],
    },
    divider: colors.grey[200],
  },
  typography: {
    fontFamily: [
      'Pretendard',
      '-apple-system',
      'BlinkMacSystemFont',
      'system-ui',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'sans-serif',
    ].join(','),
    // Display - Hero headlines
    h1: {
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    // Page titles
    h2: {
      fontSize: 'clamp(2rem, 4vw, 3rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    // Section titles
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    // Card titles
    h4: {
      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    // Subsection titles
    h5: {
      fontSize: '1.125rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    // Small titles
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    // Large body text
    body1: {
      fontSize: '1.0625rem',
      lineHeight: 1.7,
      letterSpacing: '0.01em',
    },
    // Regular body text
    body2: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    // UI labels
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    // Buttons
    button: {
      fontSize: '0.9375rem',
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    // Small text
    caption: {
      fontSize: '0.8125rem',
      lineHeight: 1.5,
      letterSpacing: '0.02em',
    },
    // Overlines
    overline: {
      fontSize: '0.75rem',
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px rgba(15, 23, 42, 0.04)',
    '0 1px 3px rgba(15, 23, 42, 0.06), 0 1px 2px rgba(15, 23, 42, 0.04)',
    '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
    '0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -2px rgba(15, 23, 42, 0.04)',
    '0 20px 25px -5px rgba(15, 23, 42, 0.08), 0 10px 10px -5px rgba(15, 23, 42, 0.02)',
    '0 25px 50px -12px rgba(15, 23, 42, 0.15)',
    ...Array(18).fill('none'),
  ],
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          scrollBehavior: 'smooth',
        },
        body: {
          overflowX: 'hidden',
        },
        '::selection': {
          backgroundColor: alpha(colors.primary[500], 0.2),
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '12px 28px',
          transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
          // Minimum touch target for mobile
          minHeight: 48,
        },
        sizeSmall: {
          padding: '8px 16px',
          minHeight: 40,
          fontSize: '0.875rem',
        },
        sizeLarge: {
          padding: '16px 36px',
          minHeight: 56,
          fontSize: '1rem',
        },
        contained: {
          boxShadow: `0 4px 14px ${alpha(colors.primary[500], 0.25)}`,
          '&:hover': {
            boxShadow: `0 6px 20px ${alpha(colors.primary[500], 0.35)}`,
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0)',
          },
        },
        containedPrimary: {
          background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            backgroundColor: alpha(colors.primary[500], 0.04),
          },
        },
        text: {
          '&:hover': {
            backgroundColor: alpha(colors.primary[500], 0.08),
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          border: `1px solid ${colors.grey[200]}`,
          boxShadow: '0 4px 6px -1px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.04)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          '@media (min-width: 640px)': {
            paddingLeft: 32,
            paddingRight: 32,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          '&:before': {
            display: 'none',
          },
          '&.Mui-expanded': {
            margin: 0,
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            minHeight: 48,
          },
        },
      },
    },
  },
});

export { colors };
export default theme;
