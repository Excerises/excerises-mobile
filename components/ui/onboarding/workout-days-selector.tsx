import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/button";

type WorkoutDaysSelectorProps = {
  value?: string[];
  onChange?: (days: string[]) => void;
};

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function WorkoutDaysSelector({
  value = [],
  onChange,
}: WorkoutDaysSelectorProps) {
  const handleDayPress = (day: string) => {
    const isSelected = value.includes(day);

    if (isSelected) {
      onChange?.(value.filter((selectedDay) => selectedDay !== day));
    } else {
      onChange?.([...value, day]);
    }
  };

  return (
    <View style={styles.container}>

      {days.map((day) => {
        const isSelected = value.includes(day);

        return (
          <UIButton
            key={day}
            style={[styles.button, isSelected && styles.activeButton]}
            label={day}
            onPress={() => handleDayPress(day)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  button: {
    width: 52,
    height: 38,
    borderRadius: 6,
    backgroundColor: "#292929",
  },

  activeButton: {
    backgroundColor: "#d00000",
  },
});
