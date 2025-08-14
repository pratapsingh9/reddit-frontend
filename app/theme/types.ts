export type ColorScheme = 'light' | 'dark';

export interface ThemeSpacing {
  none: number;
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
}

export interface ThemeRadii {
  none: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  full: number;
}

export interface ThemeShadow {
  shadowColor: string;
  shadowOffset: { width: number; height: number };
  shadowOpacity: number;
  shadowRadius: number;
  elevation: number;
}

export interface ThemeShadows {
  xs: ThemeShadow;
  sm: ThemeShadow;
  md: ThemeShadow;
  lg: ThemeShadow;
}

export interface ThemeTypographySizes {
  xxs: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
  xxxl: number;
}

export interface ThemeTypographyWeights {
  regular: string;
  medium: string;
  semibold: string;
  bold: string;
}

export interface ThemeTypography {
  sizes: ThemeTypographySizes;
  weights: ThemeTypographyWeights;
}

export interface ThemeColors {
  primary: string;
  primaryDark: string;
  primaryLight: string;

  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;

  text: string;
  textSecondary: string;
  textTertiary: string;
  textInverted: string;

  upvote: string;
  downvote: string;
  success: string;
  warning: string;
  error: string;

  border: string;
  placeholder: string;
  highlight: string;
  inputBackground: string;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  radii: ThemeRadii;
  shadows: ThemeShadows;
  typography: ThemeTypography;
}