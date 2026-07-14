import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "@/theme/colors";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.tab,
          borderTopColor: colors.border
        }
      }}
    >
      <Tabs.Screen
        name="plan"
        options={{
          title: "计划",
          tabBarIcon: ({ color, size }) => <Ionicons name="calendar-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "购物清单",
          tabBarIcon: ({ color, size }) => <Ionicons name="basket-outline" color={color} size={size} />
        }}
      />
      <Tabs.Screen
        name="my"
        options={{
          title: "我的",
          tabBarIcon: ({ color, size }) => <Ionicons name="person-circle-outline" color={color} size={size} />
        }}
      />
    </Tabs>
  );
}
