import { DietPreferences, UserProfile } from "@/models/profile";

export function validateProfile(profile: UserProfile) {
  const errors: string[] = [];
  const age = Number(profile.age);
  const height = Number(profile.heightCm);
  const weight = Number(profile.weightKg);

  if (!age || age < 18 || age > 80) errors.push("年龄请填写 18-80 之间的数字");
  if (!profile.gender) errors.push("请选择性别");
  if (!height || height < 120 || height > 220) errors.push("身高请填写 120-220 cm");
  if (!weight || weight < 35 || weight > 180) errors.push("体重请填写 35-180 kg");
  if (!profile.activityLevel) errors.push("请选择活动水平");
  if (!profile.goal) errors.push("请选择目标");

  return errors;
}

export function validatePreferences(preferences: DietPreferences) {
  const errors: string[] = [];
  const budget = Number(preferences.mealBudget);

  if (!budget || budget < 10 || budget > 200) errors.push("每餐预算请填写 10-200 元");
  if (!preferences.cookingTime) errors.push("请选择可接受的烹饪时间");
  if (preferences.kitchenTools.length === 0) errors.push("请至少选择一种厨房设备");

  return errors;
}
