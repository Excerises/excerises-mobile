import UIText from "@/components/ui/text";

import { StyleSheet, View } from "react-native";

type StepIndicatorProps = {
  currentStep: number;
  totalSteps: number;
};

export default function StepIndicator({
  currentStep,
  totalSteps,
}: StepIndicatorProps) {
  return (
    <View style={styles.container}>

      <View style={styles.steps}>
        {Array.from({
          length: totalSteps,
        }).map((_, index) => {
          const stepNumber = index + 1;

          const isCompleted =
            stepNumber <= currentStep;

          return (
            <View
              key={stepNumber}
              style={[
                styles.step,
                isCompleted && styles.activeStep,
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
    backgroundColor: "#292929",
  },

  activeStep: {
    backgroundColor: "#d00000",
  },

  counter: {
    fontSize: 13,
    position: "absolute",
    right: 0,
  },
});