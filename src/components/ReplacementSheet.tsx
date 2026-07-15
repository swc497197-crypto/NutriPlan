import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { MealImage } from "@/components/MealImage";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Meal } from "@/models/meal";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type ReplacementSheetProps = {
  visible: boolean;
  meal?: Meal;
  options: Meal[];
  onClose: () => void;
  onSelect: (meal: Meal) => void;
};

export function ReplacementSheet({ visible, meal, options, onClose, onSelect }: ReplacementSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <View style={styles.headerText}>
              <AppText variant="h2" weight="700">
                换一道更合适的
              </AppText>
              <AppText variant="small" muted>
                {meal ? `替换当前${meal.name}` : "选择一个演示候选菜"}
              </AppText>
            </View>
            <Pressable accessibilityRole="button" onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>

          <View style={styles.options}>
            {options.map((option) => (
              <Card key={option.id} style={styles.optionCard}>
                <View style={styles.optionRow}>
                  <MealImage image={option.image} />
                  <View style={styles.optionText}>
                    <AppText weight="700">{option.name}</AppText>
                    <AppText variant="small" muted numberOfLines={2}>
                      {option.reason}
                    </AppText>
                    <View style={styles.metrics}>
                      <AppText variant="tiny" weight="700">
                        模拟 {option.calories} kcal
                      </AppText>
                      <AppText variant="tiny" weight="700">
                        蛋白质 {option.protein}g
                      </AppText>
                    </View>
                  </View>
                </View>
                <PrimaryButton label="选这道" icon="checkmark-outline" onPress={() => onSelect(option)} />
              </Card>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(31, 42, 36, 0.24)"
  },
  sheet: {
    maxHeight: "88%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.lg
  },
  handle: {
    width: 44,
    height: 4,
    borderRadius: 2,
    alignSelf: "center",
    backgroundColor: colors.border
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md
  },
  headerText: {
    flex: 1
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface
  },
  options: {
    gap: spacing.md
  },
  optionCard: {
    gap: spacing.md
  },
  optionRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  optionText: {
    flex: 1,
    gap: spacing.xs
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
