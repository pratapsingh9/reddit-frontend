import { Theme } from './types';
import { LightTheme } from './lightTheme';

export const DarkTheme: Theme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    background: '#121212',
    backgroundSecondary: '#1E1E1E',
    backgroundTertiary: '#2D2D2D',
    
    text: '#FFFFFF',
    textSecondary: '#A0A0A0',
    textTertiary: '#787878',
    
    border: '#2D2D2D',
    placeholder: '#787878',
    highlight: '#2D2D2D',
  },
};