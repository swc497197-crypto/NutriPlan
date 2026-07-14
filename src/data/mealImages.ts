import { ImageSourcePropType } from "react-native";

export type MealImageKey =
  | "oatEggBreakfast"
  | "wholeWheatChickenSandwich"
  | "tomatoBeefGrainBowl"
  | "steamedFishVegetables"
  | "tofuMushroomBowl"
  | "chickenVegetablePlate"
  | "yogurtFruitBowl"
  | "eggVegetableBreakfast"
  | "beefGrainMeal"
  | "homestyleTofuSet"
  | "fruitSnackPlate"
  | "leafyGreensGrain";

export const mealImages: Record<MealImageKey, ImageSourcePropType> = {
  oatEggBreakfast: require("../../assets/images/meals/oat-egg-breakfast.jpg"),
  wholeWheatChickenSandwich: require("../../assets/images/meals/whole-wheat-chicken-sandwich.jpg"),
  tomatoBeefGrainBowl: require("../../assets/images/meals/tomato-beef-grain-bowl.jpg"),
  steamedFishVegetables: require("../../assets/images/meals/steamed-fish-vegetables.jpg"),
  tofuMushroomBowl: require("../../assets/images/meals/tofu-mushroom-bowl.jpg"),
  chickenVegetablePlate: require("../../assets/images/meals/chicken-vegetable-plate.jpg"),
  yogurtFruitBowl: require("../../assets/images/meals/yogurt-fruit-bowl.jpg"),
  eggVegetableBreakfast: require("../../assets/images/meals/egg-vegetable-breakfast.jpg"),
  beefGrainMeal: require("../../assets/images/meals/beef-grain-meal.jpg"),
  homestyleTofuSet: require("../../assets/images/meals/homestyle-tofu-set.jpg"),
  fruitSnackPlate: require("../../assets/images/meals/fruit-snack-plate.jpg"),
  leafyGreensGrain: require("../../assets/images/meals/leafy-greens-grain.jpg")
};

export function getMealImageSource(image?: string) {
  if (!image || !(image in mealImages)) return undefined;
  return mealImages[image as MealImageKey];
}
