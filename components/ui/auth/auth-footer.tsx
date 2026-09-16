import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

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
  const theme = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText variant="muted">{text} </UIText>

      <Pressable onPress={onPress}>
        <UIText style={{ color: theme.primary }}>{actionText}</UIText>
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
});
