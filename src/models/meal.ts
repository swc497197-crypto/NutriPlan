export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type Ingredient = {
  name: string;
  amount: string;
  substitutes?: string[];
};

export type Meal = {
  id: string;
  day: number;
  type: MealType;
  name: string;
  calories: number;
  protein: number;
  reason: string;
  timeMinutes: number;
  difficulty: "简单" | "适中";
  ingredients: Ingredient[];
  steps: string[];
  nutritionSummary: string;
  tags: string[];
  image?: string;
};

export type DayPlan = {
  day: number;
  title: string;
  meals: Meal[];
};

export type ShoppingCategory =
  | "蔬菜水果"
  | "肉蛋奶和豆制品"
  | "主食"
  | "调料"
  | "其他";

export type ShoppingItem = {
  id: string;
  category: ShoppingCategory;
  name: string;
  amount: string;
};
