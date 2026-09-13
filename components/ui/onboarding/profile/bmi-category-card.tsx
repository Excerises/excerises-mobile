import UIText from "@/components/ui/text";
import { StyleSheet, View } from "react-native";

type BMICategory = {
  color: string;
  range: string;
  label: string;
};

type BMICategoryCardProps = {
  categories?: BMICategory[];
};

const defaultCategories: BMICategory[] = [
  {
    color: "#55E36A",
    range: "< 18,5",
    label: "Underweight",
  },
  {
    color: "#55E36A",
    range: "18,5 - 22,9",
    label: "Normal",
  },
  {
    color: "#FFC107",
    range: "23,0 - 24,9",
    label: "Overweight",
  },
  {
    color: "#FF1717",
    range: "≥ 25,0",
    label: "Obesity",
  },
];

export default function BMICategoryCard({
  categories = defaultCategories,
}: BMICategoryCardProps) {
  return (
    <View style={styles.card}>

      <UIText style={styles.title}>
        BMI Categories (Asia-Pacific Standard)
      </UIText>


      {categories.map((category) => (
        <View key={category.label} style={styles.row}>

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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 22,
    padding: 10,
    borderRadius: 6,
    backgroundColor: "#292929",
  },

  title: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 10,
  },

  row: {
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
    fontSize: 12,
  },

  label: {
    fontSize: 12,
  },
});
