import { Dimensions, StyleSheet } from 'react-native';
import { ThemeType } from '../constants/themes';

const { height } = Dimensions.get('window');

export const createWelcomeStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.colors.background,
      justifyContent: 'center',
    },
    logoContainer: {
      alignItems: 'center',
      marginBottom: height * 0.08,
    },
    logo: {
      width: 100,
      height: 100,
      tintColor: theme.colors.primary,
    },
    tagline: {
      fontSize: 17,
      color: theme.colors.textSecondary,
      fontFamily: 'Inter_500Medium',
      letterSpacing: 0.3,
      marginTop: 8,
    },
    buttons: {
      width: '100%',
      gap: 14,
      paddingHorizontal: 10,
    },
    primaryButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    },
    pressedPrimary: {
      opacity: 0.85,
      transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold',
      letterSpacing: 0.6,
    },
    secondaryButton: {
      backgroundColor: 'transparent',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderRadius: theme.radii.lg,
      borderWidth: 2,
      borderColor: theme.colors.primary,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pressedSecondary: {
      backgroundColor: 'rgba(108, 99, 255, 0.1)',
    },
    secondaryButtonText: {
      color: theme.colors.primary,
      fontWeight: '600',
      fontSize: 17,
      fontFamily: 'Inter_600SemiBold',
    },
    guestButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      alignItems: 'center',
    },
    pressedGuest: {
      opacity: 0.6,
    },
    guestText: {
      color: theme.colors.accent,
      fontSize: 15,
      fontWeight: '600',
      fontFamily: 'Inter_500Medium',
    },
    footer: {
      position: 'absolute',
      bottom: 30,
      left: 24,
      right: 24,
    },
    footerText: {
      fontSize: 12,
      lineHeight: 16,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      fontFamily: 'Inter_400Regular',
    },
    linkText: {
      color: theme.colors.accent,
      textDecorationLine: 'underline',
      fontFamily: 'Inter_600SemiBold',
    },
  });