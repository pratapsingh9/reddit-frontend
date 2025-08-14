import { Feather } from '@expo/vector-icons';
import React, { useMemo, useState } from 'react';
import { Platform, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export default function SearchScreen() {
  const { theme } = useTheme();
  const [query, setQuery] = useState('');

  const styles = useMemo(() => StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    container: { flex: 1, backgroundColor: theme.colors.background, padding: theme.spacing.md },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radii.full,
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.sm,
    },
    input: { flex: 1, color: theme.colors.text, marginLeft: theme.spacing.sm },
    hint: { color: theme.colors.textSecondary, marginTop: theme.spacing.md },
  }), [theme]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <Feather name="search" size={18} color={theme.colors.placeholder} />
          <TextInput
            style={styles.input}
            placeholder="Search communities and posts"
            placeholderTextColor={theme.colors.placeholder}
            value={query}
            onChangeText={setQuery}
            autoFocus
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery('')}>
              <Feather name="x" size={18} color={theme.colors.textSecondary} />
            </Pressable>
          )}
        </View>
        <Text style={styles.hint}>Type to search…</Text>
      </View>
    </SafeAreaView>
  );
}


