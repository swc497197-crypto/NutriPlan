import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { ChoiceChip } from "@/components/ChoiceChip";
import { Notice } from "@/components/Notice";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { geneticOptions } from "@/data/options";
import { GeneticPreference } from "@/models/profile";
import { useAppStore } from "@/store/AppStore";
import { spacing } from "@/theme/spacing";

export default function GeneticsScreen() {
  const { onboarding, setGenetics, completeOnboarding } = useAppStore();
  const [draft, setDraft] = useState<GeneticPreference[]>(onboarding.genetics);

  const toggle = (value: GeneticPreference) => {
    if (value === "none") {
      setDraft(["none"]);
      return;
    }
    const withoutNone = draft.filter((item) => item !== "none");
    setDraft(withoutNone.includes(value) ? withoutNone.filter((item) => item !== value) : [...withoutNone, value]);
  };

  const finish = () => {
    setGenetics(draft.length > 0 ? draft : ["none"]);
    completeOnboarding();
    router.replace("/(tabs)/plan");
  };

  return (
    <Screen>
      <SectionTitle title="基因营养倾向" subtitle="可跳过。这里只演示如何辅助调整饮食建议。" />
      <Card>
        <AppText variant="small" weight="700">
          3 / 3 可选信息
        </AppText>
        <AppText variant="small" muted>
          没有检测信息时，选择“暂无相关检测信息”即可。
        </AppText>
      </Card>
      <Notice text="基因信息仅用于辅助调整饮食建议，不能单独用于诊断营养缺乏。" />
      <Card>
        <AppText weight="700">模拟选择</AppText>
        <View style={styles.chips}>
          {geneticOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={draft.includes(option.value)}
              onPress={() => toggle(option.value)}
            />
          ))}
        </View>
      </Card>
      <PrimaryButton label="生成七日计划" icon="checkmark-outline" onPress={finish} />
      <PrimaryButton
        label="跳过"
        variant="quiet"
        onPress={() => {
          setGenetics(["none"]);
          completeOnboarding();
          router.replace("/(tabs)/plan");
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
