import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { IPhonePreviewFrame } from "@/components/IPhonePreviewFrame";
import { AppStoreProvider } from "@/store/AppStore";
import { colors } from "@/theme/colors";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <IPhonePreviewFrame>
        <SafeAreaProvider>
          <AppStoreProvider>
            <StatusBar style="dark" />
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: colors.background },
                headerShadowVisible: false,
                headerTintColor: colors.text,
                contentStyle: { backgroundColor: colors.background }
              }}
            >
              <Stack.Screen name="index" options={{ headerShown: false }} />
              <Stack.Screen name="onboarding/profile" options={{ title: "个人资料" }} />
              <Stack.Screen name="onboarding/preferences" options={{ title: "饮食偏好" }} />
              <Stack.Screen name="onboarding/genetics" options={{ title: "基因营养倾向" }} />
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="recipe/[id]" options={{ title: "菜谱详情", presentation: "card" }} />
            </Stack>
          </AppStoreProvider>
        </SafeAreaProvider>
      </IPhonePreviewFrame>
    </GestureHandlerRootView>
  );
}
