import { StyleSheet, Text } from "react-native";

export interface FieldErrorProps {
  errors: string[];
}

export default function FieldError({ errors }: FieldErrorProps) {
  return <Text style={styles.message}>{errors.join(", ")}</Text>;
}

const styles = StyleSheet.create({
  message: {
    color: "red",
    fontSize: 12,
  },
});
