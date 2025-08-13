import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
  SafeAreaView,
  Platform,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';

const { width } = Dimensions.get('window');

interface PostData {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  time: string;
  upvotes: string;
  comments: string;
  image?: string;
}

const posts: PostData[] = [
  {
    id: '1',
    title: 'Just adopted this little guy today! Meet Max!',
    subreddit: 'r/aww',
    author: 'u/doglover42',
    time: '5h ago',
    upvotes: '12.3k',
    comments: '842',
    image: 'https://i.redd.it/9bf67ygj7a0d1.jpeg',
  },
  {
    id: '2',
    title: 'TIL that honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.',
    subreddit: 'r/todayilearned',
    author: 'u/factfinder',
    time: '8h ago',
    upvotes: '24.7k',
    comments: '1.2k',
  },
  {
    id: '3',
    title: 'My homemade pizza from last night',
    subreddit: 'r/food',
    author: 'u/pizzalover',
    time: '3h ago',
    upvotes: '5.6k',
    comments: '312',
    image: 'https://i.redd.it/homemade-pizza-xyz.jpg',
  },
];

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { theme } = useTheme();

  const postStyles = StyleSheet.create({
    postContainer: {
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
      marginBottom: theme.spacing.xs,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
    } as ViewStyle,
    voteContainer: {
      width: 40,
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: theme.spacing.sm,
      marginRight: theme.spacing.sm,
    } as ViewStyle,
    voteButton: {
      padding: theme.spacing.xs,
    } as ViewStyle,
    voteCount: {
      fontWeight: theme.typography.weights.semibold as any,
      fontSize: theme.typography.sizes.xs,
      marginVertical: theme.spacing.xxs,
      color: theme.colors.text,
      textAlign: 'center',
    } as TextStyle,
    postContent: {
      flex: 1,
    } as ViewStyle,
    subreddit: {
      fontWeight: theme.typography.weights.semibold as any,
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.primary,
      marginBottom: theme.spacing.xs,
    } as TextStyle,
    postTitle: {
      fontWeight: theme.typography.weights.medium as any,
      fontSize: theme.typography.sizes.md,
      color: theme.colors.text,
      marginBottom: theme.spacing.sm,
      lineHeight: theme.typography.sizes.md * 1.3,
    } as TextStyle,
    postImage: {
      width: '100%',
      height: 200,
      borderRadius: theme.radii.sm,
      marginBottom: theme.spacing.sm,
    } as ImageStyle,
    postFooter: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing.xs,
    } as ViewStyle,
    postMeta: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      fontWeight: theme.typography.weights.regular as any,
    } as TextStyle,
    actionButtons: {
      flexDirection: 'row',
    } as ViewStyle,
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: theme.spacing.md,
      padding: theme.spacing.xs,
      borderRadius: theme.radii.sm,
    } as ViewStyle,
    actionText: {
      fontSize: theme.typography.sizes.xs,
      color: theme.colors.textSecondary,
      marginLeft: theme.spacing.xs,
      fontWeight: theme.typography.weights.medium as any,
    } as TextStyle,
  });

  return (
    <View style={postStyles.postContainer}>
      <View style={postStyles.voteContainer}>
        <Pressable style={postStyles.voteButton}>
          <Ionicons name="arrow-up" size={20} color={theme.colors.upvote} />
        </Pressable>
        <Text style={postStyles.voteCount}>{post.upvotes}</Text>
        <Pressable style={postStyles.voteButton}>
          <Ionicons name="arrow-down" size={20} color={theme.colors.downvote} />
        </Pressable>
      </View>

      <View style={postStyles.postContent}>
        <Text style={postStyles.subreddit}>{post.subreddit}</Text>
        <Text style={postStyles.postTitle}>{post.title}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={postStyles.postImage} resizeMode="cover" />
        )}
        <View style={postStyles.postFooter}>
          <Text style={postStyles.postMeta}>{post.author} • {post.time}</Text>
          <View style={postStyles.actionButtons}>
            <Pressable style={postStyles.actionButton}>
              <Feather name="message-square" size={14} color={theme.colors.textSecondary} />
              <Text style={postStyles.actionText}>{post.comments}</Text>
            </Pressable>
            <Pressable style={postStyles.actionButton}>
              <Feather name="share-2" size={14} color={theme.colors.textSecondary} />
              <Text style={postStyles.actionText}>Share</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function HomeScreen() {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    } as ViewStyle,
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
      ...theme.shadows.xs,
    } as ViewStyle,
    logo: {
      width: 32,
      height: 32,
      borderRadius: theme.radii.full,
    } as ImageStyle,
    searchBar: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: theme.radii.full,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginHorizontal: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    } as ViewStyle,
    searchText: {
      marginLeft: theme.spacing.sm,
      color: theme.colors.placeholder,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.regular as any,
    } as TextStyle,
    profileButton: {
      padding: theme.spacing.xs,
    } as ViewStyle,
    sortBar: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    sortButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.sm,
    } as ViewStyle,
    sortButtonActive: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    } as ViewStyle,
    sortText: {
      marginLeft: theme.spacing.xs,
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium as any,
    } as TextStyle,
    sortTextActive: {
      color: theme.colors.primary,
      fontWeight: theme.typography.weights.semibold as any,
    } as TextStyle,
    postsContainer: {
      flex: 1,
      paddingBottom: Platform.OS === 'android' ? 60 : 0, // Extra padding for Android navigation bar
    } as ViewStyle,
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    loadingText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.md,
      marginTop: theme.spacing.sm,
    } as TextStyle,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable>
            <Image
              source={{ uri: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png' }}
              style={styles.logo}
            />
          </Pressable>
          <Pressable style={styles.searchBar}>
            <Feather name="search" size={18} color={theme.colors.placeholder} />
            <Text style={styles.searchText}>Search Reddit</Text>
          </Pressable>
          <Pressable style={styles.profileButton}>
            <FontAwesome name="user-circle" size={24} color={theme.colors.textSecondary} />
          </Pressable>
        </View>

        {/* Sort/Filter Bar */}
        <View style={styles.sortBar}>
          <Pressable style={[styles.sortButton, styles.sortButtonActive]}>
            <Ionicons name="flame" size={18} color={theme.colors.primary} />
            <Text style={[styles.sortText, styles.sortTextActive]}>Hot</Text>
          </Pressable>
          <Pressable style={styles.sortButton}>
            <Ionicons name="timer-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={styles.sortText}>New</Text>
          </Pressable>
          <Pressable style={styles.sortButton}>
            <Ionicons name="trending-up-outline" size={18} color={theme.colors.textSecondary} />
            <Text style={styles.sortText}>Top</Text>
          </Pressable>
        </View>

        {/* Posts */}
        <ScrollView
          style={styles.postsContainer}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
        >
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}