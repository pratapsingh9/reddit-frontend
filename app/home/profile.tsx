import React, { useMemo, useState } from 'react';
import { 
  Image, 
  Platform, 
  Pressable, 
  SafeAreaView, 
  ScrollView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  View, 
  ViewStyle,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { Ionicons, Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeProvider';
import { useRouter } from 'expo-router';

interface UserPost {
  id: string;
  title: string;
  subreddit: string;
  upvotes: number;
  comments: number;
  time: string;
}

interface UserComment {
  id: string;
  content: string;
  postTitle: string;
  subreddit: string;
  upvotes: number;
  time: string;
}

export default function ProfileScreen() {
  const { theme, toggleColorScheme, colorScheme } = useTheme();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'posts' | 'comments' | 'upvoted'>('posts');
  const [editProfileModal, setEditProfileModal] = useState(false);
  const [bio, setBio] = useState('Bio goes here. Say a little something about yourself.');
  const [displayName, setDisplayName] = useState('u/you');

  const userStats = {
    karma: 1234,
    posts: 15,
    comments: 89,
    awards: 7,
    joinDate: '2024',
  };

  const userPosts: UserPost[] = [
    {
      id: '1',
      title: 'Just adopted this little guy today! Meet Max!',
      subreddit: 'r/aww',
      upvotes: 12300,
      comments: 842,
      time: '5h ago',
    },
    {
      id: '2',
      title: 'My homemade pizza from last night',
      subreddit: 'r/food',
      upvotes: 5600,
      comments: 312,
      time: '3h ago',
    },
    {
      id: '3',
      title: 'TIL that honey never spoils',
      subreddit: 'r/todayilearned',
      upvotes: 24700,
      comments: 1200,
      time: '8h ago',
    },
  ];

  const userComments: UserComment[] = [
    {
      id: '1',
      content: 'This is absolutely adorable! What breed is he?',
      postTitle: 'Just adopted this little guy today! Meet Max!',
      subreddit: 'r/aww',
      upvotes: 42,
      time: '3h ago',
    },
    {
      id: '2',
      content: 'That looks delicious! Can you share the recipe?',
      postTitle: 'My homemade pizza from last night',
      subreddit: 'r/food',
      upvotes: 15,
      time: '2h ago',
    },
  ];

  const styles = useMemo(() => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    } as ViewStyle,
    container: { 
      flex: 1, 
      backgroundColor: theme.colors.background 
    } as ViewStyle,
    header: {
      alignItems: 'center',
      paddingVertical: theme.spacing.xl,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    avatar: { 
      width: 96, 
      height: 96, 
      borderRadius: theme.radii.full, 
      marginBottom: theme.spacing.md 
    } as ViewStyle,
    username: { 
      color: theme.colors.text, 
      fontSize: theme.typography.sizes.xl, 
      fontWeight: '700' as any,
      marginBottom: theme.spacing.xs,
    } as ViewStyle,
    meta: { 
      color: theme.colors.textSecondary, 
      marginTop: theme.spacing.xs,
      fontSize: theme.typography.sizes.sm,
    } as ViewStyle,
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    statItem: {
      alignItems: 'center',
    } as ViewStyle,
    statValue: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
    } as ViewStyle,
    statLabel: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      marginTop: theme.spacing.xs,
    } as ViewStyle,
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    tab: {
      flex: 1,
      paddingVertical: theme.spacing.md,
      alignItems: 'center',
    } as ViewStyle,
    tabActive: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    } as ViewStyle,
    tabText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.medium as any,
    } as ViewStyle,
    tabTextActive: {
      color: theme.colors.primary,
      fontWeight: theme.typography.weights.semibold as any,
    } as ViewStyle,
    contentContainer: {
      flex: 1,
    } as ViewStyle,
    postItem: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    postTitle: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.medium as any,
      marginBottom: theme.spacing.xs,
    } as ViewStyle,
    postMeta: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      marginBottom: theme.spacing.xs,
    } as ViewStyle,
    postStats: {
      flexDirection: 'row',
      alignItems: 'center',
    } as ViewStyle,
    postStat: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: theme.spacing.md,
    } as ViewStyle,
    postStatText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      marginLeft: theme.spacing.xs,
    } as ViewStyle,
    commentItem: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    commentContent: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
      marginBottom: theme.spacing.sm,
    } as ViewStyle,
    commentContext: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
      fontStyle: 'italic',
      marginBottom: theme.spacing.xs,
    } as ViewStyle,
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      paddingVertical: theme.spacing.md,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
    } as ViewStyle,
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
      borderRadius: theme.radii.md,
      backgroundColor: theme.colors.backgroundSecondary,
    } as ViewStyle,
    actionButtonText: {
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
      fontSize: theme.typography.sizes.sm,
    } as ViewStyle,
    editButton: {
      marginTop: theme.spacing.lg,
      alignSelf: 'flex-start',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.full,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
    } as ViewStyle,
    editButtonText: { 
      color: theme.colors.text 
    } as ViewStyle,
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    } as ViewStyle,
    modalContent: {
      backgroundColor: theme.colors.background,
      borderRadius: theme.radii.lg,
      padding: theme.spacing.lg,
      width: '90%',
      maxHeight: '80%',
    } as ViewStyle,
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      paddingBottom: theme.spacing.md,
    } as ViewStyle,
    modalTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
      color: theme.colors.text,
    } as ViewStyle,
    closeButton: {
      padding: theme.spacing.xs,
    } as ViewStyle,
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
    } as ViewStyle,
    bioInput: {
      minHeight: 100,
      textAlignVertical: 'top',
    } as ViewStyle,
    saveButton: {
      backgroundColor: theme.colors.primary,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      alignItems: 'center',
      marginTop: theme.spacing.md,
    } as ViewStyle,
    saveButtonText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
    } as ViewStyle,
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.xl,
    } as ViewStyle,
    emptyStateIcon: {
      fontSize: 64,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.lg,
    } as ViewStyle,
    emptyStateText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.lg,
      textAlign: 'center',
    } as ViewStyle,
  }), [theme]);

  const renderPost = ({ item }: { item: UserPost }) => (
    <View style={styles.postItem}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postMeta}>r/{item.subreddit} • {item.time}</Text>
      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Ionicons name="arrow-up" size={14} color={theme.colors.upvote} />
          <Text style={styles.postStatText}>{item.upvotes}</Text>
        </View>
        <View style={styles.postStat}>
          <Feather name="message-square" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
      </View>
    </View>
  );

  const renderComment = ({ item }: { item: UserComment }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentContent}>{item.content}</Text>
      <Text style={styles.commentContext}>on "{item.postTitle}" in r/{item.subreddit}</Text>
      <View style={styles.postStats}>
        <View style={styles.postStat}>
          <Ionicons name="arrow-up" size={14} color={theme.colors.upvote} />
          <Text style={styles.postStatText}>{item.upvotes}</Text>
        </View>
        <Text style={styles.postStatText}>• {item.time}</Text>
      </View>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'posts':
        return userPosts.length > 0 ? (
          <FlatList
            data={userPosts}
            keyExtractor={(item) => item.id}
            renderItem={renderPost}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="document-text-outline" style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No posts yet</Text>
          </View>
        );
      case 'comments':
        return userComments.length > 0 ? (
          <FlatList
            data={userComments}
            keyExtractor={(item) => item.id}
            renderItem={renderComment}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No comments yet</Text>
          </View>
        );
      case 'upvoted':
        return (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No upvoted content</Text>
          </View>
        );
      default:
        return null;
    }
  };

  const handleSaveProfile = () => {
    setEditProfileModal(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: theme.spacing.xl }}>
        <View style={styles.header}>
          <Image source={{ uri: 'https://i.pravatar.cc/200' }} style={styles.avatar} />
          <Text style={styles.username}>{displayName}</Text>
          <Text style={styles.meta}>Joined {userStats.joinDate} • {userStats.karma} karma</Text>
          <TouchableOpacity style={styles.editButton} onPress={() => setEditProfileModal(true)}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.karma}</Text>
            <Text style={styles.statLabel}>Karma</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.posts}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.comments}</Text>
            <Text style={styles.statLabel}>Comments</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{userStats.awards}</Text>
            <Text style={styles.statLabel}>Awards</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.tabActive]}
            onPress={() => setActiveTab('posts')}
          >
            <Text style={[styles.tabText, activeTab === 'posts' && styles.tabTextActive]}>Posts</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'comments' && styles.tabActive]}
            onPress={() => setActiveTab('comments')}
          >
            <Text style={[styles.tabText, activeTab === 'comments' && styles.tabTextActive]}>Comments</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'upvoted' && styles.tabActive]}
            onPress={() => setActiveTab('upvoted')}
          >
            <Text style={[styles.tabText, activeTab === 'upvoted' && styles.tabTextActive]}>Upvoted</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {renderContent()}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={() => toggleColorScheme()}>
            <Ionicons name={colorScheme === 'dark' ? 'sunny-outline' : 'moon'} size={20} color={theme.colors.text} />
            <Text style={styles.actionButtonText}>Theme</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/home/notifications')}>
            <Ionicons name="notifications-outline" size={20} color={theme.colors.text} />
            <Text style={styles.actionButtonText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => Alert.alert('Settings', 'Settings screen would open here')}>
            <Ionicons name="settings-outline" size={20} color={theme.colors.text} />
            <Text style={styles.actionButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={editProfileModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setEditProfileModal(false)}>
                <Ionicons name="close" size={24} color={theme.colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholder="Display name"
              placeholderTextColor={theme.colors.placeholder}
            />

            <TextInput
              style={[styles.input, styles.bioInput]}
              value={bio}
              onChangeText={setBio}
              placeholder="Bio"
              placeholderTextColor={theme.colors.placeholder}
              multiline
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}


