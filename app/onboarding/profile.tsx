import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { ChoiceChip } from "@/components/ChoiceChip";
import { FormField } from "@/components/FormField";
import { Notice } from "@/components/Notice";
import { PrimaryButton } from "@/components/PrimaryButton";
import { Screen } from "@/components/Screen";
import { SectionTitle } from "@/components/SectionTitle";
import { activityOptions, genderOptions, goalOptions } from "@/data/options";
import { ActivityLevel, Gender, Goal } from "@/models/profile";
import { useAppStore } from "@/store/AppStore";
import { sampleOnboarding } from "@/store/defaults";
import { spacing } from "@/theme/spacing";
import { validateProfile } from "@/utils/validation";

export default function ProfileScreen() {
  const { onboarding, setProfile } = useAppStore();
  const [draft, setDraft] = useState(onboarding.profile);
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const nextErrors = validateProfile(draft);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    setProfile(draft);
    router.push("/onboarding/preferences");
  };

  return (
    <Screen>
      <SectionTitle title="先了解基本情况" subtitle="约 1 分钟。只填生成演示计划所需的核心信息。" />
      <Card>
        <View style={styles.stepRow}>
          <AppText variant="small" weight="700">
            1 / 3 个人资料
          </AppText>
          <PrimaryButton
            label="填入示例"
            icon="sparkles-outline"
            variant="quiet"
            onPress={() => setDraft(sampleOnboarding.profile)}
          />
        </View>
        <AppText variant="small" muted>
          不确定时可以先用示例资料体验，之后再回到“我的”里修改。
        </AppText>
      </Card>

      {errors.map((error) => (
        <Notice key={error} tone="error" text={error} />
      ))}

      <Card>
        <View style={styles.row}>
          <View style={styles.fieldHalf}>
            <FormField
              label="年龄"
              keyboardType="number-pad"
              value={draft.age}
              onChangeText={(age) => setDraft({ ...draft, age })}
              placeholder="例如 32"
            />
          </View>
          <View style={styles.fieldHalf}>
            <FormField
              label="身高 cm"
              keyboardType="number-pad"
              value={draft.heightCm}
              onChangeText={(heightCm) => setDraft({ ...draft, heightCm })}
              placeholder="例如 165"
            />
          </View>
        </View>
        <FormField
          label="体重 kg"
          keyboardType="decimal-pad"
          value={draft.weightKg}
          onChangeText={(weightKg) => setDraft({ ...draft, weightKg })}
          placeholder="例如 62"
        />
      </Card>

      <Card>
        <AppText weight="700">性别</AppText>
        <View style={styles.chips}>
          {genderOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={draft.gender === option.value}
              onPress={() => setDraft({ ...draft, gender: option.value as Gender })}
            />
          ))}
        </View>
      </Card>

      <Card>
        <AppText weight="700">活动水平</AppText>
        <View style={styles.chips}>
          {activityOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={draft.activityLevel === option.value}
              onPress={() => setDraft({ ...draft, activityLevel: option.value as ActivityLevel })}
            />
          ))}
        </View>
      </Card>

      <Card>
        <AppText weight="700">目标</AppText>
        <View style={styles.chips}>
          {goalOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={draft.goal === option.value}
              onPress={() => setDraft({ ...draft, goal: option.value as Goal })}
            />
          ))}
        </View>
      </Card>

      <PrimaryButton label="下一步：饮食偏好" icon="arrow-forward-outline" onPress={submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md
  },
  row: {
    flexDirection: "row",
    gap: spacing.md
  },
  fieldHalf: {
    flex: 1
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm
  }
});
