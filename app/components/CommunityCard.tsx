// app/components/CommunityCard.tsx
import { View, Text, Image, Pressable, StyleSheet } from "react-native";

interface CommunityCardProps {
  community: {
    name: string;
    members: string;
    icon?: string;
  };
  onPress?: () => void;
}

export default function CommunityCard({ community, onPress }: CommunityCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        {community.icon ? (
          <Image source={{ uri: community.icon }} style={styles.icon} />
        ) : (
          <View style={[styles.icon, styles.defaultIcon]}>
            <Text style={styles.defaultIconText}>
              {community.name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}
        <Text style={styles.name} numberOfLines={1}>
          {community.name}
        </Text>
        <Text style={styles.members}>{community.members} members</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  content: {
    padding: 12,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  defaultIcon: {
    backgroundColor: '#ff4500',
    justifyContent: 'center',
    alignItems: 'center',
  },
  defaultIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
    color: '#1a1a1b',
    width: '100%',
    textAlign: 'center',
  },
  members: {
    fontSize: 12,
    color: '#787c7e',
  },
});