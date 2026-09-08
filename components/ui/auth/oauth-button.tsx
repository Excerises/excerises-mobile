import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { Pressable, StyleSheet, ViewStyle } from "react-native";

interface OAuthButtonProps {
  icon: React.ReactNode;
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export default function OAuthButton({
  icon,
  label,
  onPress,
  style,
}: OAuthButtonProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      style={[
        styles.button,
        {
          backgroundColor: themeColor.card,
        },
        style,
      ]}
      onPress={onPress}
    >
      {icon}

      <UIText
        style={[
          styles.label,
          {
            color: themeColor.foreground,
          },
        ]}
      >
        {label}
      </UIText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 48,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
  },
});
