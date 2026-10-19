import { Exercise } from "@/../type/entity";
import { ExerciseCard } from "./exercise-card";
import { useThemeColor } from "@/hook/use-theme-color";
import { Checkbox } from "expo-checkbox";

interface SelectExerciseCardProps {
  exercise: Exercise;
  selected?: boolean;
  onToggle: () => void;
}

export function SelectExerciseCard({
  exercise,
  selected,
  onToggle,
}: SelectExerciseCardProps) {
  const themeColor = useThemeColor();

  return (
    <ExerciseCard
      exercise={exercise}
      onPress={onToggle}
      trailing={
        <Checkbox
          color={themeColor.primary}
          pointerEvents="none"
          value={selected}
        />
      }
      style={{
        borderWidth: 1.5,
        borderColor: selected ? themeColor.primary : "transparent",
      }}
    />
  );
}
