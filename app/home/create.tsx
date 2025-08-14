import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function CreatePostScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subreddit, setSubreddit] = useState('r/general');

  const styles = useMemo(() => StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    inner: { padding: theme.spacing.lg },
    label: { color: theme.colors.textSecondary, marginBottom: theme.spacing.xs },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: theme.radii.md,
      color: theme.colors.text,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
    textarea: {
      minHeight: 150,
      textAlignVertical: 'top',
    },
    row: { flexDirection: 'row', justifyContent: 'flex-end', gap: theme.spacing.md },
    button: {
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.md,
      borderRadius: theme.radii.lg,
      backgroundColor: theme.colors.primary,
    },
    buttonText: { color: theme.colors.textInverted, fontWeight: '600' as any },
    cancel: { backgroundColor: theme.colors.backgroundSecondary, borderWidth: 1, borderColor: theme.colors.border },
    cancelText: { color: theme.colors.text },
    titleText: { color: theme.colors.text, fontSize: theme.typography.sizes.lg, fontWeight: '600' as any, marginBottom: theme.spacing.md },
  }), [theme]);

  const onSubmit = () => {
    // In this demo seed backend we don't have create endpoint; pop back
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.inner}>
      <Text style={styles.titleText}>Create a post</Text>
      <Text style={styles.label}>Community</Text>
      <TextInput style={styles.input} value={subreddit} onChangeText={setSubreddit} />

      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="What do you want to talk about?" placeholderTextColor={theme.colors.placeholder} />

      <Text style={styles.label}>Body</Text>
      <TextInput style={[styles.input, styles.textarea]} multiline value={content} onChangeText={setContent} placeholder="Write your post..." placeholderTextColor={theme.colors.placeholder} />

      <View style={styles.row}>
        <Pressable style={[styles.button, styles.cancel]} onPress={() => router.back()}>
          <Text style={styles.cancelText}>Cancel</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Post</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}


