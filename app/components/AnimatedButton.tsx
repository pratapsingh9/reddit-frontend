import { Pressable, Text, StyleSheet, View } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Theme } from '../constants/themes';

interface AnimatedButtonProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'text';
  onPress?: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function AnimatedButton({ 
  label, 
  variant = 'primary',
  onPress 
}: AnimatedButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress?.();
  };

  const buttonStyles = [
    styles.button,
    variant === 'primary' && styles.primary,
    variant === 'secondary' && styles.secondary,
    variant === 'text' && styles.text,
  ];

  const textStyles = [
    styles.text,
    variant === 'primary' && styles.primaryText,
    variant === 'secondary' && styles.secondaryText,
    variant === 'text' && styles.textText,
  ];

  return (
    <AnimatedPressable
      style={[buttonStyles, animatedStyle]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Text style={textStyles}>{label}</Text>
    </AnimatedPressable>
  );
}

const textBase = {
  fontSize: 16,
  fontFamily: 'Inter_600SemiBold',
};

const styles = StyleSheet.create({
  button: {
    padding: Theme.spacing.md,
    borderRadius: Theme.radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Theme.spacing.sm,
    ...Theme.shadows.md,
  },
  primary: {
    backgroundColor: Theme.colors.primary,
  },
  secondary: {
    backgroundColor: Theme.colors.card,
    borderWidth: 1,
    borderColor: Theme.colors.primary,
  },
  text: {
    backgroundColor: 'transparent',
  },
  primaryText: {
    ...textBase,
    color: Theme.colors.text,
  },
  secondaryText: {
    ...textBase,
    color: Theme.colors.primary,
  },
  textText: {
    ...textBase,
    color: Theme.colors.textSecondary,
  },
});