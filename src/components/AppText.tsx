import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";
import { colors } from "@/theme/colors";
import { typography } from "@/theme/typography";

type AppTextProps = PropsWithChildren<
  TextProps & {
    variant?: "title" | "h1" | "h2" | "h3" | "body" | "small" | "tiny";
    muted?: boolean;
    weight?: "400" | "500" | "600" | "700";
  }
>;

export function AppText({ children, variant = "body", muted, weight = "400", style, ...props }: AppTextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          color: muted ? colors.textMuted : colors.text,
          fontSize: typography[variant],
          fontWeight: weight,
          lineHeight: typography[variant] * 1.35
        },
        style
      ]}
    >
      {children}
    </Text>
  );
}
