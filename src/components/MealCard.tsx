import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { MealImage } from "@/components/MealImage";
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
    <Card style={styles.card}>
      <View style={styles.row}>
        <MealImage image={meal.image} variant="mini" />
        <View style={styles.main}>
          <View style={styles.titleRow}>
            <AppText variant="tiny" weight="700" muted>
              {mealLabels[meal.type]}
            </AppText>
            <AppText variant="tiny" weight="700" style={styles.metricText}>
              {meal.calories} kcal · 蛋白质 {meal.protein}g
            </AppText>
          </View>
          <AppText variant="small" weight="700" numberOfLines={1}>
            {meal.name}
          </AppText>
          <AppText variant="tiny" muted numberOfLines={1}>
            {meal.reason}
          </AppText>
        </View>
        <View style={styles.actions}>
          <Pressable accessibilityRole="button" style={styles.actionButton} onPress={() => router.push(`/recipe/${meal.id}`)}>
            <Ionicons name="book-outline" size={14} color={colors.primary} />
            <AppText variant="tiny" weight="700" style={styles.actionText}>
              菜谱
            </AppText>
          </Pressable>
          <Pressable accessibilityRole="button" style={styles.actionButton} onPress={() => onReplace(meal)}>
            <Ionicons name="swap-horizontal-outline" size={14} color={colors.primary} />
            <AppText variant="tiny" weight="700" style={styles.actionText}>
              换一道
            </AppText>
          </Pressable>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: spacing.sm
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  main: {
    flex: 1,
    gap: 1
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.xs
  },
  metricText: {
    color: colors.primaryDark
  },
  actions: {
    width: 58,
    gap: 4
  },
  actionButton: {
    minHeight: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    backgroundColor: colors.surface
  },
  actionText: {
    color: colors.primary
  }
});
