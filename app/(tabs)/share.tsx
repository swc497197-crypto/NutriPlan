import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { MealImage } from "@/components/MealImage";
import { Screen } from "@/components/Screen";
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

const templates = [
  { id: "simple", title: "简洁卡", icon: "reader-outline" },
  { id: "food", title: "食物图", icon: "images-outline" },
  { id: "summary", title: "一日摘要", icon: "stats-chart-outline" }
] as const;

function formatToday() {
  const today = new Date();
  const weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  return `${today.getMonth() + 1}月${today.getDate()}日 ${weekdays[today.getDay()]}`;
}

export default function ShareScreen() {
  const { onboarding, plans } = useAppStore();
  const [selectedTemplate, setSelectedTemplate] = useState<(typeof templates)[number]["id"]>("simple");
  const [copied, setCopied] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const todayPlan = plans[0];
  const meals = useMemo(() => todayPlan?.meals ?? [], [todayPlan]);
  const goalText = onboarding.profile.goal === "gentleFatLoss" ? "温和减脂" : "改善日常饮食";
  const totals = useMemo(
    () =>
      meals.reduce(
        (sum, meal) => ({
          calories: sum.calories + meal.calories,
          protein: sum.protein + meal.protein
        }),
        { calories: 0, protein: 0 }
      ),
    [meals]
  );
  const featuredMeal = meals[0];

  const copySummary = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Screen compact>
      <View style={styles.header}>
        <View>
          <AppText variant="small" muted>
            分享我的饮食计划
          </AppText>
          <AppText variant="h2" weight="700">
            分享
          </AppText>
        </View>
        <View style={styles.headerIcon}>
          <Ionicons name="share-social-outline" size={22} color={colors.primary} />
        </View>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewTop}>
          <View>
            <AppText variant="tiny" weight="700" style={styles.brandText}>
              NutriPlan
            </AppText>
            <AppText variant="h2" weight="700">
              今日饮食计划
            </AppText>
            <AppText variant="small" muted>
              {formatToday()} · {goalText}
            </AppText>
          </View>
          <View style={styles.badge}>
            <Ionicons name="leaf-outline" size={15} color={colors.primary} />
            <AppText variant="tiny" weight="700" style={styles.badgeText}>
              可执行
            </AppText>
          </View>
        </View>

        <View style={styles.heroVisual}>
          {featuredMeal ? <MealImage image={featuredMeal.image} variant="hero" style={styles.heroImage} /> : null}
          <View style={styles.metricPanel}>
            <Metric value={totals.calories || 1600} label="kcal" />
            <View style={styles.metricDivider} />
            <Metric value={`${totals.protein || 89}g`} label="蛋白质" />
          </View>
        </View>

        <View style={styles.mealSummary}>
          {meals.slice(0, 4).map((meal) => (
            <View key={`${meal.day}-${meal.type}-${meal.id}`} style={styles.mealLine}>
              <AppText variant="tiny" weight="700" style={styles.mealType}>
                {mealLabels[meal.type]}
              </AppText>
              <AppText variant="small" weight="700" numberOfLines={1} style={styles.mealName}>
                {meal.name}
              </AppText>
            </View>
          ))}
        </View>

        <AppText variant="tiny" muted>
          图片和数据仅用于原型演示，不代表正式营养建议。
        </AppText>
      </View>

      <View style={styles.templateSection}>
        <AppText variant="h3" weight="700">
          分享样式
        </AppText>
        <View style={styles.templateRow}>
          {templates.map((template) => {
            const selected = selectedTemplate === template.id;
            return (
              <Pressable
                key={template.id}
                accessibilityRole="button"
                accessibilityState={{ selected }}
                style={[styles.templateButton, selected && styles.templateButtonActive]}
                onPress={() => setSelectedTemplate(template.id)}
              >
                <Ionicons
                  name={template.icon}
                  size={18}
                  color={selected ? "#FFFFFF" : colors.primary}
                />
                <AppText variant="tiny" weight="700" style={selected ? styles.templateTextActive : styles.templateText}>
                  {template.title}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => setShareVisible(true)}>
          <Ionicons name="image-outline" size={17} color="#FFFFFF" />
          <AppText variant="small" weight="700" style={styles.primaryButtonText}>
            生成分享图
          </AppText>
        </Pressable>
        <Pressable accessibilityRole="button" style={styles.secondaryButton} onPress={copySummary}>
          <Ionicons name="copy-outline" size={17} color={colors.primary} />
          <AppText variant="small" weight="700" style={styles.secondaryButtonText}>
            {copied ? "已复制" : "复制摘要"}
          </AppText>
        </Pressable>
      </View>

      <View style={styles.disabledAction}>
        <Ionicons name="download-outline" size={16} color={colors.textMuted} />
        <AppText variant="tiny" muted>
          保存到本地将在后续版本接入；当前仅展示原型样式。
        </AppText>
      </View>

      <ShareModal visible={shareVisible} template={selectedTemplate} onClose={() => setShareVisible(false)} />
    </Screen>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <View style={styles.metric}>
      <AppText variant="h2" weight="700">
        {value}
      </AppText>
      <AppText variant="tiny" muted>
        {label}
      </AppText>
    </View>
  );
}

function ShareModal({
  visible,
  template,
  onClose
}: {
  visible: boolean;
  template: (typeof templates)[number]["id"];
  onClose: () => void;
}) {
  const templateTitle = templates.find((item) => item.id === template)?.title ?? "简洁卡";

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalSheet}>
          <View style={styles.modalHandle} />
          <View style={styles.modalHeader}>
            <AppText variant="h3" weight="700">
              分享图已生成
            </AppText>
            <Pressable accessibilityRole="button" style={styles.closeButton} onPress={onClose}>
              <Ionicons name="close" size={20} color={colors.text} />
            </Pressable>
          </View>
          <View style={styles.generatedCard}>
            <Ionicons name="sparkles-outline" size={24} color={colors.primary} />
            <AppText variant="h3" weight="700">
              {templateTitle}
            </AppText>
            <AppText variant="small" muted>
              当前版本只模拟分享图预览，不调用系统分享、不上传数据。
            </AppText>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  header: {
    borderRadius: 18,
    backgroundColor: "#FFFDF7",
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  previewCard: {
    borderRadius: 22,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md
  },
  previewTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md
  },
  brandText: {
    color: colors.primary
  },
  badge: {
    alignSelf: "flex-start",
    borderRadius: 15,
    backgroundColor: colors.surfaceMuted,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs
  },
  badgeText: {
    color: colors.primary
  },
  heroVisual: {
    borderRadius: 18,
    overflow: "hidden",
    backgroundColor: colors.surfaceMuted
  },
  heroImage: {
    borderRadius: 0,
    aspectRatio: 16 / 9
  },
  metricPanel: {
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.lg
  },
  metric: {
    minWidth: 84
  },
  metricDivider: {
    width: 1,
    height: 32,
    backgroundColor: colors.border
  },
  mealSummary: {
    gap: spacing.xs
  },
  mealLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  mealType: {
    width: 34,
    color: colors.primary
  },
  mealName: {
    flex: 1
  },
  templateSection: {
    gap: spacing.sm
  },
  templateRow: {
    flexDirection: "row",
    gap: spacing.sm
  },
  templateButton: {
    flex: 1,
    minHeight: 58,
    borderRadius: 16,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  templateButtonActive: {
    backgroundColor: colors.primary
  },
  templateText: {
    color: colors.primary
  },
  templateTextActive: {
    color: "#FFFFFF"
  },
  actions: {
    flexDirection: "row",
    gap: spacing.sm
  },
  primaryButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 21,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  primaryButtonText: {
    color: "#FFFFFF"
  },
  secondaryButton: {
    flex: 1,
    minHeight: 42,
    borderRadius: 21,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  secondaryButtonText: {
    color: colors.primary
  },
  disabledAction: {
    borderRadius: 14,
    backgroundColor: colors.surface,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    padding: spacing.md
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(31, 42, 36, 0.28)",
    justifyContent: "flex-end"
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.background,
    padding: spacing.lg,
    gap: spacing.md
  },
  modalHandle: {
    width: 42,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: "center"
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center"
  },
  generatedCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    alignItems: "center",
    gap: spacing.sm
  }
});
