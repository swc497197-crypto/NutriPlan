import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { MealImage } from "@/components/MealImage";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Meal } from "@/models/meal";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const mealLabels = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
  snack: "加餐"
};

export function MealCard({ meal, onReplace }: { meal: Meal; onReplace: (meal: Meal) => void }) {
  return (
    <Card>
      <View style={styles.header}>
        <MealImage image={meal.image} />
        <View style={styles.titleWrap}>
          <AppText variant="small" muted>
            {mealLabels[meal.type]}
          </AppText>
          <AppText variant="h3" weight="700">
            {meal.name}
          </AppText>
        </View>
      </View>
      <View style={styles.metrics}>
        <AppText variant="small" weight="600">
          模拟 {meal.calories} kcal
        </AppText>
        <AppText variant="small" weight="600">
          蛋白质 {meal.protein}g
        </AppText>
      </View>
      <AppText muted>{meal.reason}</AppText>
      <View style={styles.actions}>
        <PrimaryButton label="查看菜谱" icon="book-outline" onPress={() => router.push(`/recipe/${meal.id}`)} />
        <Pressable accessibilityRole="button" style={styles.replace} onPress={() => onReplace(meal)}>
          <Ionicons name="swap-horizontal-outline" size={18} color={colors.primary} />
          <AppText variant="small" weight="600" style={{ color: colors.primary }}>
            替换
          </AppText>
        </Pressable>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center"
  },
  titleWrap: {
    flex: 1
  },
  metrics: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md
  },
  replace: {
    minHeight: 48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md
  }
});
