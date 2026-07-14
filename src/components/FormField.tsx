import { TextInput, TextInputProps, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type FormFieldProps = TextInputProps & {
  label: string;
};

export function FormField({ label, style, ...props }: FormFieldProps) {
  return (
    <View style={styles.wrap}>
      <AppText variant="small" weight="600">
        {label}
      </AppText>
      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, style]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.sm
  },
  input: {
    minHeight: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    color: colors.text,
    fontSize: 15
  }
});
