import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, useColorScheme } from 'react-native';
import { useTheme , ThemeProvider } from './theme/ThemeProvider';
// Wrapper to sync StatusBar with theme
function RootLayoutWithTheme() {
  const { theme } = useTheme();

  return (
    <>
      {/* Set StatusBar based on theme */}
      <StatusBar
        style={theme.colors.text === '#FFFFFF' ? 'light' : 'dark'}
        backgroundColor={theme.colors.background}
      />

      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="home"
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name="auth/login"
          options={{
            title: 'Log In',
            presentation: 'modal',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              color: theme.colors.text,
            },
          }}
        />
        <Stack.Screen
          name="auth/register"
          options={{
            title: 'Create Account',
            presentation: 'modal',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              color: theme.colors.text,
            },
          }}
        />
        <Stack.Screen
          name="home/main"
          options={{
            title: 'Reddit Clone',
            presentation: 'modal',
            headerStyle: {
              backgroundColor: theme.colors.background,
            },
            headerTintColor: theme.colors.text,
            headerTitleStyle: {
              color: theme.colors.text,
            },
          }}
        />
      </Stack>
    </>
  );
}

// Main layout with ThemeProvider
export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutWithTheme />
    </ThemeProvider>
  );
}