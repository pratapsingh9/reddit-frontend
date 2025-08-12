import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/app/constants/colors';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>VocalPoint</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    padding: 15,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});