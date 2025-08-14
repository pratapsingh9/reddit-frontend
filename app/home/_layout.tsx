import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider"; // Adjust the import path as needed

export default function TabLayout() {
  const { theme } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      initialRouteName="explore"
      screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          paddingBottom:
            (Platform.OS === "ios" ? theme.spacing.md : theme.spacing.sm) + insets.bottom + 8,
          paddingTop: theme.spacing.sm,
          height: (Platform.OS === "ios" ? 85 : 60) + insets.bottom + 8,
            ...theme.shadows.sm,
          },
          tabBarLabelStyle: {
            fontSize: theme.typography.sizes.xs,
            fontWeight: "500",
            marginTop: theme.spacing.xxs,
          },
          headerShown: false,
          tabBarHideOnKeyboard: true,
          // Add a subtle animation
          animation: "shift",
        }}
      >
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: "Messages",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "chatbubble" : "chatbubble-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        {/* Hide everything else in this folder from the tab bar */}
        <Tabs.Screen name="index" options={{ href: null }} />
        <Tabs.Screen name="main" options={{ href: null }} />
        <Tabs.Screen name="notifications" options={{ href: null }} />
        <Tabs.Screen name="search" options={{ href: null }} />
        <Tabs.Screen name="create" options={{ href: null }} />
      </Tabs>
  );
}
