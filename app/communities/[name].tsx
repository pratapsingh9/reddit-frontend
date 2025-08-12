import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import PostCard from "@/app/components/PostCard";

export default function CommunityPage() {
  const community = {
    name: "r/AskSpeakEasy",
    members: "4.2m",
    description: "Ask questions and get answers from the SpeakEasy community",
    icon: "https://i.imgur.com/zqpwkLQ.png"
  };

  const posts:any = [
    // Community-specific posts
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: community.icon }} style={styles.icon} />
        <Text style={styles.name}>{community.name}</Text>
        <Text style={styles.members}>{community.members} members</Text>
        <Text style={styles.description}>{community.description}</Text>
      </View>

      {posts.map((post:any) => (
        <PostCard key={post.id} post={post} onPress={undefined} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#edeff1',
    alignItems: 'center',
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  members: {
    color: '#787c7e',
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    color: '#1c1c1c',
  },
});