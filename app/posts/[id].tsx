import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import { fetchJson } from "../lib/api";
import { useTheme } from "../theme/ThemeProvider";

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

type ApiComment = {
  id: string;
  postId: string;
  author: string;
  content: string;
  time: string;
  votes: number;
};

export default function PostDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<ApiPost | null>(null);
  const [comments, setComments] = useState<ApiComment[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    if (!id) return;
    let isMounted = true;
    const load = async () => {
      try {
        const [p, c] = await Promise.all([
          fetchJson<ApiPost>(`/api/posts/${id}`),
          fetchJson<ApiComment[]>(`/api/posts/${id}/comments`),
        ]);
        if (!isMounted) return;
        setPost(p);
        setComments(c);
      } catch {
        setPost(null);
        setComments([]);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const styles = useMemo(() => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: theme.colors.background,
    },
    post: {
      marginBottom: 20,
    },
    community: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
    },
    title: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.semibold as any,
      marginVertical: 5,
      color: theme.colors.text,
      lineHeight: theme.typography.sizes.xl * 1.3,
    },
    content: {
      fontSize: theme.typography.sizes.md,
      marginBottom: 10,
      color: theme.colors.text,
      lineHeight: theme.typography.sizes.md * 1.5,
    },
    image: {
      width: '100%',
      height: 300,
      resizeMode: 'cover',
      borderRadius: theme.radii.sm,
      marginVertical: 10,
    },
    postFooter: {
      flexDirection: 'row',
      marginTop: 5,
    },
    author: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
      marginRight: 10,
    },
    time: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
    },
    commentsTitle: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
      marginBottom: 10,
      color: theme.colors.text,
    },
    comment: {
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    commentAuthor: {
      fontWeight: theme.typography.weights.semibold as any,
      marginBottom: 5,
      color: theme.colors.text,
    },
    commentContent: {
      marginBottom: 5,
      color: theme.colors.text,
    },
    commentFooter: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.sizes.xs,
    },
  }), [theme]);

  if (!post) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView style={styles.container}>
          <Text style={{ color: theme.colors.text }}>Loading…</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.post}>
          <Text style={styles.community}>{post.subreddit}</Text>
          <Text style={styles.title}>{post.title}</Text>
          {post.content ? <Text style={styles.content}>{post.content}</Text> : null}
          {post.image && (
            <Image source={{ uri: post.image }} style={styles.image} />
          )}
          <View style={styles.postFooter}>
            <Text style={styles.author}>{post.author}</Text>
            <Text style={styles.time}>{post.time}</Text>
          </View>
        </View>

        <Text style={styles.commentsTitle}>{post.comments} Comments</Text>
        
        {comments.map(comment => (
          <View key={comment.id} style={styles.comment}>
            <Text style={styles.commentAuthor}>{comment.author}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
            <Text style={styles.commentFooter}>{comment.time} • {comment.votes} votes</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
 