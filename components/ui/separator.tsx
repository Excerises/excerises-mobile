import { StyleSheet, View } from "react-native";
import useThemeColor from "@/hooks/use-theme-color";

export default function Separator() {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.line,
        {
          backgroundColor: themeColor.border,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    flex: 1,
    height: 1,
  },
});
