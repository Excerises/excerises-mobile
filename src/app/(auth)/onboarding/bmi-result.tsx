import { BmiCategoriesCard } from "@/component/fitness/bmi-categories-card";
import { OnboardingScreen } from "@/component/screen/onboarding-screen";
import { View, Text } from "@/component/ui";
import { LinearGauge } from "@/component/visual/gauge/linear-gauge";
import { bmiCategories } from "@/constant/fitness/bmi-categories";
import { useOnboarding } from "@/context/onboarding-context";
import { getBmiCategory } from "@/utils/fitness/bmi-category";
import { useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";

export default function Page() {
  const { setStep, data } = useOnboarding();

  useEffect(() => {
    setStep(2);
  }, []);

  const bmiCategory = useMemo(() => {
    return getBmiCategory(data.bmi || 0);
  }, [data.bmi]);

  return (
    <OnboardingScreen
      title="Your BMI Result"
      description="Based on your data, here is your BMI (Body Mass Index)."
    >
      <View variant="ghost" style={styles.value}>
        <Text weight="bold" size="xl7">
          {(data.bmi || 0).toFixed(1)}
        </Text>
        <Text weight="semibold" style={{ color: bmiCategory.color }}>
          {bmiCategory.name}
        </Text>
        <LinearGauge
          value={data.bmi || 0}
          min={10}
          max={Math.max(...bmiCategories.map((c) => c.max))}
          ranges={bmiCategories.map((c) => c.max)}
          colors={bmiCategories.map((c) => c.color)}
          style={{ marginTop: 20 }}
        />
      </View>
      <BmiCategoriesCard />
    </OnboardingScreen>
  );
}

const styles = StyleSheet.create({
  value: {
    paddingTop: 20,
    paddingBottom: 30,
    alignItems: "center",
  },
});
