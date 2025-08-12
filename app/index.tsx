import { View, Text, Image, Pressable } from 'react-native';
import { Link } from 'expo-router';
import Animated from 'react-native-reanimated';
import { useTheme } from './context/ThemeContext';
import { createWelcomeStyles } from './styles/welcomeStyles';



export default function WelcomeScreen() {
  const { theme } = useTheme();
  const styles = createWelcomeStyles(theme);

  return (
    <View style={styles.container}>
      <Animated.View entering={Animated.FadeIn.duration(1000)} style={styles.logoContainer}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.tagline}>The front page of the internet</Text>
      </Animated.View>

      <View style={styles.buttons}>
        <Animated.View entering={Animated.FadeInDown.delay(200).duration(600)}>
          <Link href="/auth/register" asChild>
            <Pressable style={({ pressed }) => [styles.primaryButton, pressed && styles.pressedPrimary]}>
              <Text style={styles.primaryButtonText}>Create Account</Text>
            </Pressable>
          </Link>
        </Animated.View>

        <Animated.View entering={Animated.FadeInDown.delay(300).duration(600)}>
          <Link href="/auth/login" asChild>
            <Pressable style={({ pressed }) => [styles.secondaryButton, pressed && styles.pressedSecondary]}>
              <Text style={styles.secondaryButtonText}>Log In</Text>
            </Pressable>
          </Link>
        </Animated.View>

        <Animated.View entering={Animated.FadeInDown.delay(400).duration(600)}>
          <Link href="/home" asChild>
            <Pressable style={({ pressed }) => [styles.guestButton, pressed && styles.pressedGuest]}>
              <Text style={styles.guestText}>Continue as Guest</Text>
            </Pressable>
          </Link>
        </Animated.View>
      </View>

      <Animated.View entering={Animated.FadeIn.delay(600).duration(800)} style={styles.footer}>
        <Text style={styles.footerText}>
          By continuing, you agree to our{' '}
          <Text style={styles.linkText}>User Agreement</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </Animated.View>
    </View>
  );
}