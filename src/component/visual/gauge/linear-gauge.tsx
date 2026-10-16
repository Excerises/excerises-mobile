import { Text, View } from "@/component/ui";
import { Borders } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";

export interface LinearGaugeProps {
  min?: number;
  max?: number;
  ranges: number[];
  colors: string[];
  value: number;
  style?: StyleProp<ViewStyle>;
}

export function LinearGauge({
  min = 0,
  max = 100,
  ranges,
  colors,
  style,
  value,
}: LinearGaugeProps) {
  const themeColor = useThemeColor();
  const normalizedValue = value > max ? max : value < min ? min : value;
  const markPosition = ((normalizedValue - min) / (max - min)) * 100;

  return (
    <View variant="ghost" style={styles.container}>
      <View variant="card" style={[styles.gauge, style]}>
        {ranges.map((r, i) => {
          const width = ((r - min) / (max - min)) * 100;

          return (
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: colors[i],
                  width: `${width}%`,
                  zIndex: -i,
                },
              ]}
              key={i}
            />
          );
        })}
      </View>
      <View
        variant="ghost"
        style={[
          styles.mark,
          {
            backgroundColor: themeColor.foreground,
            left: `${markPosition}%`,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gauge: {
    height: 10,
    overflow: "hidden",
    borderRadius: 9999,
    position: "relative",
    width: "100%",
  },
  bar: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
  },
  container: {
    position: "relative",
    width: "100%",
  },
  mark: {
    position: "absolute",
    height: 30,
    width: 10,
    top: 8,
    borderRadius: Borders.radius.sm,
  },
});
