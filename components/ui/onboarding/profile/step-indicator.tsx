import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <View style={styles.steps}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber <= currentStep;

          return (
            <View
              key={stepNumber}
              style={[
                styles.step,
                {
                  backgroundColor: isCompleted
                    ? themeColor.primary
                    : themeColor.border,
                },
              ]}
            />
          );
        })}
      </View>

      <UIText style={styles.counter}>
        {currentStep}/{totalSteps}
      </UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 24,
    position: "relative",
    alignItems: "center",
  },

  steps: {
    flexDirection: "row",
    gap: 4,
    position: "absolute",
    left: "50%",
    transform: [{ translateX: -54 }],
  },

  step: {
    width: 32,
    height: 7,
    borderRadius: 10,
  },

  counter: {
    fontSize: 13,
    position: "absolute",
    right: 0,
  },
});
