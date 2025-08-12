// app/_layout.tsx
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './context/ThemeContext';


export default function RootLayout() {
  return (
    <ThemeProvider>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen 
          name="index" 
          options={{ 
            headerShown: false,
            animation: 'fade',
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
              backgroundColor: '#1a1a1a', 
            },
            headerTintColor: '#fff', 
          }} 
        />
        <Stack.Screen 
          name="auth/register" 
          options={{ 
            title: 'Create Account',
            presentation: 'modal',
            headerStyle: {
              backgroundColor: '#1a1a1a',
            },
            headerTintColor: '#fff',
          }} 
        />
      </Stack>
    </ThemeProvider>
  );
}