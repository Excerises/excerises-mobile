import { useProfiling } from "@/components/provider/onboarding/profiling-provider";
import UIText from "@/components/ui/common/text";
import BMICategoriesCard from "@/components/ui/onboarding/profiling/bmi-categories-card";
import BMICategoriesRange from "@/components/ui/onboarding/profiling/bmi-categories-range";
import { ProfilingLayout } from "@/components/ui/onboarding/profiling/profiling-layout";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { StyleSheet, View } from "react-native";

export default function BMIResultPage() {
  const router = useRouter();
  const { bmi, calculateBmi } = useProfiling();

  function onContinue() {
    router.push("/profiling/workout-routine");
  }

  useEffect(() => {
    calculateBmi();
  }, []);

  return (
    <ProfilingLayout
      title="Your BMI Result"
      description="Based on your height and weight, here is your body mass index (BMI)."
      onContinue={onContinue}
      currentStep={2}
    >
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <UIText style={styles.bmiResult}>{bmi.toFixed(1)}</UIText>
          <BMICategoriesRange value={bmi} />
        </View>
        <BMICategoriesCard />
      </View>
    </ProfilingLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bmiResult: {
    fontSize: 72,
    fontWeight: "bold",
    marginBottom: 30,
  },
  resultContainer: {
    marginTop: 10,
    alignItems: "center",
    marginBottom: 30,
  },
});
