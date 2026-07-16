import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { MealImage } from "@/components/MealImage";
import { Notice } from "@/components/Notice";
import { ReplacementSheet } from "@/components/ReplacementSheet";
import { Screen } from "@/components/Screen";
import { getReplacementMeals } from "@/data/menu";
import { Meal } from "@/models/meal";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const mealLabels: Record<Meal["type"], string> = {
  breakfast: "早餐",
  lunch: "午餐",
  dinner: "晚餐",
  snack: "加餐"
};

const weekdayLabels = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];

function getDateOptions(count: number) {
  const today = new Date();

  return Array.from({ length: count }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() + index);

    return {
      day: index + 1,
      weekday: weekdayLabels[date.getDay()],
      dateText: `${date.getMonth() + 1}/${date.getDate()}`
    };
  });
}

function formatPlanDate() {
  const today = new Date();
  return `${today.getMonth() + 1}月${today.getDate()}日 ${weekdayLabels[today.getDay()]}`;
}

export default function PlanScreen() {
  const { onboarding, plans, planStatus, replaceMealWith } = useAppStore();
  const [selectedDay, setSelectedDay] = useState(1);
  const [mealToReplace, setMealToReplace] = useState<Meal | undefined>();
  const [expandedMealId, setExpandedMealId] = useState<string | undefined>();
  const selectedPlan = useMemo(() => plans.find((plan) => plan.day === selectedDay), [plans, selectedDay]);
  const goalText = onboarding.profile.goal === "gentleFatLoss" ? "温和减脂" : "改善日常饮食";
  const dateOptions = useMemo(() => getDateOptions(plans.length || 7), [plans.length]);
  const dailyTotal = useMemo(
    () =>
      selectedPlan?.meals.reduce(
        (total, meal) => ({
          calories: total.calories + meal.calories,
          protein: total.protein + meal.protein
        }),
        { calories: 0, protein: 0 }
      ) ?? { calories: 0, protein: 0 },
    [selectedPlan]
  );
  const replacementOptions = mealToReplace
    ? getReplacementMeals(mealToReplace.id, mealToReplace.type, mealToReplace.day, 3)
    : [];

  return (
    <Screen compact>
      <View style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.greetingBlock}>
            <AppText variant="small" muted>
              早上好
            </AppText>
            <AppText variant="h2" weight="700">
              今日饮食计划
            </AppText>
            <AppText variant="small" muted>
              {formatPlanDate()} · {goalText}
            </AppText>
          </View>

          <Pressable accessibilityRole="button" style={styles.listButton} onPress={() => router.push("/(tabs)/shopping")}>
            <Ionicons name="basket-outline" size={17} color={colors.primary} />
            <AppText variant="tiny" weight="700" style={styles.listButtonText}>
              清单
            </AppText>
          </Pressable>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <AppText variant="h2" weight="700">
              {dailyTotal.calories}
            </AppText>
            <AppText variant="tiny" muted>
              kcal
            </AppText>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <AppText variant="h2" weight="700">
              {dailyTotal.protein}g
            </AppText>
            <AppText variant="tiny" muted>
              蛋白质
            </AppText>
          </View>
          <View style={styles.summaryHint}>
            <Ionicons name="sparkles-outline" size={15} color={colors.warning} />
            <AppText variant="tiny" weight="600" style={styles.summaryHintText} numberOfLines={2}>
              先看今天怎么吃，再决定是否替换一餐
            </AppText>
          </View>
        </View>
      </View>

      <View style={styles.dateStrip}>
        {dateOptions.map((option) => {
          const selected = selectedDay === option.day;
          return (
            <Pressable
              key={option.day}
              accessibilityRole="button"
              accessibilityState={{ selected }}
              style={[styles.datePill, selected && styles.datePillActive]}
              onPress={() => setSelectedDay(option.day)}
            >
              <AppText variant="tiny" weight="700" style={[styles.dateWeekday, selected && styles.dateTextActive]}>
                {option.weekday}
              </AppText>
              <AppText variant="tiny" muted={!selected} weight="700" style={selected && styles.dateTextActive}>
                {option.dateText}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.intentCard}>
        <Ionicons name="leaf-outline" size={17} color={colors.primary} />
        <AppText variant="small" weight="600" style={styles.intentText} numberOfLines={2}>
          今天的安排偏清爽、好购买、制作时间短，适合工作日执行。
        </AppText>
      </View>

      {planStatus === "loading" ? (
        <Card style={styles.centerCard}>
          <ActivityIndicator color={colors.primary} />
          <AppText muted>正在生成示例计划...</AppText>
        </Card>
      ) : null}

      {planStatus === "error" ? <Notice tone="error" text="示例状态：计划读取出现问题，请稍后重试。" /> : null}

      {planStatus === "empty" ? (
        <Card>
          <EmptyState title="暂无本地计划" text="可以在“我的”中重新生成示例计划，或回到欢迎页重新建档。" />
        </Card>
      ) : null}

      {selectedPlan && planStatus !== "empty" ? (
        <View style={styles.meals}>
          {selectedPlan.meals.map((meal, index) => (
            <PlanMealCard
              key={`${selectedPlan.day}-${meal.type}-${meal.id}-${index}`}
              meal={meal}
              expanded={expandedMealId === meal.id}
              onToggleWhy={() => setExpandedMealId(expandedMealId === meal.id ? undefined : meal.id)}
              onReplace={setMealToReplace}
            />
          ))}
        </View>
      ) : null}

      <ReplacementSheet
        visible={Boolean(mealToReplace)}
        meal={mealToReplace}
        options={replacementOptions}
        onClose={() => setMealToReplace(undefined)}
        onSelect={(replacement) => {
          if (!mealToReplace) return;
          replaceMealWith(mealToReplace, replacement);
          setMealToReplace(undefined);
        }}
      />
    </Screen>
  );
}

function PlanMealCard({
  meal,
  expanded,
  onToggleWhy,
  onReplace
}: {
  meal: Meal;
  expanded: boolean;
  onToggleWhy: () => void;
  onReplace: (meal: Meal) => void;
}) {
  return (
    <View style={styles.mealCard}>
      <View style={styles.mealMainRow}>
        <MealImage image={meal.image} variant="mini" style={styles.mealImage} />

        <View style={styles.mealInfo}>
          <AppText variant="tiny" weight="700" muted>
            {mealLabels[meal.type]}
          </AppText>
          <AppText variant="small" weight="700" numberOfLines={1}>
            {meal.name}
          </AppText>

          <View style={styles.mealMetaRow}>
            <AppText variant="tiny" weight="700" style={styles.mealMetaText}>
              {meal.calories} kcal
            </AppText>
            <AppText variant="tiny" weight="700" style={styles.mealMetaText}>
              蛋白质 {meal.protein}g
            </AppText>
            <AppText variant="tiny" muted>
              {meal.timeMinutes}分钟
            </AppText>
          </View>

          <View style={styles.mealActionRow}>
            <Pressable accessibilityRole="button" style={styles.recipeButton} onPress={() => router.push(`/recipe/${meal.id}`)}>
              <AppText variant="tiny" weight="700" style={styles.recipeButtonText}>
                查看菜谱
              </AppText>
            </Pressable>
            <Pressable accessibilityRole="button" style={styles.linkButton} onPress={() => onReplace(meal)}>
              <Ionicons name="swap-horizontal-outline" size={14} color={colors.primary} />
              <AppText variant="tiny" weight="700" style={styles.linkText}>
                替换
              </AppText>
            </Pressable>
          </View>
        </View>
      </View>

      <Pressable accessibilityRole="button" style={styles.whyButton} onPress={onToggleWhy}>
        <Ionicons name={expanded ? "chevron-up" : "chevron-down"} size={14} color={colors.textMuted} />
        <AppText variant="tiny" weight="700" muted>
          为什么推荐
        </AppText>
      </Pressable>

      {expanded ? (
        <View style={styles.whyPanel}>
          <WhyLine text="符合你的当前目标" />
          <WhyLine text="蛋白质满足本餐需求" />
          <WhyLine text="制作时间符合你的习惯" />
        </View>
      ) : null}
    </View>
  );
}

function WhyLine({ text }: { text: string }) {
  return (
    <View style={styles.whyLine}>
      <Ionicons name="checkmark-circle" size={14} color={colors.primary} />
      <AppText variant="tiny" muted>
        {text}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 18,
    backgroundColor: "#FFFDF7",
    padding: spacing.md,
    gap: spacing.md
  },
  heroTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md
  },
  greetingBlock: {
    flex: 1,
    gap: 1
  },
  listButton: {
    minHeight: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.surfaceMuted
  },
  listButtonText: {
    color: colors.primary
  },
  summaryRow: {
    minHeight: 62,
    borderRadius: 14,
    backgroundColor: colors.surfaceMuted,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.md
  },
  summaryItem: {
    minWidth: 72
  },
  summaryDivider: {
    width: 1,
    height: 34,
    backgroundColor: colors.border
  },
  summaryHint: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  summaryHintText: {
    flex: 1,
    color: colors.warning
  },
  dateStrip: {
    flexDirection: "row",
    gap: 5
  },
  datePill: {
    flex: 1,
    minWidth: 0,
    height: 48,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface
  },
  datePillActive: {
    backgroundColor: colors.primary
  },
  dateWeekday: {
    marginBottom: 1
  },
  dateTextActive: {
    color: "#FFFFFF"
  },
  intentCard: {
    minHeight: 42,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingHorizontal: spacing.md
  },
  intentText: {
    flex: 1
  },
  meals: {
    gap: spacing.sm
  },
  mealCard: {
    borderRadius: 16,
    backgroundColor: colors.surface,
    padding: spacing.sm,
    gap: spacing.xs
  },
  mealMainRow: {
    flexDirection: "row",
    gap: spacing.md
  },
  mealImage: {
    width: "42%",
    height: 112,
    borderRadius: 14
  },
  mealInfo: {
    flex: 1,
    gap: 2,
    justifyContent: "center"
  },
  mealMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  mealMetaText: {
    color: colors.primaryDark
  },
  mealActionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    marginTop: spacing.xs
  },
  recipeButton: {
    minHeight: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md
  },
  recipeButtonText: {
    color: "#FFFFFF"
  },
  linkButton: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  linkText: {
    color: colors.primary
  },
  whyButton: {
    alignSelf: "flex-start",
    minHeight: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingLeft: 120
  },
  whyPanel: {
    marginLeft: 120,
    borderRadius: 12,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.sm,
    gap: 2
  },
  whyLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  centerCard: {
    alignItems: "center"
  }
});
