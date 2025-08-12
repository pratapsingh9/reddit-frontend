import { View, Text } from 'react-native';
import { useLocalSearchParams } from "expo-router";

export default function User() {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>User {id}</Text>
        </View>
    )
}