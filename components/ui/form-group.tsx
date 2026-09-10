import { StyleSheet, View } from "react-native";
import UIText from "./text";

interface Props {
  label: string;
  children: React.ReactNode;
}

export default function AuthFormGroup({ label, children }: Props) {
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
