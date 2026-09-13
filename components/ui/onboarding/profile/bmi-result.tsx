import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import {
  useEffect,
  useState,
} from "react";

import {
  StyleSheet,
  View,
} from "react-native";

import Svg, {
  Path,
} from "react-native-svg";

type BMIResultProps = {
  value: string;
  status: string;
  statusColor?: string;
};

export default function BMIResult({
  value,
  status,
  statusColor = "#16C84E",
}: BMIResultProps) {
  const themeColor = useThemeColor();

  const bmi = parseFloat(
    value.replace(",", "."),
  );

  const normalizedBMI = Math.min(
    Math.max((bmi - 15) / 20, 0),
    1,
  );

  const size = 190;

  const center = size / 2;

  const radius = 72;

  const arcLength =
    2 * Math.PI * radius * 0.75;

  const targetArc =
    arcLength * normalizedBMI;

  const [dashOffset, setDashOffset] =
    useState(arcLength);

  const startAngle =
    (135 * Math.PI) / 180;

  const startPoint = {
    x:
      center +
      radius * Math.cos(startAngle),
    y:
      center +
      radius * Math.sin(startAngle),
  };

  const endAngle =
    (405 * Math.PI) / 180;

  const endPoint = {
    x:
      center +
      radius * Math.cos(endAngle),
    y:
      center +
      radius * Math.sin(endAngle),
  };

  const arcPath = `
    M ${startPoint.x} ${startPoint.y}
    A ${radius} ${radius} 0 1 1 ${endPoint.x} ${endPoint.y}
  `;

  useEffect(() => {
    let frame = 0;

    const totalFrames = 60;

    const interval = setInterval(() => {
      frame += 1;

      const progress = Math.min(
        frame / totalFrames,
        1,
      );

      const currentOffset =
        arcLength -
        targetArc * progress;

      setDashOffset(currentOffset);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 20);

    return () => {
      clearInterval(interval);
    };
  }, [arcLength, targetArc]);

  return (
    <View style={styles.container}>

      <View style={styles.chartContainer}>
        <Svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >

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
            stroke={themeColor.destructive}
            strokeWidth={14}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={dashOffset}
          />
        </Svg>


        <View style={styles.centerContent}>

          <UIText style={styles.value}>
            {value}
          </UIText>


          <UIText
            style={[
              styles.status,
              {
                color: statusColor,
              },
            ]}
          >
            {status}
          </UIText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },

  chartContainer: {
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
  },

  centerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
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
});