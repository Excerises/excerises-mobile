import useThemeColor from "@/hooks/use-theme-color";
import UIText from "../../common/text";
import UIView from "../../common/view";
import { StyleSheet, View } from "react-native";
import { categories } from "@/constant/bmi";

export default function BMICategoriesCard() {
  const color = useThemeColor();

  return (
    <UIView
      variant="card"
      style={[
        styles.categories,
        {
          backgroundColor: color.card,
        },
      ]}
    >
      <UIText style={styles.categoryTitle}>BMI Categories</UIText>

      {categories.map((category) => (
        <View key={category.label} style={styles.categoryRow}>
          <View
            style={[
              styles.dot,
              {
                backgroundColor: category.color,
              },
            ]}
          />

          <UIText style={styles.range}>{category.range}</UIText>

          <UIText style={styles.label}>{category.label}</UIText>
        </View>
      ))}
    </UIView>
  );
}

const styles = StyleSheet.create({
  categories: {
    width: "100%",
    padding: 16,
    borderRadius: 6,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: "500",
    marginBottom: 10,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginRight: 10,
  },
  range: {
    width: 90,
    fontSize: 14,
  },
  label: {
    fontSize: 14,
  },
});
