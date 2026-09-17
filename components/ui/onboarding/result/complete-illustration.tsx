import { BarChart3 } from "lucide-react-native";
import { StyleSheet, View } from "react-native";

type CompleteIllustrationProps = {
  color: string;
};

export default function CompleteIllustration({
  color,
}: CompleteIllustrationProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.circle,
          {
            borderColor: color,
          },
        ]}
      >
        <BarChart3 size={58} color={color} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginBottom: 20,
  },

  circle: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
