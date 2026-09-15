import { StyleSheet, View } from "react-native";
import type { ReactNode } from "react";

import UIText from "./text";

type FormGroupProps = {
  label: string;
  children: ReactNode;
};

export default function FormGroup({ 
  label,
  children,
}: FormGroupProps) {
  return (
    <View style={styles.field}>
      <UIText style={styles.label}>{label}</UIText>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
});