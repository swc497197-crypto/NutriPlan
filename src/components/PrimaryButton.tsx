import { Pressable, StyleSheet, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "quiet";
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
};

export function PrimaryButton({ label, onPress, variant = "primary", icon, style }: PrimaryButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        variant === "secondary" && styles.secondary,
        variant === "quiet" && styles.quiet,
        pressed && styles.pressed,
        style
      ]}
    >
      {icon ? <Ionicons name={icon} size={18} color={variant === "primary" ? "#FFFFFF" : colors.primary} /> : null}
      <AppText weight="600" style={{ color: variant === "primary" ? "#FFFFFF" : colors.primary }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: 8,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary
  },
  quiet: {
    backgroundColor: "transparent"
  },
  pressed: {
    opacity: 0.78
  }
});
