import { StyleSheet } from 'react-native';
import { Colors } from './colors';

export const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  card: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginVertical: 6,
    marginHorizontal: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 22,
  },
});