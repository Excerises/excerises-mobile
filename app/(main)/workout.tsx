import {
  StartWorkoutProvider,
  useStartWorkout,
} from "@/components/provider/main/start-workout-provider";
import UIView from "@/components/ui/common/view";
import WorkoutPreferenceStep from "@/components/ui/main/workout/workout-preference";
import WorkoutSelectExercises from "@/components/ui/main/workout/workout-select-exercises";
import useThemeColor from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import { ArrowLeftIcon, View } from "lucide-react-native";
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

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
        2: WorkoutSelectExercises,
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
        <TouchableOpacity
          style={{ height: 30, width: 30 }}
          onPress={handleBack}
        >
          <ArrowLeftIcon size={24} color={color.foreground} />
        </TouchableOpacity>
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
