import { StyleSheet } from "react-native";
import { Text, View } from "../ui";
import { Borders } from "@/constant/theme";
import { bmiCategories } from "@/constant/fitness/bmi-categories";

export function BmiCategoriesCard() {
  return (
    <View variant="card" style={styles.card}>
      <Text weight="semibold">BMI Categories</Text>
      <View variant="ghost" style={styles.cardContent}>
        {bmiCategories.map((c, i) => (
          <View style={styles.item} variant="ghost" key={i}>
            <View
              variant="ghost"
              style={[styles.itemDot, { backgroundColor: c.color }]}
            ></View>
            <Text size="sm" style={styles.itemIndicator}>
              {c.indicator}
            </Text>
            <Text size="sm">{c.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: Borders.radius.lg,
    gap: 10,
  },
  cardContent: {
    gap: 4,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  itemDot: {
    height: 8,
    width: 8,
    borderRadius: 9999,
  },
  itemIndicator: {
    width: 100,
  },
});
