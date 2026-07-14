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
      <SectionTitle title="先了解基本情况" subtitle="只收集生成演示计划所需的最少信息。" />
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

      <PrimaryButton label="下一步" icon="arrow-forward-outline" onPress={submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
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
