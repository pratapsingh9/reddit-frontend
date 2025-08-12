import { ScrollView, View } from 'react-native';
import PostCard from './components/PostCard';
import { Styles } from './constants/styles';
import Header from './components/Header';

export default function HomeScreen() {
  const posts = [
    {
      id: '1',
      title: 'Just adopted this cute puppy!',
      author: 'petlover42',
      community: 'aww',
      votes: 1245,
      comments: 243,
      time: '4h ago',
      image: 'https://i.imgur.com/J5UOR2Q.jpg',
    },
    {
      id: '2',
      title: 'What programming language should I learn in 2023?',
      author: 'code_newbie',
      community: 'learnprogramming',
      votes: 892,
      comments: 417,
      time: '8h ago',
    },
    {
      id: '3',
      title: 'The sunset tonight was absolutely breathtaking',
      author: 'nature_lover',
      community: 'pics',
      votes: 24567,
      comments: 843,
      time: '5h ago',
      image: 'https://i.imgur.com/7W7WQj1.jpg',
    },
  ];

  return (
    <View style={Styles.container}>
      <Header />
      <ScrollView>
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            author={post.author}
            community={post.community}
            votes={post.votes}
            comments={post.comments}
            time={post.time}
            image={post.image}
          />
        ))}
      </ScrollView>
    </View>
  );
}