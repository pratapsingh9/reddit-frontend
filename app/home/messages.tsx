import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider'; // Adjust path as needed

export default function MessagesScreen() {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
      padding: theme.spacing.lg,
    } as ViewStyle,
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold as any,
      textAlign: 'center',
    } as TextStyle,
    subtitle: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.regular as any,
      textAlign: 'center',
      marginTop: theme.spacing.sm,
    } as TextStyle,
    emptyStateIcon: {
      fontSize: theme.typography.sizes.xxxl * 2,
      marginBottom: theme.spacing.lg,
    } as TextStyle,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.emptyStateIcon}>💬</Text>
      <Text style={styles.text}>Messages</Text>
      <Text style={styles.subtitle}>Your conversations will appear here</Text>
    </View>
  );
}

