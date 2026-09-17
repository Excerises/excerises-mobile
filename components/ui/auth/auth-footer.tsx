import { Pressable, StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIText from "@/components/ui/common/text";

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
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <UIText variant="muted">{text} </UIText>

      <Pressable onPress={onPress}>
        <UIText
          style={[
            styles.actionText,
            {
              color: themeColor.primary,
            },
          ]}
        >
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

  actionText: {
    fontWeight: "500",
  },
});
