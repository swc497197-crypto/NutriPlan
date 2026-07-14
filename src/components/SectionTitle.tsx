import { View } from "react-native";
import { AppText } from "@/components/AppText";
import { spacing } from "@/theme/spacing";

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={{ gap: spacing.xs }}>
      <AppText variant="h2" weight="700">
        {title}
      </AppText>
      {subtitle ? (
        <AppText muted>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}
