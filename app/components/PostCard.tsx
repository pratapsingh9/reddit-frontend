import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';
import { Styles } from '../constants/styles';


interface PostCardProps {
  title: string;
  author: string;
  community: string;
  votes: number;
  comments: number;
  time: string;
  image?: string;
  onPress?: () => void;
}

export default function PostCard({
  title,
  author,
  community,
  votes,
  comments,
  time,
  image,
  onPress,
}: PostCardProps) {
  return (
    <Pressable onPress={onPress} style={Styles.card}>
      <View style={styles.header}>
        <Text style={styles.community}>r/{community}</Text>
        <Text style={styles.author}>• Posted by u/{author} {time}</Text>
      </View>
      
      <Text style={styles.title}>{title}</Text>
      
      {image && (
        <Image source={{ uri: image }} style={styles.image} />
      )}
      
      <View style={styles.footer}>
        <View style={styles.voteContainer}>
          <Text style={styles.upvote}>▲</Text>
          <Text style={styles.voteCount}>{votes}</Text>
          <Text style={styles.downvote}>▼</Text>
        </View>
        <Text style={styles.comments}>{comments} comments</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  community: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
  author: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginLeft: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 4,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  upvote: {
    color: Colors.upvote,
    marginRight: 5,
  },
  downvote: {
    color: Colors.downvote,
    marginLeft: 5,
  },
  voteCount: {
    color: Colors.text,
    fontWeight: 'bold',
    fontSize: 12,
  },
  comments: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});