import { View, Text, StyleSheet, ViewStyle, TextStyle, Pressable } from 'react-native';
import { useTheme } from '../theme/ThemeProvider'; // Adjust path as needed

export default function ExploreScreen() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    } as ViewStyle,
    content: {
      alignItems: 'center',
      maxWidth: 300,
    } as ViewStyle,
    icon: {
      fontSize: 60,
      marginBottom: theme.spacing.lg,
    } as TextStyle,
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold as any,
      textAlign: 'center',
      marginBottom: theme.spacing.sm,
    } as TextStyle,
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.regular as any,
      textAlign: 'center',
      lineHeight: theme.typography.sizes.md * 1.4,
    } as TextStyle,
    actionButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      marginTop: theme.spacing.xl,
      ...theme.shadows.sm,
    } as ViewStyle,
    actionButtonText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.text}>Explore Content</Text>
        <Text style={styles.subtitle}>
          Discover new communities, trending topics, and interesting discussions
        </Text>
        <Pressable style={styles.actionButton} onPress={() => console.log('Start exploring')}>
          <Text style={styles.actionButtonText}>Start Exploring</Text>
        </Pressable>
      </View>
    </View>
  );
}