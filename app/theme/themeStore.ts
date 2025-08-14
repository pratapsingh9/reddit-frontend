import { create } from 'zustand';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorScheme } from './types';

interface ThemeStoreState {
  colorScheme: ColorScheme;
  isSystemTheme: boolean;
  initialize: () => Promise<void>;
  setColorScheme: (scheme: ColorScheme) => Promise<void>;
  toggleColorScheme: () => Promise<void>;
  setIsSystemTheme: (value: boolean) => Promise<void>;
}

const STORAGE_KEY = 'app_theme_settings';

export const useThemeStore = create<ThemeStoreState>((set, get) => ({
  colorScheme: 'light',
  isSystemTheme: true,

  initialize: async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        const { colorScheme, isSystemTheme } = JSON.parse(saved);
        set({ colorScheme, isSystemTheme });
      } else {
        const systemScheme = Appearance.getColorScheme() || 'light';
        set({ colorScheme: systemScheme, isSystemTheme: true });
      }
    } catch (error) {
      console.error('Failed to load theme settings', error);
    }
  },

  setColorScheme: async (scheme) => {
    set({ colorScheme: scheme, isSystemTheme: false });
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ colorScheme: scheme, isSystemTheme: false })
    );
  },

  toggleColorScheme: async () => {
    const newScheme = get().colorScheme === 'light' ? 'dark' : 'light';
    set({ colorScheme: newScheme, isSystemTheme: false });
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ colorScheme: newScheme, isSystemTheme: false })
    );
  },

  setIsSystemTheme: async (value) => {
    if (value) {
      const systemScheme = Appearance.getColorScheme() || 'light';
      set({ isSystemTheme: true, colorScheme: systemScheme });
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ colorScheme: systemScheme, isSystemTheme: true })
      );
    } else {
      set({ isSystemTheme: false });
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ colorScheme: get().colorScheme, isSystemTheme: false })
      );
    }
  },
}));

Appearance.addChangeListener(({ colorScheme }) => {
  if (useThemeStore.getState().isSystemTheme) {
    useThemeStore.setState({ colorScheme: colorScheme === 'dark' ? 'dark' : 'light' });
  }
});