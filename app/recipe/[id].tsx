import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { MealImage } from "@/components/MealImage";
import { Notice } from "@/components/Notice";
import { Screen } from "@/components/Screen";
import { getMealById } from "@/data/menu";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const feedback = [
  { label: "我喜欢", icon: "heart-outline" },
  { label: "不喜欢", icon: "thumbs-down-outline" },
  { label: "太难做", icon: "construct-outline" },
  { label: "食材难买", icon: "storefront-outline" }
] as const;

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const meal = id ? getMealById(id) : undefined;

  if (!meal) {
    return (
      <Screen>
        <Card>
          <EmptyState title="没有找到菜谱" text="这是一条错误状态示例，请返回计划页重新选择。" />
        </Card>
      </Screen>
    );
  }

  return (
    <Screen>
      <View>
        <AppText variant="h1" weight="700">
          {meal.name}
        </AppText>
        <AppText muted>
          {meal.timeMinutes} 分钟 · {meal.difficulty}
        </AppText>
      </View>

      <MealImage image={meal.image} variant="hero" />
      <AppText variant="small" muted>
        图片为示意图，实际成品可能因食材和烹饪方式不同而变化。
      </AppText>

      <Notice text="本页营养摘要为模拟展示，不用于正式营养判断。" />

      <Card>
        <AppText variant="h3" weight="700">
          模拟营养摘要
        </AppText>
        <View style={styles.metricRow}>
          <Metric label="热量" value={`${meal.calories} kcal`} />
          <Metric label="蛋白质" value={`${meal.protein}g`} />
        </View>
        <AppText muted>{meal.reason}</AppText>
      </Card>

      <Card>
        <AppText variant="h3" weight="700">
          食材和重量
        </AppText>
        {meal.ingredients.map((ingredient) => (
          <View key={ingredient.name} style={styles.ingredient}>
            <View>
              <AppText weight="600">{ingredient.name}</AppText>
              <AppText variant="small" muted>
                {ingredient.amount}
              </AppText>
            </View>
            <AppText variant="small" muted style={styles.subText}>
              可替换：{ingredient.substitutes?.join("、") ?? "暂无"}
            </AppText>
          </View>
        ))}
      </Card>

      <Card>
        <AppText variant="h3" weight="700">
          烹饪步骤
        </AppText>
        {meal.steps.map((step, index) => (
          <View key={step} style={styles.step}>
            <View style={styles.stepNumber}>
              <AppText variant="tiny" weight="700" style={{ color: "#FFFFFF" }}>
                {index + 1}
              </AppText>
            </View>
            <AppText style={styles.stepText}>{step}</AppText>
          </View>
        ))}
      </Card>

      <Card>
        <AppText variant="h3" weight="700">
          反馈
        </AppText>
        <View style={styles.feedbackGrid}>
          {feedback.map((item) => (
            <Pressable key={item.label} accessibilityRole="button" style={styles.feedbackButton}>
              <Ionicons name={item.icon} size={18} color={colors.primary} />
              <AppText variant="small" weight="600" style={{ color: colors.primary }}>
                {item.label}
              </AppText>
            </Pressable>
          ))}
        </View>
      </Card>
    </Screen>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.metric}>
      <AppText variant="small" muted>
        {label}
      </AppText>
      <AppText variant="h3" weight="700">
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  metricRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  metric: {
    flex: 1,
    borderRadius: 8,
    padding: spacing.md,
    backgroundColor: colors.surfaceMuted
  },
  ingredient: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: spacing.md,
    gap: spacing.xs
  },
  subText: {
    flexShrink: 1
  },
  step: {
    flexDirection: "row",
    gap: spacing.md
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary
  },
  stepText: {
    flex: 1
  },
  feedbackGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  feedbackButton: {
    minHeight: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.md
  }
});
