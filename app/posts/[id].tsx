import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { fetchJson } from "../lib/api";

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
      } catch (_e) {
        setPost(null);
        setComments([]);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (!post) {
    return (
      <ScrollView style={styles.container}>
        <Text>Loading…</Text>
      </ScrollView>
    );
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  post: {
    marginBottom: 20,
  },
  community: {
    color: '#787c7e',
    fontSize: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginVertical: 5,
    color: '#222',
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1c1c1c',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 5,
    marginVertical: 10,
  },
  postFooter: {
    flexDirection: 'row',
    marginTop: 5,
  },
  author: {
    color: '#787c7e',
    fontSize: 12,
    marginRight: 10,
  },
  time: {
    color: '#787c7e',
    fontSize: 12,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1b',
  },
  comment: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#edeff1',
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1a1a1b',
  },
  commentContent: {
    marginBottom: 5,
    color: '#1c1c1c',
  },
  commentFooter: {
    color: '#787c7e',
    fontSize: 12,
  },
});