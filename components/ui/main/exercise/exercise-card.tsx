import useThemeColor from "@/hooks/use-theme-color";
import { Exercise, ExerciseCategory } from "@/types/entity";
import {
  ActivityIcon,
  BoneIcon,
  DnaIcon,
  LucideIcon,
  PillIcon,
  SportShoeIcon,
  WeightIcon,
  ZapIcon,
} from "lucide-react-native";
import { ReactNode, useMemo } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import UIView, { UIViewProps } from "../../common/view";
import UIText from "../../common/text";
import { Checkbox } from "expo-checkbox";

export interface ExerciseCardProps extends UIViewProps {
  exercise: Exercise;
  onPress?: () => void;
  actions?: (exercise: Exercise) => ReactNode;
}

export function SelectExerciseCard({
  isSelected,
  onPress,
  ...props
}: Omit<ExerciseCardProps, "actions"> & {
  isSelected?: boolean;
}) {
  const color = useThemeColor();

  return (
    <ExerciseCard
      {...props}
      onPress={onPress}
      style={{
        borderWidth: 1,
        borderColor: isSelected ? color.primary : "transparent",
      }}
      actions={(_) => (
        <Checkbox
          value={isSelected}
          color={color.primary}
          onValueChange={onPress}
          style={{ borderWidth: 1.1, marginRight: 5 }}
        />
      )}
    />
  );
}

export function ExerciseCard({
  exercise,
  onPress,
  actions,
  style,
  ...props
}: ExerciseCardProps) {
  const color = useThemeColor();
  const Icon = useMemo(() => {
    const availables: Record<ExerciseCategory, LucideIcon> = {
      stretching: DnaIcon,
      cardio: SportShoeIcon,
      balance: WeightIcon,
      mobility: ZapIcon,
      rehabilitation: PillIcon,
      strength: ActivityIcon,
      plyometrics: BoneIcon,
    };

    return availables[exercise.category];
  }, []);

  return (
    <Pressable onPress={onPress}>
      <UIView variant="card" style={[styles.card, style]} {...props}>
        <UIView style={styles.iconContainer}>
          <Icon color={color.primary} size={30} />
        </UIView>
        <View style={styles.content}>
          <UIText style={styles.contentTitle} numberOfLines={1}>
            {exercise.name}
          </UIText>
          <UIText variant="muted">
            {exercise.target} - {exercise.equipment}
          </UIText>
        </View>
        {actions && actions(exercise)}
      </UIView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 6,
    gap: 14,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    height: 60,
    width: 60,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    width: 200,
  },
});
