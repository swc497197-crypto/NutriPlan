import { PropsWithChildren } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export function Card({ children, style }: PropsWithChildren<{ style?: ViewStyle }>) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    padding: spacing.lg,
    gap: spacing.md
  }
});
