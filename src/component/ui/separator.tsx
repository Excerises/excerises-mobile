import { useThemeColor } from "@/hook/use-theme-color";
import { View } from "react-native";

export type SeparatorProps = {
  borderWidth?: number;
  borderColor?: string;
  axis?: "vertical" | "horizontal";
};

export function Separator({
  axis = "horizontal",
  borderWidth = 1,
  borderColor,
}: SeparatorProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={{
        backgroundColor: borderColor || themeColor.border,
        width: axis === "vertical" ? borderWidth : undefined,
        height: axis === "horizontal" ? borderWidth : undefined,
        flex: 1,
      }}
    ></View>
  );
}
