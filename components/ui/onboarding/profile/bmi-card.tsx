import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Path } from "react-native-svg";

import UIText from "@/components/ui/common/text";
import useThemeColor from "@/hooks/use-theme-color";

type BMICardProps = {
  value: string;
  status: string;
};

const categories = [
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

export default function BMICard({ value, status }: BMICardProps) {
  const themeColor = useThemeColor();

  const bmi = parseFloat(value.replace(",", "."));
  const progress = Math.min(Math.max((bmi - 15) / 20, 0), 1);

  const size = 190;
  const radius = 72;
  const center = size / 2;
  const arcLength = 2 * Math.PI * radius * 0.75;

  const [dashOffset, setDashOffset] = useState(arcLength);

  const startAngle = (135 * Math.PI) / 180;
  const endAngle = (405 * Math.PI) / 180;

  const startPoint = {
    x: center + radius * Math.cos(startAngle),
    y: center + radius * Math.sin(startAngle),
  };

  const endPoint = {
    x: center + radius * Math.cos(endAngle),
    y: center + radius * Math.sin(endAngle),
  };

  const arcPath = `
    M ${startPoint.x} ${startPoint.y}
    A ${radius} ${radius} 0 1 1 ${endPoint.x} ${endPoint.y}
  `;

  useEffect(() => {
    const targetOffset = arcLength * (1 - progress);
    let current = arcLength;

    const interval = setInterval(() => {
      current -= (arcLength - targetOffset) / 30;

      if (current <= targetOffset) {
        setDashOffset(targetOffset);
        clearInterval(interval);
        return;
      }

      setDashOffset(current);
    }, 20);

    return () => clearInterval(interval);
  }, [arcLength, progress]);

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <Svg width={size} height={size}>
          <Path
            d={arcPath}
            fill="none"
            stroke={themeColor.border}
            strokeWidth={14}
            strokeLinecap="round"
          />

          <Path
            d={arcPath}
            fill="none"
            stroke={themeColor.primary}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
          />
        </Svg>

        <View style={styles.center}>
          <UIText style={styles.value}>{value}</UIText>

          <UIText
            style={[
              styles.status,
              {
                color: themeColor.primary,
              },
            ]}
          >
            {status}
          </UIText>
        </View>
      </View>

      <View
        style={[
          styles.categories,
          {
            backgroundColor: themeColor.card,
          },
        ]}
      >
        <UIText style={styles.categoryTitle}>
          BMI Categories (Asia-Pacific Standard)
        </UIText>

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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  chart: {
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },

  center: {
    position: "absolute",
    alignItems: "center",
  },

  value: {
    fontSize: 42,
    fontWeight: "bold",
  },

  status: {
    fontSize: 22,
    fontWeight: "600",
    marginTop: 2,
  },

  categories: {
    width: "100%",
    marginTop: 22,
    padding: 10,
    borderRadius: 6,
  },

  categoryTitle: {
    fontSize: 12,
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
    fontSize: 12,
  },

  label: {
    fontSize: 12,
  },
});
