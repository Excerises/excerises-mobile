import { Pressable, StyleSheet, View } from "react-native";
import UIText from "@/components/ui/text";

type AuthFooterProps = {
  text: string;
  actionText: string;
  onPress: () => void;
};

export default function AuthFooter({
  text,
  actionText,
  onPress,
}: AuthFooterProps) {
  return (
    <View style={styles.container}>
      <UIText variant="muted">
        {text}{" "}
      </UIText>

      <Pressable onPress={onPress}>
        <UIText style={styles.action}>
          {actionText}
        </UIText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },

  action: {
    color: "#800000",
  },
});