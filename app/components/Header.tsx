
// Header.tsx
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function Header() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.lg,
      paddingHorizontal: theme.spacing.md,
      alignItems: 'center',
      ...theme.shadows.sm,
    } as ViewStyle,
    title: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold as any,
      letterSpacing: 0.5,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>VocalPoint</Text>
    </View>
  );
}
