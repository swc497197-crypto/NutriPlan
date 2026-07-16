import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Notice } from "@/components/Notice";
import { Screen } from "@/components/Screen";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export default function MyScreen() {
  const { onboarding, regeneratePlan, resetLocalData, loadSampleProfile } = useAppStore();

  return (
    <Screen compact>
      <View>
        <AppText variant="h2" weight="700">
          我的
        </AppText>
        <AppText variant="small" muted>
          资料、示例计划和免责声明
        </AppText>
      </View>

      <Card style={styles.compactCard}>
        <View style={styles.cardHeader}>
          <AppText variant="h3" weight="700">
            个人资料
          </AppText>
          <Pressable accessibilityRole="button" style={styles.textAction} onPress={() => router.push("/onboarding/profile")}>
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <AppText variant="small" weight="700" style={{ color: colors.primary }}>
              编辑
            </AppText>
          </Pressable>
        </View>
        <View style={styles.profileGrid}>
          <ProfileStat label="年龄" value={onboarding.profile.age ? `${onboarding.profile.age} 岁` : "未填"} />
          <ProfileStat label="身高" value={onboarding.profile.heightCm ? `${onboarding.profile.heightCm} cm` : "未填"} />
          <ProfileStat label="体重" value={onboarding.profile.weightKg ? `${onboarding.profile.weightKg} kg` : "未填"} />
          <ProfileStat label="预算" value={`${onboarding.preferences.mealBudget || "未填"} 元/餐`} />
        </View>
      </Card>

      <Card style={styles.compactCard}>
        <AppText variant="h3" weight="700">
          示例计划
        </AppText>
        <View style={styles.actionGrid}>
          <ActionButton label="重新生成" icon="refresh-outline" onPress={regeneratePlan} />
          <ActionButton label="示例资料" icon="sparkles-outline" onPress={loadSampleProfile} />
          <ActionButton label="清除数据" icon="trash-outline" onPress={resetLocalData} />
        </View>
      </Card>

      <Notice
        tone="warning"
        text="免责声明：本原型不提供疾病诊断、临床营养治疗、真实营养计算或补充剂推荐。"
      />
    </Screen>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <AppText variant="tiny" muted>
        {label}
      </AppText>
      <AppText variant="small" weight="700">
        {value}
      </AppText>
    </View>
  );
}

function ActionButton({ label, icon, onPress }: { label: string; icon: keyof typeof Ionicons.glyphMap; onPress: () => void }) {
  return (
    <Pressable accessibilityRole="button" style={styles.actionButton} onPress={onPress}>
      <Ionicons name={icon} size={17} color={colors.primary} />
      <AppText variant="small" weight="700" style={{ color: colors.primary }}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  compactCard: {
    padding: spacing.sm,
    gap: spacing.xs
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  textAction: {
    minHeight: 28,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  stat: {
    width: "48%",
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted,
    padding: spacing.xs
  },
  actionGrid: {
    flexDirection: "row",
    gap: spacing.sm
  },
  actionButton: {
    minHeight: 38,
    flex: 1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  }
});
