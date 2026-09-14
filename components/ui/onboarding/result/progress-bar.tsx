import { StyleSheet, View } from "react-native";

type ProgressBarProps = {
  progress: number;
  color: string;
};

export default function ProgressBar({ progress, color }: ProgressBarProps) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.progress,
          {
            width: `${progress}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 8,
    backgroundColor: "#292929",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 28,
  },

  progress: {
    height: "100%",
    borderRadius: 10,
  },
});
