import React, { useEffect, useState, useRef } from 'react';
import { 
  FlatList, 
  Platform, 
  SafeAreaView, 
  StatusBar, 
  StyleSheet, 
  Text, 
  TextStyle, 
  View, 
  ViewStyle,
  TextInput,
  Pressable,
  Image,
  ImageStyle,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { connectPresenceWebSocket } from '../lib/api';
import { useTheme } from '../theme/ThemeProvider';
import { useRouter } from 'expo-router';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

interface Conversation {
  id: string;
  user: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  avatar?: string;
}

export default function MessagesScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  
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
      marginBottom: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    text: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold as any,
    } as TextStyle,
    subtitle: { 
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
    } as TextStyle,
    conversationItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
      paddingHorizontal: theme.spacing.lg,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    } as ViewStyle,
    avatar: {
      width: 50,
      height: 50,
      borderRadius: theme.radii.full,
      marginRight: theme.spacing.md,
    } as ImageStyle,
    conversationContent: {
      flex: 1,
    } as ViewStyle,
    conversationName: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
      marginBottom: theme.spacing.xs,
    } as TextStyle,
    conversationLastMessage: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.sm,
    } as TextStyle,
    conversationTime: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      marginTop: theme.spacing.xs,
    } as TextStyle,
    unreadBadge: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radii.full,
      minWidth: 20,
      height: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: theme.spacing.sm,
    } as ViewStyle,
    unreadText: {
      color: theme.colors.textInverted,
      fontSize: theme.typography.sizes.xs,
      fontWeight: theme.typography.weights.bold as any,
    } as TextStyle,
    chatContainer: {
      flex: 1,
    } as ViewStyle,
    chatHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    backButton: {
      marginRight: theme.spacing.md,
      padding: theme.spacing.xs,
    } as ViewStyle,
    chatUserInfo: {
      flex: 1,
    } as ViewStyle,
    chatUserName: {
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
      fontWeight: theme.typography.weights.semibold as any,
    } as TextStyle,
    chatUserStatus: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
    } as TextStyle,
    messagesContainer: {
      flex: 1,
      paddingHorizontal: theme.spacing.md,
    } as ViewStyle,
    messageItem: {
      marginVertical: theme.spacing.xs,
      maxWidth: '80%',
    } as ViewStyle,
    messageOwn: {
      alignSelf: 'flex-end',
    } as ViewStyle,
    messageOther: {
      alignSelf: 'flex-start',
    } as ViewStyle,
    messageBubble: {
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.radii.lg,
    } as ViewStyle,
    messageBubbleOwn: {
      backgroundColor: theme.colors.primary,
    } as ViewStyle,
    messageBubbleOther: {
      backgroundColor: theme.colors.backgroundSecondary,
    } as ViewStyle,
    messageText: {
      fontSize: theme.typography.sizes.md,
    } as TextStyle,
    messageTextOwn: {
      color: theme.colors.textInverted,
    } as TextStyle,
    messageTextOther: {
      color: theme.colors.text,
    } as TextStyle,
    messageTime: {
      fontSize: theme.typography.sizes.xs,
      marginTop: theme.spacing.xs,
      opacity: 0.7,
    } as TextStyle,
    messageTimeOwn: {
      color: theme.colors.textInverted,
      textAlign: 'right',
    } as TextStyle,
    messageTimeOther: {
      color: theme.colors.textSecondary,
    } as TextStyle,
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.background,
    } as ViewStyle,
    messageInput: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.radii.full,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginRight: theme.spacing.sm,
      color: theme.colors.text,
      fontSize: theme.typography.sizes.md,
    } as ViewStyle,
    sendButton: {
      backgroundColor: theme.colors.primary,
      width: 40,
      height: 40,
      borderRadius: theme.radii.full,
      alignItems: 'center',
      justifyContent: 'center',
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
      marginBottom: theme.spacing.sm,
    } as TextStyle,
    emptyStateSubtext: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.md,
      textAlign: 'center',
    } as TextStyle,
    newMessageButton: {
      position: 'absolute',
      right: theme.spacing.lg,
      bottom: theme.spacing.lg,
      backgroundColor: theme.colors.primary,
      width: 56,
      height: 56,
      borderRadius: theme.radii.full,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    } as ViewStyle,
  });

  // Mock conversations data
  useEffect(() => {
    const mockConversations: Conversation[] = [
      {
        id: '1',
        user: 'u/johndoe',
        lastMessage: 'Hey, how are you doing?',
        timestamp: '2m ago',
        unreadCount: 2,
        avatar: 'https://i.pravatar.cc/150?img=1',
      },
      {
        id: '2',
        user: 'u/janesmith',
        lastMessage: 'Thanks for the help!',
        timestamp: '1h ago',
        unreadCount: 0,
        avatar: 'https://i.pravatar.cc/150?img=2',
      },
      {
        id: '3',
        user: 'u/mikebrown',
        lastMessage: 'Did you see the new post?',
        timestamp: '3h ago',
        unreadCount: 1,
        avatar: 'https://i.pravatar.cc/150?img=3',
      },
    ];
    setConversations(mockConversations);
  }, []);

  // Mock messages data
  const loadMessages = (conversationId: string) => {
    const mockMessages: Message[] = [
      {
        id: '1',
        sender: 'u/johndoe',
        content: 'Hey, how are you doing?',
        timestamp: '2:30 PM',
        isOwn: false,
      },
      {
        id: '2',
        sender: 'u/you',
        content: 'I\'m doing great! How about you?',
        timestamp: '2:31 PM',
        isOwn: true,
      },
      {
        id: '3',
        sender: 'u/johndoe',
        content: 'Pretty good! Just wanted to check in.',
        timestamp: '2:32 PM',
        isOwn: false,
      },
      {
        id: '4',
        sender: 'u/you',
        content: 'That\'s nice of you!',
        timestamp: '2:33 PM',
        isOwn: true,
      },
    ];
    setMessages(mockMessages);
  };

  useEffect(() => {
    const socket = connectPresenceWebSocket();
    if (!socket) return;
    const onMessage = (event: MessageEvent) => {
      try {
        const payload = JSON.parse(String(event.data));
        if (payload.type === 'presence') {
          setOnlineUsers(payload.users ?? []);
          setCount(payload.online ?? 0);
        }
      } catch {}
    };
    socket.addEventListener('message', onMessage as any);
    return () => {
      socket.removeEventListener('message', onMessage as any);
    };
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'u/you',
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    
    // Scroll to bottom
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const openConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation.id);
    setShowChat(true);
    
    // Mark as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={[styles.messageItem, item.isOwn ? styles.messageOwn : styles.messageOther]}>
      <View style={[
        styles.messageBubble,
        item.isOwn ? styles.messageBubbleOwn : styles.messageBubbleOther
      ]}>
        <Text style={[
          styles.messageText,
          item.isOwn ? styles.messageTextOwn : styles.messageTextOther
        ]}>
          {item.content}
        </Text>
        <Text style={[
          styles.messageTime,
          item.isOwn ? styles.messageTimeOwn : styles.messageTimeOther
        ]}>
          {item.timestamp}
        </Text>
      </View>
    </View>
  );

  const renderConversation = ({ item }: { item: Conversation }) => (
    <TouchableOpacity 
      style={styles.conversationItem}
      onPress={() => openConversation(item)}
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.conversationContent}>
        <Text style={styles.conversationName}>{item.user}</Text>
        <Text style={styles.conversationLastMessage}>{item.lastMessage}</Text>
        <Text style={styles.conversationTime}>{item.timestamp}</Text>
      </View>
      {item.unreadCount > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{item.unreadCount}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (showChat && selectedConversation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          style={styles.container} 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.chatHeader}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setShowChat(false)}
            >
              <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
            </TouchableOpacity>
            <Image source={{ uri: selectedConversation.avatar }} style={styles.avatar} />
            <View style={styles.chatUserInfo}>
              <Text style={styles.chatUserName}>{selectedConversation.user}</Text>
              <Text style={styles.chatUserStatus}>Online</Text>
            </View>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          />

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              value={newMessage}
              onChangeText={setNewMessage}
              placeholder="Type a message..."
              placeholderTextColor={theme.colors.placeholder}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
              disabled={!newMessage.trim()}
            >
              <Ionicons 
                name="send" 
                size={20} 
                color={newMessage.trim() ? theme.colors.textInverted : theme.colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.text}>Messages</Text>
          <Text style={styles.subtitle}>{count} online</Text>
        </View>
        
        {conversations.length > 0 ? (
          <FlatList
            data={conversations}
            keyExtractor={(item) => item.id}
            renderItem={renderConversation}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="chatbubbles-outline" style={styles.emptyStateIcon} />
            <Text style={styles.emptyStateText}>No conversations yet</Text>
            <Text style={styles.emptyStateSubtext}>
              Start a conversation with other users to see messages here
            </Text>
          </View>
        )}

        <TouchableOpacity 
          style={styles.newMessageButton}
          onPress={() => Alert.alert('New Message', 'This would open a new message composer')}
        >
          <Ionicons name="add" size={24} color={theme.colors.textInverted} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

