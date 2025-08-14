import React, { createContext, useContext, useEffect } from 'react';
import { useThemeStore } from './themeStore';
import { LightTheme } from './lightTheme';
import { DarkTheme } from './darkTheme';
import { Theme, ColorScheme } from './types';

interface ThemeContextValue {
  theme: Theme;
  colorScheme: ColorScheme;
  toggleColorScheme: () => Promise<void>;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
  isSystemTheme: boolean;
  setIsSystemTheme: (value: boolean) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: LightTheme,
  colorScheme: 'light',
  toggleColorScheme: async () => {},
  setColorScheme: async () => {},
  isSystemTheme: true,
  setIsSystemTheme: async () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    colorScheme,
    isSystemTheme,
    initialize,
    toggleColorScheme,
    setColorScheme,
    setIsSystemTheme,
  } = useThemeStore();

  useEffect(() => {
    initialize();
  }, []);

  const theme = colorScheme === 'dark' ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        colorScheme,
        toggleColorScheme,
        setColorScheme,
        isSystemTheme,
        setIsSystemTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};