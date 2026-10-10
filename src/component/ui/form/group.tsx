import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

export function FormGroup({ children }: { children: ReactNode }) {
  return <View style={styles.group}>{children}</View>;
}

const styles = StyleSheet.create({
  group: {
    gap: 6,
  },
});
