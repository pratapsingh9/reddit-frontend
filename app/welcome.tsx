import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Link } from 'expo-router';
import { Theme } from './constants/themes';
import GradientBackground from './components/GradientBackground';
import AnimatedButton from './components/AnimatedButton';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <GradientBackground>
      <View style={styles.container}>
        
        {/* Animated Logo */}
        <Animated.View 
          entering={FadeIn.delay(200).duration(1000)}
          style={styles.logoContainer}
        >
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.tagline}>Join the conversation</Text>
        </Animated.View>

        {/* Feature Highlights */}
        <Animated.View 
          entering={FadeInDown.delay(400).duration(800)}
          style={styles.features}
        >
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🗨️</Text>
            </View>
            <Text style={styles.featureText}>Engaging discussions</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🔗</Text>
            </View>
            <Text style={styles.featureText}>Connect with communities</Text>
          </View>
          
          <View style={styles.featureItem}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>✨</Text>
            </View>
            <Text style={styles.featureText}>Personalized feed</Text>
          </View>
        </Animated.View>

        {/* Action Buttons */}
        <Animated.View 
          entering={FadeInUp.delay(600).duration(800)}
          style={styles.buttons}
        >
          {/* <Link href="/auth/register" asChild>
            <AnimatedButton 
              label="Create Account"
              variant="primary"
            />
          </Link>
          
          <Link href="/auth/login" asChild>
            <AnimatedButton 
              label="Log In"
              variant="secondary"
            />
          </Link>
          
          <Link href="/home" asChild>
            <AnimatedButton 
              label="Continue as Guest"
              variant="text"
            />
          </Link> */}
        </Animated.View>

        {/* Social Auth */}
        <Animated.View entering={FadeIn.delay(800)}>
          <Text style={styles.divider}>or continue with</Text>
          {/* <AuthProviders /> */}
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Theme.spacing.xl,
    paddingBottom: Theme.spacing.xl * 2,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Theme.spacing.xl * 2,
    marginBottom: Theme.spacing.xl * 2,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: Theme.spacing.md,
  },
  tagline: {
    fontSize: 18,
    color: Theme.colors.textSecondary,
    fontFamily: 'Inter_500Medium',
  },
  features: {
    marginVertical: Theme.spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Theme.spacing.sm,
  },
  featureIcon: {
    width: 40,
    height: 40,
    borderRadius: Theme.radii.full,
    backgroundColor: Theme.colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Theme.spacing.md,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
    color: Theme.colors.text,
    fontFamily: 'Inter_400Regular',
  },
  buttons: {
    marginTop: Theme.spacing.lg,
  },
  divider: {
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    marginVertical: Theme.spacing.lg,
    fontFamily: 'Inter_400Regular',
  },
});