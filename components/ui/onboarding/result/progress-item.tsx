import UIText from "@/components/ui/text";

import { Check, Circle } from "lucide-react-native";

import { StyleSheet, View } from "react-native";

type ProgressItemProps = {
  completed: boolean;
  text: string;
  color: string;
};

export default function ProgressItem({
  completed,
  text,
  color,
}: ProgressItemProps) {
  return (
    <View style={styles.container}>

      {completed ? (
        <View
          style={[
            styles.checkCircle,
            {
              backgroundColor: color,
            },
          ]}
        >
          <Check size={13} color="#FFFFFF" strokeWidth={3} />
        </View>
      ) : (
        <Circle size={20} color="#333333" strokeWidth={2} />
      )}

      <UIText style={styles.text}>{text}</UIText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  checkCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    fontSize: 13,
  },
});
