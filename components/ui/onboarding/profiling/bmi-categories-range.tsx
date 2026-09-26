import { categories } from "@/constant/bmi";
import useThemeColor from "@/hooks/use-theme-color";
import { StyleSheet, View } from "react-native";

export interface BMICategoriesRangeProps {
  value?: number;
}

export default function BMICategoriesRange({
  value = 0,
}: BMICategoriesRangeProps) {
  const color = useThemeColor();
  const max = Math.max(...categories.map((c) => c.end));
  const percentage = value >= 0 ? (value > max ? 100 : (value / max) * 100) : 0;

  return (
    <View style={styles.flex}>
      {categories.map((c) => (
        <View
          key={c.label}
          style={[styles.range, { backgroundColor: c.color }]}
        ></View>
      ))}
      <View
        style={[
          styles.tick,
          {
            backgroundColor: color.foreground,
            left: `${percentage}%`,
            borderColor: color.border,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    position: "relative",
  },
  range: {
    height: 8,
    flex: 1,
  },
  tick: {
    width: 7,
    position: "absolute",
    top: -8,
    height: 16 + 8,
    zIndex: 1,
    borderRadius: 9999,
    borderWidth: 0.5,
  },
});
