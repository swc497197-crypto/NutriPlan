import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Notice } from "@/components/Notice";
import { Screen } from "@/components/Screen";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

const goalLabels = {
  gentleFatLoss: "温和减脂",
  balanced: "改善日常饮食",
  "": "未设置"
};

const activityLabels = {
  low: "久坐较多",
  medium: "日常活动",
  high: "活动较多",
  "": "未设置"
};

export default function MyScreen() {
  const { onboarding, regeneratePlan, resetLocalData, loadSampleProfile } = useAppStore();
  const profile = onboarding.profile;
  const preferences = onboarding.preferences;
  const completionCount = [profile.age, profile.heightCm, profile.weightKg, profile.goal, preferences.mealBudget].filter(Boolean).length;

  return (
    <Screen compact>
      <View style={styles.hero}>
        <View>
          <AppText variant="small" muted>
            个人饮食设置
          </AppText>
          <AppText variant="h2" weight="700">
            我的
          </AppText>
          <AppText variant="small" muted>
            资料越完整，计划越贴近日常执行。
          </AppText>
        </View>
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={24} color={colors.primary} />
        </View>
      </View>

      <View style={styles.statusCard}>
        <View style={styles.statusHeader}>
          <View>
            <AppText variant="h3" weight="700">
              当前计划状态
            </AppText>
            <AppText variant="small" muted>
              {goalLabels[profile.goal]} · 每餐约 {preferences.mealBudget || "未设置"} 元
            </AppText>
          </View>
          <View style={styles.scoreBadge}>
            <AppText variant="h2" weight="700" style={styles.scoreText}>
              {completionCount}
            </AppText>
            <AppText variant="tiny" muted>
              / 5
            </AppText>
          </View>
        </View>

        <View style={styles.profileGrid}>
          <ProfileStat label="年龄" value={profile.age ? `${profile.age} 岁` : "未填写"} icon="calendar-outline" />
          <ProfileStat label="身高" value={profile.heightCm ? `${profile.heightCm} cm` : "未填写"} icon="resize-outline" />
          <ProfileStat label="体重" value={profile.weightKg ? `${profile.weightKg} kg` : "未填写"} icon="scale-outline" />
          <ProfileStat label="活动" value={activityLabels[profile.activityLevel]} icon="walk-outline" />
        </View>

        <Pressable accessibilityRole="button" style={styles.primaryButton} onPress={() => router.push("/onboarding/profile")}>
          <Ionicons name="create-outline" size={17} color="#FFFFFF" />
          <AppText variant="small" weight="700" style={styles.primaryButtonText}>
            编辑个人资料
          </AppText>
        </Pressable>
      </View>

      <View style={styles.planCard}>
        <View style={styles.sectionHeader}>
          <View>
            <AppText variant="h3" weight="700">
              示例计划
            </AppText>
            <AppText variant="small" muted>
              用本地虚构数据快速查看界面变化。
            </AppText>
          </View>
          <Ionicons name="sparkles-outline" size={20} color={colors.warning} />
        </View>

        <View style={styles.actionGrid}>
          <ActionButton label="重新生成" icon="refresh-outline" onPress={regeneratePlan} primary />
          <ActionButton label="示例资料" icon="sparkles-outline" onPress={loadSampleProfile} />
          <ActionButton label="清除数据" icon="trash-outline" onPress={resetLocalData} danger />
        </View>
      </View>

      <View style={styles.settingsCard}>
        <AppText variant="h3" weight="700">
          安全与说明
        </AppText>
        <SettingRow icon="shield-checkmark-outline" title="本地原型" text="当前不上传个人资料和饮食数据。" />
        <SettingRow icon="medical-outline" title="免责声明" text="不提供疾病诊断、临床营养治疗或真实营养计算。" />
      </View>

      <Notice tone="warning" text="如有疾病、孕期、药物使用或特殊饮食需求，请咨询专业人员。" />
    </Screen>
  );
}

function ProfileStat({ label, value, icon }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={15} color={colors.primary} />
      <View style={styles.statText}>
        <AppText variant="tiny" muted>
          {label}
        </AppText>
        <AppText variant="small" weight="700" numberOfLines={1}>
          {value}
        </AppText>
      </View>
    </View>
  );
}

function ActionButton({
  label,
  icon,
  onPress,
  primary,
  danger
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  primary?: boolean;
  danger?: boolean;
}) {
  const textColor = primary ? "#FFFFFF" : danger ? colors.danger : colors.primary;

  return (
    <Pressable accessibilityRole="button" style={[styles.actionButton, primary && styles.actionButtonPrimary]} onPress={onPress}>
      <Ionicons name={icon} size={17} color={textColor} />
      <AppText variant="tiny" weight="700" style={{ color: textColor }}>
        {label}
      </AppText>
    </Pressable>
  );
}

function SettingRow({ icon, title, text }: { icon: keyof typeof Ionicons.glyphMap; title: string; text: string }) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={17} color={colors.primary} />
      </View>
      <View style={styles.settingText}>
        <AppText variant="small" weight="700">
          {title}
        </AppText>
        <AppText variant="tiny" muted>
          {text}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 18,
    backgroundColor: "#FFFDF7",
    padding: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  statusCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  scoreBadge: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  scoreText: {
    color: colors.primary
  },
  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  },
  stat: {
    width: "48%",
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: colors.background,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.sm
  },
  statText: {
    flex: 1
  },
  primaryButton: {
    minHeight: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  primaryButtonText: {
    color: "#FFFFFF"
  },
  planCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.md
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  actionGrid: {
    flexDirection: "row",
    gap: spacing.sm
  },
  actionButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs
  },
  actionButtonPrimary: {
    backgroundColor: colors.primary
  },
  settingsCard: {
    borderRadius: 20,
    backgroundColor: colors.surface,
    padding: spacing.md,
    gap: spacing.sm
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm
  },
  settingIcon: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.surfaceMuted,
    alignItems: "center",
    justifyContent: "center"
  },
  settingText: {
    flex: 1
  }
});
