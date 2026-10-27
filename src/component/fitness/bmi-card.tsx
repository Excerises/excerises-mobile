import { StyleSheet } from "react-native";
import { Text, View } from "../ui";
import { bmiCategories } from "@/constant/fitness/bmi-categories";
import { getBmiCategory } from "@/utils/fitness/bmi-category";
import { LinearGauge } from "../visual/gauge/linear-gauge";

export function BmiCard({ value }: { value: number }) {
  const bmiCategory = getBmiCategory(value);

  return (
    <View variant="card" style={styles.card}>
      <View variant="ghost" style={styles.bmiTop}>
        <View variant="ghost" style={{ gap: 4 }}>
          <Text variant="muted" size="xs">
            Your BMI
          </Text>
          <Text weight="bold" size="xl4">
            {value.toFixed(1)}
          </Text>
        </View>
        <View
          variant="ghost"
          style={[
            styles.categoryPill,
            { backgroundColor: `${bmiCategory.color}24` },
          ]}
        >
          <View
            variant="ghost"
            style={[styles.dot, { backgroundColor: bmiCategory.color }]}
          />
          <Text
            size="sm"
            weight="semibold"
            style={{ color: bmiCategory.color }}
          >
            {bmiCategory.name}
          </Text>
        </View>
      </View>
      <LinearGauge
        value={value}
        min={10}
        max={Math.max(...bmiCategories.map((c) => c.max))}
        ranges={bmiCategories.map((c) => c.max)}
        colors={bmiCategories.map((c) => c.color)}
        style={{ marginTop: 24 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    gap: 4,
  },
  bmiTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  categoryPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 9999,
  },
});
