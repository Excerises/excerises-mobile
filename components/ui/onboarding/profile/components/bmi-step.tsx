import { StyleSheet } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";
import BMICard from "@/components/ui/onboarding/profile/bmi-card";

type BMIStepProps = {
  value: string;
  status: string;
  onNext: () => void;
};

export default function BMIStep({ value, status, onNext }: BMIStepProps) {
  return (
    <>
      <UIText style={styles.title}>Your BMI Result</UIText>

      <UIText style={styles.subtitle}>
        Based on your height and weight,
        {"\n"}
        here is your body mass index (BMI).
      </UIText>

      <BMICard value={value} status={status} />

      <UIButton
        style={styles.mainButton}
        label="Continue"
        variant="primary"
        onPress={onNext}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  subtitle: {
    fontSize: 16,
    marginTop: 4,
  },

  mainButton: {
    width: "100%",
    height: 48,
    marginTop: 30,
    borderRadius: 6,
  },
});
