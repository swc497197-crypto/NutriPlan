import { router } from "expo-router";
import { useMemo, useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { EmptyState } from "@/components/EmptyState";
import { MealCard } from "@/components/MealCard";
import { Notice } from "@/components/Notice";
import { PrimaryButton } from "@/components/PrimaryButton";
import { ReplacementSheet } from "@/components/ReplacementSheet";
import { Screen } from "@/components/Screen";
import { demoDataNotice, getReplacementMeals } from "@/data/menu";
import { Meal } from "@/models/meal";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";
import { formatToday } from "@/utils/date";

export default function PlanScreen() {
  const { onboarding, plans, planStatus, replaceMealWith } = useAppStore();
  const [selectedDay, setSelectedDay] = useState(1);
  const [mealToReplace, setMealToReplace] = useState<Meal | undefined>();
  const selectedPlan = useMemo(() => plans.find((plan) => plan.day === selectedDay), [plans, selectedDay]);
  const goalText = onboarding.profile.goal === "gentleFatLoss" ? "温和减脂" : "改善日常饮食";
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
    <Screen>
      <View style={styles.header}>
        <View style={styles.headerText}>
          <AppText variant="h1" weight="700">
            七日饮食计划
          </AppText>
          <AppText muted>
            {formatToday()} · 当前目标：{goalText}
          </AppText>
        </View>
        <PrimaryButton
          label="清单"
          icon="basket-outline"
          variant="secondary"
          style={styles.listButton}
          onPress={() => router.push("/(tabs)/shopping")}
        />
      </View>

      <Notice text={demoDataNotice} />

      <View style={styles.dayTabs}>
        {plans.map((plan) => (
          <Pressable
            key={plan.day}
            accessibilityRole="button"
            accessibilityState={{ selected: selectedDay === plan.day }}
            style={[styles.dayPill, selectedDay === plan.day && styles.dayPillActive]}
            onPress={() => setSelectedDay(plan.day)}
          >
            <AppText variant="small" weight="700" style={{ color: selectedDay === plan.day ? "#FFFFFF" : colors.text }}>
              D{plan.day}
            </AppText>
          </Pressable>
        ))}
      </View>

      {selectedPlan && planStatus !== "empty" ? (
        <Card style={styles.summaryCard}>
          <View>
            <AppText variant="small" muted>
              今日总览
            </AppText>
            <AppText variant="h3" weight="700">
              {selectedPlan.meals.length} 餐 · 模拟 {dailyTotal.calories} kcal · 蛋白质 {dailyTotal.protein}g
            </AppText>
          </View>
          <AppText variant="small" muted>
            先看今天能不能执行，再决定是否替换某一餐。
          </AppText>
        </Card>
      ) : null}

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
            <MealCard
              key={`${selectedPlan.day}-${meal.type}-${meal.id}-${index}`}
              meal={meal}
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

const styles = StyleSheet.create({
  header: {
    alignItems: "flex-start",
    gap: spacing.md
  },
  headerText: {
    width: "100%"
  },
  listButton: {
    alignSelf: "flex-start",
    minHeight: 44,
    paddingHorizontal: spacing.md
  },
  dayTabs: {
    flexDirection: "row",
    gap: spacing.sm
  },
  dayPill: {
    width: 42,
    height: 42,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border
  },
  dayPillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  summaryCard: {
    backgroundColor: colors.surfaceMuted
  },
  meals: {
    gap: spacing.md
  },
  centerCard: {
    alignItems: "center"
  }
});
