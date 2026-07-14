import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Image, ImageStyle, StyleSheet, View, ViewStyle } from "react-native";
import { getMealImageSource } from "@/data/mealImages";
import { colors } from "@/theme/colors";
import { spacing } from "@/theme/spacing";

type MealImageProps = {
  image?: string;
  variant?: "thumb" | "hero";
  style?: ViewStyle;
};

export function MealImage({ image, variant = "thumb", style }: MealImageProps) {
  const [failed, setFailed] = useState(false);
  const source = getMealImageSource(image);
  const isHero = variant === "hero";

  if (!source || failed) {
    return (
      <View style={[styles.base, isHero ? styles.hero : styles.thumb, styles.placeholder, style]}>
        <Ionicons name="restaurant-outline" size={isHero ? 34 : 22} color={colors.primary} />
      </View>
    );
  }

  return (
    <Image
      source={source}
      resizeMode="cover"
      onError={() => setFailed(true)}
      style={[styles.base, isHero ? styles.hero : styles.thumb, style] as ImageStyle[]}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 8,
    backgroundColor: colors.surfaceMuted
  },
  thumb: {
    width: 96,
    height: 72
  },
  hero: {
    width: "100%",
    aspectRatio: 4 / 3
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.sm
  }
});
