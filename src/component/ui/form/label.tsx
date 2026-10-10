import { StyleSheet, View } from "react-native";
import { Text } from "..";
import { NTextProps } from "../text";

export type NLabelProps = NTextProps & {
  required?: boolean;
};

export function Label({ required, weight, ...props }: NLabelProps) {
  return (
    <View style={styles.label}>
      <Text weight={weight || "semibold"} {...props} />
      {required && (
        <Text size="sm" weight="semibold" variant="destructive">
          *
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
});
