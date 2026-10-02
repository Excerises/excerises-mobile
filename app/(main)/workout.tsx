import {
  StartWorkoutProvider,
  useStartWorkout,
} from "@/components/provider/main/start-workout-provider";
import UIView from "@/components/ui/common/view";
import WorkoutPreferenceStep from "@/components/ui/main/workout/workout-preference";
import useThemeColor from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, View } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

export default function WorkoutPage() {
  return (
    <StartWorkoutProvider>
      <WorkoutPageContent />
    </StartWorkoutProvider>
  );
}

function WorkoutPageContent() {
  const router = useRouter();
  const color = useThemeColor();
  const { step, setStep } = useStartWorkout();

  const Component = useMemo(() => {
    try {
      return {
        1: WorkoutPreferenceStep,
      }[step] as any;
    } catch (_) {
      return WorkoutPreferenceStep;
    }
  }, [step]);

  function handleBack() {
    console.log(step);
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  }

  return (
    <UIView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={handleBack}>
          <ArrowLeftIcon color={color.foreground} />
        </Pressable>
      </View>
      <Component />
    </UIView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
