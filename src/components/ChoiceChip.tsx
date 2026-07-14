import { Pressable, StyleSheet } from "react-native";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type ChoiceChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function ChoiceChip({ label, selected, onPress }: ChoiceChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.selected, pressed && styles.pressed]}
    >
      <AppText variant="small" weight="600" style={{ color: selected ? "#FFFFFF" : colors.text }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    minHeight: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface
  },
  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  pressed: {
    opacity: 0.78
  }
});
