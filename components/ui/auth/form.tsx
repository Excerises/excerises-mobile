import { StyleSheet, View } from "react-native";
import UIText from "../text";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export default function AuthForm({ title, description, children }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <UIText style={styles.title}>{title}</UIText>
        <UIText style={styles.description} variant="muted">
          {description}
        </UIText>
      </View>
      <View>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
  },
  container: {
    display: "flex",
    width: "100%",
    gap: 20,
  },
});
