import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

export default function PostDetail() {
  // In a real app, you would get the post data from the route params
  const post = {
    id: "1",
    title: "Just adopted this cute puppy!",
    author: "petlover42",
    community: "r/aww",
    content: "After months of waiting, I finally got to bring this little guy home. Meet Max!",
    votes: 1245,
    comments: 243,
    time: "4h",
    image: "https://i.imgur.com/J5UOR2Q.jpg"
  };

  const comments = [
    {
      id: "1",
      author: "dogenthusiast",
      content: "So adorable! What breed is he?",
      time: "3h",
      votes: 42
    },
    // More comments...
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.post}>
        <Text style={styles.community}>r/{post.community}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.content}>{post.content}</Text>
        {post.image && (
          <Image source={{ uri: post.image }} style={styles.image} />
        )}
        <View style={styles.postFooter}>
          <Text style={styles.author}>u/{post.author}</Text>
          <Text style={styles.time}>{post.time}</Text>
        </View>
      </View>

      <Text style={styles.commentsTitle}>{post.comments} Comments</Text>
      
      {comments.map(comment => (
        <View key={comment.id} style={styles.comment}>
          <Text style={styles.commentAuthor}>u/{comment.author}</Text>
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