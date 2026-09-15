import { StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/button";

type WorkoutFrequencySelectorProps = {
  value?: number;
  onChange?: (value: number) => void;
};

const frequencies = [1, 2, 3, 4, 5, 6];

export default function WorkoutFrequencySelector({
  value,
  onChange,
}: WorkoutFrequencySelectorProps) {
  return (
    <View style={styles.container}>
      {frequencies.map((frequency) => (
        <UIButton
          key={frequency}
          style={[
            styles.button,
            value === frequency && styles.activeButton,
          ]}
          label={`${frequency} day`}
          onPress={() => onChange?.(frequency)}
        />
      ))}
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
    width: "18%",
    height: 44,
    paddingHorizontal: 0,
    borderRadius: 6,
    backgroundColor: "#292929",
  },

  activeButton: {
    backgroundColor: "#d00000",
  },
});