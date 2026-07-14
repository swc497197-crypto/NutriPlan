import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function Notice({ text, tone = "info" }: { text: string; tone?: "info" | "warning" | "error" }) {
  const color = tone === "error" ? colors.danger : tone === "warning" ? colors.warning : colors.info;
  return (
    <View style={[styles.notice, { borderColor: color }]}>
      <AppText variant="small" style={{ color }}>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    borderLeftWidth: 3,
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: 8
  }
});
