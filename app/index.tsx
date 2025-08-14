import { useRouter } from 'expo-router';
import React, { memo, useCallback } from 'react';
import {
    Dimensions,
    Image,
    ImageStyle,
    Platform,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import { useTheme } from './theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface ActionButtonProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  onPress: () => void;
  children: React.ReactNode;
}

const ActionButton = memo(function ActionButton({ style, textStyle, onPress, children }: ActionButtonProps) {
  const { theme } = useTheme();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          width: '100%',
          paddingVertical: theme.spacing.md,
          borderRadius: theme.radii.lg,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: theme.spacing.md,
        } as ViewStyle,
        style,
        pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
      ]}
      onPress={onPress}
    >
      <Text style={textStyle}>{children}</Text>
    </Pressable>
  );
});

const WelcomeScreen = () => {
  const router = useRouter();
  const { theme, colorScheme } = useTheme();
  
  const handleSignIn = useCallback(() => console.log('Sign In pressed'), []);
  const handleGuestMode = () => {
    router.replace('/home/explore');
  };
  const handleCreateAccount = () => {
    router.navigate('/auth/register');
  };
  const handleLogin = useCallback(() => console.log('Login pressed'), []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingHorizontal: theme.spacing.lg,
      justifyContent: 'space-between',
      paddingVertical: theme.spacing.xl,
    } as ViewStyle,
    logoContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    } as ViewStyle,
    logo: {
      width: 100,
      height: 100,
      marginBottom: theme.spacing.lg,
      borderRadius: theme.radii.full,
    } as ImageStyle,
    title: {
      fontSize: theme.typography.sizes.xxxl,
      fontWeight: 'bold' as const,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      textAlign: 'center',
    } as TextStyle,
    subtitle: {
      fontSize: theme.typography.sizes.md,
      color: theme.colors.textSecondary,
      textAlign: 'center',
    } as TextStyle,
    buttonsContainer: {
      width: '100%',
    } as ViewStyle,
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    } as ViewStyle,
    line: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    } as ViewStyle,
    dividerText: {
      marginHorizontal: theme.spacing.sm,
      color: theme.colors.textSecondary,
    } as TextStyle,
    agreement: {
      fontSize: theme.typography.sizes.sm,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    } as TextStyle,
    link: {
      color: theme.colors.primary,
      textDecorationLine: 'underline',
    } as TextStyle,
    loginText: {
      textAlign: 'center',
      color: theme.colors.primary,
      fontWeight: '600' as const,
    } as TextStyle,
    googleButton: {
      backgroundColor: '#4285F4', // Remove dependency on theme.colors.googleBlue
    } as ViewStyle,
    googleButtonText: {
      color: theme.colors.textInverted,
      fontWeight: '600' as const,
    } as TextStyle,
    primaryButton: {
      backgroundColor: theme.colors.primary,
    } as ViewStyle,
    primaryButtonText: {
      color: theme.colors.textInverted,
      fontWeight: '600' as const,
    } as TextStyle,
    guestButton: {
      backgroundColor: theme.colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: theme.colors.border,
    } as ViewStyle,
    guestButtonText: {
      color: theme.colors.text,
      fontWeight: '600' as const,
    } as TextStyle,
  });

  return (
    <>
      <StatusBar 
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} 
        backgroundColor={theme.colors.background}
        translucent={true}
      />
      <View style={[styles.container, { paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0 }] }>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png',
            }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Welcome to Reddit</Text>
          <Text style={styles.subtitle}>Dive into anything</Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <ActionButton
            style={styles.googleButton}
            textStyle={styles.googleButtonText}
            onPress={handleSignIn}
          >
            Continue with Google
          </ActionButton>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.line} />
          </View>

          <ActionButton
            style={styles.primaryButton}
            textStyle={styles.primaryButtonText}
            onPress={handleCreateAccount}
          >
            Create account
          </ActionButton>

          <ActionButton
            style={styles.guestButton}
            textStyle={styles.guestButtonText}
            onPress={handleGuestMode}
          >
            Continue as Guest
          </ActionButton>

          <Text style={styles.agreement}>
            By continuing, you agree to our{' '}
            <Text style={styles.link}>User Agreement</Text> and{' '}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>

          <Pressable onPress={handleLogin}>
            <Text style={styles.loginText}>
              Already a redditor? Log in
            </Text>
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default WelcomeScreen;