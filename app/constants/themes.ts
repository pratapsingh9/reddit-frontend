export const BaseTheme = {
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6584',
    background: '#0F0F1B',
    card: '#1E1E2D',
    text: '#FFFFFF',
    textSecondary: '#A0A0C0',
    accent: '#00D1B2',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 8,
    md: 12,
    lg: 24,
    full: 999,
  },
  shadows: {
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
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
  },
};

export type ThemeType = typeof BaseTheme;