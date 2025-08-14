import { Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  Pressable,
  RefreshControl,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
  Modal,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { fetchJson } from '../lib/api';
import { useTheme } from '../theme/ThemeProvider';

Dimensions.get('window');

interface PostData {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  time: string;
  upvotes: number;
  comments: number;
  image?: string;
}

type ApiPost = {
  id: string;
  title: string;
  subreddit: string;
  author: string;
  time: string;
  upvotes: number;
  comments: number;
  image?: string;
  content?: string;
};

interface PostProps {
  post: PostData;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { theme } = useTheme();
  const router = useRouter();
  const [localUpvotes, setLocalUpvotes] = useState<number>(post.upvotes);

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

  const handleVote = async (direction: 'up' | 'down' | 'none') => {
    try {
      const updated = await fetchJson<ApiPost>(`/api/posts/${post.id}/vote`, {
        method: 'POST',
        body: JSON.stringify({ direction }),
      });
      setLocalUpvotes(updated.upvotes);
    } catch {
      // ignore for now
    }
  };

  const formattedVotes = useMemo(() => (localUpvotes >= 1000 ? `${(localUpvotes / 1000).toFixed(1)}k` : `${localUpvotes}`), [localUpvotes]);

  const onOpenDetails = useCallback(() => {
    router.push(`/posts/${post.id}`);
  }, [router, post.id]);

  return (
    <View style={postStyles.postContainer}>
      <View style={postStyles.voteContainer}>
        <Pressable style={postStyles.voteButton} onPress={() => handleVote('up')}>
          <Ionicons name="arrow-up" size={20} color={theme.colors.upvote} />
        </Pressable>
        <Text style={postStyles.voteCount}>{formattedVotes}</Text>
        <Pressable style={postStyles.voteButton} onPress={() => handleVote('down')}>
          <Ionicons name="arrow-down" size={20} color={theme.colors.downvote} />
        </Pressable>
      </View>

      <View style={postStyles.postContent}>
        <Pressable onPress={onOpenDetails} android_ripple={{ color: theme.colors.highlight }}>
          <Text style={postStyles.subreddit}>{post.subreddit}</Text>
          <Text style={postStyles.postTitle}>{post.title}</Text>
          {post.image && (
            <Image source={{ uri: post.image }} style={postStyles.postImage} resizeMode="cover" />
          )}
        </Pressable>
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

// Create Post Modal Component
const CreatePostModal = ({ visible, onClose, onSubmit }: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { title: string; subreddit: string; content: string; type: 'text' | 'image' | 'link' }) => void;
}) => {
  const { theme } = useTheme();
  const [title, setTitle] = useState('');
  const [subreddit, setSubreddit] = useState('');
  const [content, setContent] = useState('');
  const [postType, setPostType] = useState<'text' | 'image' | 'link'>('text');

  const modalStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.lg,
      width: '90%',
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
      color: theme.colors.text,
    },
    closeButton: {
      padding: theme.spacing.xs,
    },
    typeSelector: {
      flexDirection: 'row',
      marginBottom: theme.spacing.lg,
      backgroundColor: theme.colors.backgroundSecondary,
      borderRadius: theme.radii.md,
      padding: theme.spacing.xs,
    },
    typeButton: {
      flex: 1,
      paddingVertical: theme.spacing.sm,
      alignItems: 'center',
      borderRadius: theme.radii.sm,
    },
    typeButtonActive: {
      backgroundColor: theme.colors.primary,
    },
    typeButtonText: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium as any,
    },
    typeButtonTextActive: {
      color: theme.colors.textInverted,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.radii.md,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.md,
      fontSize: theme.typography.sizes.md,
    },
    contentInput: {
      minHeight: 120,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      marginTop: theme.spacing.md,
    },
    submitButtonText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !subreddit.trim()) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    onSubmit({ title: title.trim(), subreddit: subreddit.trim(), content: content.trim(), type: postType });
    setTitle('');
    setSubreddit('');
    setContent('');
    setPostType('text');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.headerTitle}>Create Post</Text>
            <Pressable style={modalStyles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </Pressable>
          </View>

          <View style={modalStyles.typeSelector}>
            <Pressable
              style={[modalStyles.typeButton, postType === 'text' && modalStyles.typeButtonActive]}
              onPress={() => setPostType('text')}
            >
              <Text style={[modalStyles.typeButtonText, postType === 'text' && modalStyles.typeButtonTextActive]}>
                Text
              </Text>
            </Pressable>
            <Pressable
              style={[modalStyles.typeButton, postType === 'image' && modalStyles.typeButtonActive]}
              onPress={() => setPostType('image')}
            >
              <Text style={[modalStyles.typeButtonText, postType === 'image' && modalStyles.typeButtonTextActive]}>
                Image
              </Text>
            </Pressable>
            <Pressable
              style={[modalStyles.typeButton, postType === 'link' && modalStyles.typeButtonActive]}
              onPress={() => setPostType('link')}
            >
              <Text style={[modalStyles.typeButtonText, postType === 'link' && modalStyles.typeButtonTextActive]}>
                Link
              </Text>
            </Pressable>
          </View>

          <TextInput
            style={modalStyles.input}
            value={subreddit}
            onChangeText={setSubreddit}
            placeholder="Choose a community (e.g. r/aww)"
            placeholderTextColor={theme.colors.placeholder}
            autoCapitalize="none"
          />

          <TextInput
            style={modalStyles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Title"
            placeholderTextColor={theme.colors.placeholder}
          />

          {postType === 'text' && (
            <TextInput
              style={[modalStyles.input, modalStyles.contentInput]}
              value={content}
              onChangeText={setContent}
              placeholder="Text (optional)"
              placeholderTextColor={theme.colors.placeholder}
              multiline
            />
          )}

          {postType === 'image' && (
            <TextInput
              style={[modalStyles.input, modalStyles.contentInput]}
              value={content}
              onChangeText={setContent}
              placeholder="Image URL"
              placeholderTextColor={theme.colors.placeholder}
            />
          )}

          {postType === 'link' && (
            <TextInput
              style={[modalStyles.input, modalStyles.contentInput]}
              value={content}
              onChangeText={setContent}
              placeholder="URL"
              placeholderTextColor={theme.colors.placeholder}
            />
          )}

          <TouchableOpacity style={modalStyles.submitButton} onPress={handleSubmit}>
            <Text style={modalStyles.submitButtonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Create Community Modal Component
const CreateCommunityModal = ({ visible, onClose, onSubmit }: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
}) => {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const modalStyles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.lg,
      width: '90%',
      maxHeight: '80%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.md,
    },
    headerTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
      color: theme.colors.text,
    },
    closeButton: {
      padding: theme.spacing.xs,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.radii.md,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.md,
      fontSize: theme.typography.sizes.md,
    },
    descriptionInput: {
      minHeight: 100,
      textAlignVertical: 'top',
    },
    submitButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      marginTop: theme.spacing.md,
    },
    submitButtonText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
    },
  });

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a community name');
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim() });
    setName('');
    setDescription('');
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={modalStyles.modalOverlay}>
        <View style={modalStyles.modalContent}>
          <View style={modalStyles.header}>
            <Text style={modalStyles.headerTitle}>Create Community</Text>
            <Pressable style={modalStyles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
            </Pressable>
          </View>

          <TextInput
            style={modalStyles.input}
            value={name}
            onChangeText={setName}
            placeholder="Community name (e.g. mycommunity)"
            placeholderTextColor={theme.colors.placeholder}
            autoCapitalize="none"
          />

          <TextInput
            style={[modalStyles.input, modalStyles.descriptionInput]}
            value={description}
            onChangeText={setDescription}
            placeholder="Description (optional)"
            placeholderTextColor={theme.colors.placeholder}
            multiline
          />

          <TouchableOpacity style={modalStyles.submitButton} onPress={handleSubmit}>
            <Text style={modalStyles.submitButtonText}>Create Community</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function HomeScreen() {
  const { theme, toggleColorScheme, colorScheme } = useTheme();
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [activeSort, setActiveSort] = useState<'hot' | 'new' | 'top'>('hot');
  const [createPostModalVisible, setCreatePostModalVisible] = useState<boolean>(false);
  const [createCommunityModalVisible, setCreateCommunityModalVisible] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const data = await fetchJson<ApiPost[]>(`/api/posts?sort=${activeSort}`);
        if (!isMounted) return;
        const mapped: PostData[] = data.map((p) => ({
          id: p.id,
          title: p.title,
          subreddit: p.subreddit,
          author: p.author,
          time: p.time,
          upvotes: p.upvotes,
          comments: p.comments,
          image: p.image,
        }));
        setPosts(mapped);
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [activeSort]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const data = await fetchJson<ApiPost[]>(`/api/posts?sort=${activeSort}`);
      const mapped: PostData[] = data.map((p) => ({
        id: p.id,
        title: p.title,
        subreddit: p.subreddit,
        author: p.author,
        time: p.time,
        upvotes: p.upvotes,
        comments: p.comments,
        image: p.image,
      }));
      setPosts(mapped);
    } catch {
      // ignore
    } finally {
      setRefreshing(false);
    }
  }, [activeSort]);

  const handleCreatePost = async (data: { title: string; subreddit: string; content: string; type: 'text' | 'image' | 'link' }) => {
    try {
      const postData: any = {
        title: data.title,
        subreddit: data.subreddit,
        content: data.content,
      };

      if (data.type === 'image' && data.content) {
        postData.image = data.content;
      }

      const created = await fetchJson<ApiPost>(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify(postData)
      });

      setPosts((prev) => ([
        {
          id: created.id,
          title: created.title,
          subreddit: created.subreddit,
          author: created.author,
          time: created.time,
          upvotes: created.upvotes,
          comments: created.comments,
          image: created.image,
        },
        ...prev,
      ]));
      setCreatePostModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    }
  };

  const handleCreateCommunity = async (data: { name: string; description: string }) => {
    try {
      // This would typically call a backend endpoint to create a community
      Alert.alert('Success', `Community r/${data.name} created successfully!`);
      setCreateCommunityModalVisible(false);
    } catch (error) {
      Alert.alert('Error', 'Failed to create community');
    }
  };

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
    themeButton: {
      padding: theme.spacing.xs,
      marginLeft: theme.spacing.xs,
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
      paddingBottom: Platform.OS === 'android' ? 60 : 0,
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
    skeletonCard: {
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    skeletonLine: {
      height: 14,
      backgroundColor: theme.colors.highlight,
      borderRadius: theme.radii.sm,
      marginBottom: theme.spacing.sm,
    } as ViewStyle,
    fab: {
      position: 'absolute',
      right: theme.spacing.lg,
      bottom: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      width: 56,
      height: 56,
      borderRadius: theme.radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      ...theme.shadows.md,
    } as ViewStyle,
    fabIcon: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold as any,
    } as TextStyle,
    quickActions: {
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      backgroundColor: theme.colors.background,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    quickActionButton: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.backgroundSecondary,
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radii.md,
      marginHorizontal: theme.spacing.xs,
    } as ViewStyle,
    quickActionText: {
      marginLeft: theme.spacing.xs,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium as any,
      color: theme.colors.text,
    } as TextStyle,
  });

  const Header = () => (
    <View>
      <View style={styles.header}>
        <Pressable>
          <Image
            source={{ uri: 'https://www.redditstatic.com/desktop2x/img/favicon/android-icon-192x192.png' }}
            style={styles.logo}
          />
        </Pressable>
        <Pressable style={styles.searchBar} onPress={() => router.push('/home/search')}>
          <Feather name="search" size={18} color={theme.colors.placeholder} />
          <Text style={styles.searchText}>Search Reddit</Text>
        </Pressable>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Pressable style={styles.profileButton} onPress={() => router.push('/home/profile')}>
            <FontAwesome name="user-circle" size={24} color={theme.colors.textSecondary} />
          </Pressable>
          <Pressable style={styles.themeButton} onPress={() => toggleColorScheme()}>
            <Ionicons name={colorScheme === 'dark' ? 'sunny-outline' : 'moon'} size={22} color={theme.colors.textSecondary} />
          </Pressable>
        </View>
      </View>

      <View style={styles.quickActions}>
        <Pressable 
          style={styles.quickActionButton}
          onPress={() => setCreatePostModalVisible(true)}
        >
          <MaterialIcons name="add" size={18} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>Create Post</Text>
        </Pressable>
        <Pressable 
          style={styles.quickActionButton}
          onPress={() => setCreateCommunityModalVisible(true)}
        >
          <MaterialIcons name="group-add" size={18} color={theme.colors.primary} />
          <Text style={styles.quickActionText}>Create Community</Text>
        </Pressable>
      </View>

      <View style={styles.sortBar}>
        <Pressable style={[styles.sortButton, activeSort === 'hot' && styles.sortButtonActive]} onPress={() => setActiveSort('hot')}>
          <Ionicons name="flame" size={18} color={theme.colors.primary} />
          <Text style={[styles.sortText, activeSort === 'hot' && styles.sortTextActive]}>Hot</Text>
        </Pressable>
        <Pressable style={[styles.sortButton, activeSort === 'new' && styles.sortButtonActive]} onPress={() => setActiveSort('new')}>
          <Ionicons name="timer-outline" size={18} color={theme.colors.textSecondary} />
          <Text style={[styles.sortText, activeSort === 'new' && styles.sortTextActive]}>New</Text>
        </Pressable>
        <Pressable style={[styles.sortButton, activeSort === 'top' && styles.sortButtonActive]} onPress={() => setActiveSort('top')}>
          <Ionicons name="trending-up-outline" size={18} color={theme.colors.textSecondary} />
          <Text style={[styles.sortText, activeSort === 'top' && styles.sortTextActive]}>Top</Text>
        </Pressable>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: PostData }) => <Post post={item} />;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {loading ? (
          <View style={styles.postsContainer}>
            <Header />
            {[...Array(5)].map((_, idx) => (
              <View key={idx} style={styles.skeletonCard}>
                <View style={[styles.skeletonLine, { width: '30%' }]} />
                <View style={[styles.skeletonLine, { width: '90%', height: 18 }]} />
                <View style={[styles.skeletonLine, { width: '80%' }]} />
                <View style={[styles.skeletonLine, { width: '60%' }]} />
              </View>
            ))}
          </View>
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            style={styles.postsContainer}
            ListHeaderComponent={<Header />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: theme.spacing.lg }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.colors.textSecondary} />}
          />
        )}
        
        <CreatePostModal
          visible={createPostModalVisible}
          onClose={() => setCreatePostModalVisible(false)}
          onSubmit={handleCreatePost}
        />
        
        <CreateCommunityModal
          visible={createCommunityModalVisible}
          onClose={() => setCreateCommunityModalVisible(false)}
          onSubmit={handleCreateCommunity}
        />
      </View>
    </SafeAreaView>
  );
}
