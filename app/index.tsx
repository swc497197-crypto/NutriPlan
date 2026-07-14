import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Notice } from "@/components/Notice";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { useAppStore } from "@/store/AppStore";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

export default function WelcomeScreen() {
  const { loadSampleProfile } = useAppStore();

  return (
    <Screen>
      <View style={styles.hero}>
        <View style={styles.mark}>
          <Ionicons name="nutrition-outline" size={34} color={colors.primary} />
        </View>
        <AppText variant="title" weight="700">
          NutriPlan
        </AppText>
        <AppText variant="h3" muted style={styles.center}>
          为中国职场人生成可执行的七日中式饮食计划、菜谱和购物清单。
        </AppText>
      </View>

      <Card>
        <AppText variant="h2" weight="700">
          温和、清楚、能买到
        </AppText>
        <AppText muted>
          根据身体资料、饮食偏好、预算、烹饪时间和可选的基因营养倾向，整理成更容易执行的一周安排。
        </AppText>
      </Card>

      <Notice
        tone="warning"
        text="本产品不提供疾病诊断或临床营养治疗。当前原型仅使用虚构测试数据，用于界面演示。"
      />

      <View style={styles.actions}>
        <PrimaryButton label="开始制定计划" icon="arrow-forward-outline" onPress={() => router.push("/onboarding/profile")} />
        <PrimaryButton
          label="使用示例资料体验"
          icon="sparkles-outline"
          variant="secondary"
          onPress={() => {
            loadSampleProfile();
            router.replace("/(tabs)/plan");
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 280,
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.md
  },
  mark: {
    width: 72,
    height: 72,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceMuted
  },
  center: {
    textAlign: "center"
  },
  actions: {
    gap: spacing.md
  }
});
