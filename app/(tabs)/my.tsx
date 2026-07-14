import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Notice } from "@/components/Notice";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export default function MyScreen() {
  const { onboarding, regeneratePlan, resetLocalData, loadSampleProfile } = useAppStore();

  return (
    <Screen>
      <View>
        <AppText variant="h1" weight="700">
          我的
        </AppText>
        <AppText muted>查看资料、重新生成示例计划和免责声明。</AppText>
      </View>

      <Card>
        <AppText variant="h3" weight="700">
          个人资料
        </AppText>
        <View style={styles.profileGrid}>
          <ProfileLine label="年龄" value={onboarding.profile.age ? `${onboarding.profile.age} 岁` : "未填写"} />
          <ProfileLine label="身高" value={onboarding.profile.heightCm ? `${onboarding.profile.heightCm} cm` : "未填写"} />
          <ProfileLine label="体重" value={onboarding.profile.weightKg ? `${onboarding.profile.weightKg} kg` : "未填写"} />
          <ProfileLine label="预算" value={`${onboarding.preferences.mealBudget || "未填写"} 元/餐`} />
        </View>
        <PrimaryButton label="编辑资料" icon="create-outline" variant="secondary" onPress={() => router.push("/onboarding/profile")} />
      </Card>

      <Card>
        <AppText variant="h3" weight="700">
          示例计划
        </AppText>
        <AppText muted>重新生成会切换本地演示计划排序，便于查看加载状态和界面变化。</AppText>
        <PrimaryButton label="重新生成示例计划" icon="refresh-outline" onPress={regeneratePlan} />
        <PrimaryButton label="载入示例资料" icon="sparkles-outline" variant="secondary" onPress={loadSampleProfile} />
        <PrimaryButton label="清除本地数据" icon="trash-outline" variant="quiet" onPress={resetLocalData} />
      </Card>

      <Notice
        tone="warning"
        text="免责声明：本原型不提供疾病诊断、临床营养治疗、真实营养计算或补充剂推荐。若有疾病、孕期、药物使用或特殊饮食需求，请咨询专业人员。"
      />
    </Screen>
  );
}

function ProfileLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.line}>
      <AppText variant="small" muted>
        {label}
      </AppText>
      <AppText weight="700" style={{ color: colors.text }}>
        {value}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  profileGrid: {
    gap: spacing.sm
  },
  line: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  }
});
