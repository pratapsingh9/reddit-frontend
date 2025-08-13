import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './theme/ThemeProvider';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
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
          }} 
        />
        <Stack.Screen 
          name="auth/register" 
          options={{ 
            title: 'Create Account',
            presentation: 'modal',
          }} 
        />
        <Stack.Screen 
          name="home/main" 
          options={{ 
            title: 'Reddit Clone',
            presentation: 'modal',
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}