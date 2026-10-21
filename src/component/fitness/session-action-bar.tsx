import { useThemeColor } from "@/hook/use-theme-color";
import { ReactNode } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "../ui";

interface SessionActionBarProps {
  children?: ReactNode;
}

export function SessionActionBar({ children }: SessionActionBarProps) {
  const themeColor = useThemeColor();

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[
        styles.bar,
        {
          backgroundColor: themeColor.background,
          borderTopColor: themeColor.border,
        },
      ]}
    >
      <View variant="ghost" style={styles.content}>
        {children}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bar: {
    marginHorizontal: -16,
    borderTopWidth: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 4,
    gap: 12,
  },
});
