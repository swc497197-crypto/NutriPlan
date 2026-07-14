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
import { cookingTimeOptions, dietStyleOptions, kitchenToolOptions } from "@/data/options";
import { CookingTime } from "@/models/profile";
import { useAppStore } from "@/store/AppStore";
import { spacing } from "@/theme/spacing";
import { validatePreferences } from "@/utils/validation";

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export default function PreferencesScreen() {
  const { onboarding, setPreferences } = useAppStore();
  const [draft, setDraft] = useState(onboarding.preferences);
  const [errors, setErrors] = useState<string[]>([]);

  const submit = () => {
    const nextErrors = validatePreferences(draft);
    setErrors(nextErrors);
    if (nextErrors.length > 0) return;
    setPreferences(draft);
    router.push("/onboarding/genetics");
  };

  return (
    <Screen>
      <SectionTitle title="饮食偏好" subtitle="让计划更接近日常生活，而不是只停留在表格里。" />
      {errors.map((error) => (
        <Notice key={error} tone="error" text={error} />
      ))}
      <Card>
        <FormField
          label="过敏食物"
          value={draft.allergies}
          onChangeText={(allergies) => setDraft({ ...draft, allergies })}
          placeholder="例如 花生、海鲜；没有可填无"
        />
        <FormField
          label="不喜欢的食物"
          value={draft.dislikedFoods}
          onChangeText={(dislikedFoods) => setDraft({ ...draft, dislikedFoods })}
          placeholder="例如 苦瓜、肥肉"
        />
        <FormField
          label="每餐预算 元"
          keyboardType="number-pad"
          value={draft.mealBudget}
          onChangeText={(mealBudget) => setDraft({ ...draft, mealBudget })}
          placeholder="例如 35"
        />
      </Card>

      <Card>
        <AppText weight="700">饮食方式</AppText>
        <View style={styles.chips}>
          {dietStyleOptions.map((option) => (
            <ChoiceChip
              key={option}
              label={option}
              selected={draft.dietStyle.includes(option)}
              onPress={() => setDraft({ ...draft, dietStyle: toggle(draft.dietStyle, option) })}
            />
          ))}
        </View>
      </Card>

      <Card>
        <AppText weight="700">可接受烹饪时间</AppText>
        <View style={styles.chips}>
          {cookingTimeOptions.map((option) => (
            <ChoiceChip
              key={option.value}
              label={option.label}
              selected={draft.cookingTime === option.value}
              onPress={() => setDraft({ ...draft, cookingTime: option.value as CookingTime })}
            />
          ))}
        </View>
      </Card>

      <Card>
        <AppText weight="700">可用厨房设备</AppText>
        <View style={styles.chips}>
          {kitchenToolOptions.map((option) => (
            <ChoiceChip
              key={option}
              label={option}
              selected={draft.kitchenTools.includes(option)}
              onPress={() => setDraft({ ...draft, kitchenTools: toggle(draft.kitchenTools, option) })}
            />
          ))}
        </View>
      </Card>

      <PrimaryButton label="下一步" icon="arrow-forward-outline" onPress={submit} />
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
