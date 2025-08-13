import { View, Text, Image, Pressable, StyleSheet, ViewStyle, TextStyle, ImageStyle } from "react-native";
import { useTheme } from '../theme/ThemeProvider';

interface CommunityCardProps {
  community: {
    name: string;
    members: string;
    icon?: string;
  };
  onPress?: () => void;
}

export default function CommunityCard({ community, onPress }: CommunityCardProps) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      width: 150,
      marginRight: theme.spacing.md,
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.lg,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.sm,
    } as ViewStyle,
    pressable: {
      transform: [{ scale: 1 }],
    } as ViewStyle,
    pressablePressed: {
      transform: [{ scale: 0.98 }],
      opacity: 0.9,
    } as ViewStyle,
    content: {
      padding: theme.spacing.md,
      alignItems: 'center',
    } as ViewStyle,
    icon: {
      width: 60,
      height: 60,
      borderRadius: theme.radii.full,
      marginBottom: theme.spacing.sm,
    } as ImageStyle,
    defaultIcon: {
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    defaultIconText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold as any,
    } as TextStyle,
    name: {
      fontWeight: theme.typography.weights.semibold as any,
      fontSize: theme.typography.sizes.md,
      marginBottom: theme.spacing.xs,
      color: theme.colors.text,
      width: '100%',
      textAlign: 'center',
    } as TextStyle,
    members: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      fontWeight: theme.typography.weights.medium as any,
    } as TextStyle,
  });

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressablePressed
      ]}
    >
      <View style={styles.content}>
        {community.icon ? (
          <Image source={{ uri: community.icon }} style={styles.icon} />
        ) : (
          <View style={[styles.icon, styles.defaultIcon]}>
            <Text style={styles.defaultIconText}>
              {community.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.name} numberOfLines={1}>
          {community.name}
        </Text>
        <Text style={styles.members}>{community.members} members</Text>
      </View>
    </Pressable>
  );
}

