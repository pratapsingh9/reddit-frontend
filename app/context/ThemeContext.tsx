import React, { createContext, useState, useContext } from 'react';
import { BaseTheme, ThemeType } from '../constants/themes';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: BaseTheme,
  isDark: true,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark] = useState(true);

  return (
    <ThemeContext.Provider value={{ theme: BaseTheme, isDark, toggleTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme error');
  return context;
};