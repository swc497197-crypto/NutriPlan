import { PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { colors } from "@/theme/colors";

export function IPhonePreviewFrame({ children }: PropsWithChildren) {
  if (Platform.OS !== "web") return <>{children}</>;

  return (
    <View style={styles.desktop}>
      <View style={styles.phone}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  desktop: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#E8EDE6"
  },
  phone: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    backgroundColor: colors.background,
    overflow: "hidden"
  }
});
