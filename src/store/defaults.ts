import { OnboardingState } from "@/models/profile";

export const emptyOnboarding: OnboardingState = {
  profile: {
    age: "",
    gender: "",
    heightCm: "",
    weightKg: "",
    activityLevel: "",
    goal: ""
  },
  preferences: {
    allergies: "",
    dislikedFoods: "",
    dietStyle: ["普通中式"],
    mealBudget: "35",
    cookingTime: "under30",
    kitchenTools: ["电饭煲", "炒锅"]
  },
  genetics: ["none"],
  completed: false
};

export const sampleOnboarding: OnboardingState = {
  profile: {
    age: "32",
    gender: "female",
    heightCm: "165",
    weightKg: "62",
    activityLevel: "medium",
    goal: "gentleFatLoss"
  },
  preferences: {
    allergies: "无",
    dislikedFoods: "肥肉、动物内脏",
    dietStyle: ["普通中式", "少油少盐", "工作日便当"],
    mealBudget: "40",
    cookingTime: "under30",
    kitchenTools: ["电饭煲", "炒锅", "蒸锅"]
  },
  genetics: ["salt"],
  completed: true
};
