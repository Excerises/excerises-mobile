import { StyleSheet, Pressable, StyleProp, ViewStyle } from "react-native";
import { Text, View } from "../ui";
import { Borders } from "@/constant/theme";
import { Exercise } from "@/../type/entity";
import { capitalize } from "@/utils/common/text";
import { ReactNode } from "react";
import { categoryIcons, difficultyColors } from "./exercise-visuals";

interface ExerciseCardProps {
  exercise: Exercise;
  onPress?: () => void;
  trailing?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function ExerciseCard({
  exercise,
  onPress,
  trailing,
  style,
}: ExerciseCardProps) {
  const CategoryIcon = categoryIcons[exercise.category];
  const iconColor = difficultyColors[exercise.difficulty];

  return (
    <Pressable onPress={onPress}>
      <View variant="card" style={[styles.card, style]}>
        <View variant="ghost" style={styles.row}>
          <View
            variant="ghost"
            style={[
              styles.category,
              {
                backgroundColor: `${iconColor}24`,
              },
            ]}
          >
            <CategoryIcon size={22} color={iconColor} />
          </View>
          <View variant="ghost" style={styles.content}>
            <Text size="lg" weight="semibold">
              {capitalize(exercise.name)}
            </Text>
            <View style={styles.itemRow} variant="ghost">
              <View style={styles.item} variant="ghost">
                <Text size="sm" variant="muted">
                  {capitalize(exercise.body_part)}
                </Text>
              </View>
              <Text variant="muted" size="sm">
                •
              </Text>
              <View style={styles.item} variant="ghost">
                <Text size="sm" variant="muted">
                  {capitalize(exercise.target)}
                </Text>
              </View>
              <Text variant="muted" size="sm">
                •
              </Text>
              <View style={styles.item} variant="ghost">
                <Text size="sm" variant="muted">
                  {capitalize(exercise.equipment)}
                </Text>
              </View>
            </View>
          </View>
          {trailing}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: Borders.radius.lg,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 14,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  itemRow: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flexWrap: "wrap",
  },
  item: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
  },
  itemDot: {
    borderRadius: 9999,
    height: 8,
    width: 8,
  },
  equipmentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  category: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: Borders.radius.lg,
  },
});
