import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function EmptyState({ title, text }: { title: string; text: string }) {
  return (
    <View style={styles.wrap}>
      <Ionicons name="leaf-outline" size={28} color={colors.primary} />
      <AppText variant="h3" weight="700">
        {title}
      </AppText>
      <AppText muted style={styles.text}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
    padding: spacing.xl,
    gap: spacing.sm
  },
  text: {
    textAlign: "center"
  }
});
