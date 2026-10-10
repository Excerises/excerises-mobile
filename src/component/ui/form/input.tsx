import { Borders, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";

export type NInputProps = Omit<TextInputProps, "placeholderTextColor"> & {
  invalid?: boolean;
  disabled?: boolean;
  password?: boolean;
};

export function NInput({
  style,
  disabled,
  invalid,
  password = false,
  ...others
}: NInputProps) {
  const themeColor = useThemeColor();
  const [focus, setFocus] = useState(false);
  const [showText, setShowText] = useState(!password);

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          {
            color: themeColor.foreground,
            backgroundColor: themeColor.background,
            borderColor: focus ? themeColor.mutedForeground : themeColor.border,
            shadowRadius: 4,
            shadowColor: themeColor.mutedForeground,
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: focus ? 0.5 : 0,
            paddingRight: password ? 42 : undefined,
          },
          disabled && { backgroundColor: themeColor.muted },
          invalid && { borderColor: themeColor.danger },
          style,
        ]}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholderTextColor={themeColor.mutedForeground}
        secureTextEntry={!showText}
        {...others}
      />
      {password && (
        <TouchableOpacity
          style={styles.suffix}
          onPress={() => setShowText((prev) => !prev)}
        >
          {showText ? (
            <EyeIcon color={themeColor.mutedForeground} size={Fonts.size.md} />
          ) : (
            <EyeOffIcon
              color={themeColor.mutedForeground}
              size={Fonts.size.md}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  input: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: Borders.radius.md,
    fontSize: Fonts.size.md,
  },
  suffix: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    width: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
