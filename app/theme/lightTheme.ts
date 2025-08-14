import { Theme } from './types';

export const LightTheme: Theme = {
  colors: {
    primary: '#FF4500',
    primaryDark: '#CC3700',
    primaryLight: '#FF8C66',

    background: '#FFFFFF',
    backgroundSecondary: '#F8F9FA',
    backgroundTertiary: '#EDEFF1',

    text: '#1A1A1B',
    textSecondary: '#787C7E',
    textTertiary: '#A0A0C0',
    textInverted: '#FFFFFF',

    upvote: '#FF4500',
    downvote: '#7193FF',
    success: '#46D160',
    warning: '#FFB800',
    error: '#EA0027',

    border: '#EDEFF1',
    placeholder: '#A0A0C0',
    highlight: '#F6F7F8',
    inputBackground: '#F6F7F8',
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  radii: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 999,
  },
  shadows: {
    xs: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  typography: {
    sizes: {
      xxs: 10,
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    },
    weights: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
};