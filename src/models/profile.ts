export type Gender = "female" | "male" | "other";
export type ActivityLevel = "low" | "medium" | "high";
export type Goal = "balanced" | "gentleFatLoss";
export type CookingTime = "under15" | "under30" | "under45";

export type UserProfile = {
  age: string;
  gender: Gender | "";
  heightCm: string;
  weightKg: string;
  activityLevel: ActivityLevel | "";
  goal: Goal | "";
};

export type DietPreferences = {
  allergies: string;
  dislikedFoods: string;
  dietStyle: string[];
  mealBudget: string;
  cookingTime: CookingTime | "";
  kitchenTools: string[];
};

export type GeneticPreference =
  | "lactose"
  | "caffeine"
  | "folate"
  | "salt"
  | "none";

export type OnboardingState = {
  profile: UserProfile;
  preferences: DietPreferences;
  genetics: GeneticPreference[];
  completed: boolean;
};
