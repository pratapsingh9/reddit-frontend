import { View, Text, Pressable, Image, StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

interface PostCardProps {
  title: string;
  author: string;
  community: string;
  votes: number;
  comments: number;
  time: string;
  image?: string;
  onPress?: () => void;
}

export default function PostCard({
  title,
  author,
  community,
  votes,
  comments,
  time,
  image,
  onPress,
}: PostCardProps) {
  const { theme } = useTheme();
  
  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.background,
      marginHorizontal: theme.spacing.md,
      marginVertical: theme.spacing.xs,
      padding: theme.spacing.md,
      borderRadius: theme.radii.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
      ...theme.shadows.xs,
    } as ViewStyle,
    cardPressed: {
      backgroundColor: theme.colors.highlight,
      transform: [{ scale: 0.995 }],
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.sm,
      flexWrap: 'wrap',
    } as ViewStyle,
    community: {
      color: theme.colors.primary,
      fontWeight: theme.typography.weights.semibold as any,
      fontSize: theme.typography.sizes.xs,
    } as TextStyle,
    author: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      marginLeft: theme.spacing.xs,
      fontWeight: theme.typography.weights.regular as any,
    } as TextStyle,
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.semibold as any,
      color: theme.colors.text,
      marginBottom: theme.spacing.md,
      lineHeight: theme.typography.sizes.lg * 1.3,
    } as TextStyle,
    image: {
      width: '100%',
      height: 200,
      borderRadius: theme.radii.sm,
      marginBottom: theme.spacing.md,
    } as ImageStyle,
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    } as ViewStyle,
    voteContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.full,
    } as ViewStyle,
    voteButton: {
      padding: theme.spacing.xs,
    } as ViewStyle,
    upvote: {
      color: theme.colors.upvote,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold as any,
    } as TextStyle,
    downvote: {
      color: theme.colors.downvote,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.bold as any,
    } as TextStyle,
    voteCount: {
      color: theme.colors.text,
      fontWeight: theme.typography.weights.semibold as any,
      fontSize: theme.typography.sizes.sm,
      marginHorizontal: theme.spacing.sm,
      minWidth: 30,
      textAlign: 'center',
    } as TextStyle,
    commentsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: theme.spacing.xs,
      borderRadius: theme.radii.full,
    } as ViewStyle,
    comments: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.medium as any,
    } as TextStyle,
    commentIcon: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      marginRight: theme.spacing.xs,
    } as TextStyle,
  });

  const formatVotes = (votes: number) => {
    if (votes >= 1000) {
      return `${(votes / 1000).toFixed(1)}k`;
    }
    return votes.toString();
  };

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        styles.card,
        pressed && styles.cardPressed
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.community}>r/{community}</Text>
        <Text style={styles.author}>• Posted by u/{author} {time}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      
      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <Pressable style={styles.voteButton}>
            <Text style={styles.upvote}>▲</Text>
          </Pressable>
          <Text style={styles.voteCount}>{formatVotes(votes)}</Text>
          <Pressable style={styles.voteButton}>
            <Text style={styles.downvote}>▼</Text>
          </Pressable>
        </View>
        
        <View style={styles.commentsContainer}>
          <Text style={styles.commentIcon}>💬</Text>
          <Text style={styles.comments}>{comments}</Text>
        </View>
      </View>
    </Pressable>
  );
}
