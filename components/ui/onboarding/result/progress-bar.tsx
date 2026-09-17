import { StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

type ProgressBarProps = {
  progress: number;
  color: string;
};

export default function ProgressBar({ progress, color }: ProgressBarProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.border,
        },
      ]}
    >
      <View
        style={[
          styles.progress,
          {
            width: `${progress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 8,
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 28,
  },

  progress: {
    height: "100%",
    borderRadius: 10,
  },
});
