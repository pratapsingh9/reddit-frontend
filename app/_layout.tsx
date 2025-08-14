import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from './theme/ThemeProvider';
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

      <View style={{ flex: 1, paddingTop: 8, paddingBottom: 8, backgroundColor: theme.colors.background }}>
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
          name="home/create"
          options={{
            title: 'Create Post',
            presentation: 'modal',
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
        <Stack.Screen
          name="home/search"
          options={{
            title: 'Search',
            presentation: 'modal',
          }}
        />
        </Stack>
      </View>
    </>
  );
}

// Main layout with ThemeProvider
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutWithTheme />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}