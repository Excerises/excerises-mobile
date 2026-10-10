import { Borders, Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { useState } from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

export type NInputProps = Omit<TextInputProps, "placeholderTextColor"> & {
  invalid?: boolean;
  disabled?: boolean;
};

export function NInput({ style, disabled, invalid, ...others }: NInputProps) {
  const themeColor = useThemeColor();
  const [focus, setFocus] = useState(false);

  return (
    <TextInput
      style={[
        styles.input,
        {
          backgroundColor: themeColor.background,
          borderColor: focus ? themeColor.mutedForeground : themeColor.border,
          shadowRadius: 4,
          shadowColor: themeColor.mutedForeground,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: focus ? 0.5 : 0,
        },
        disabled && { backgroundColor: themeColor.muted },
        invalid && { borderColor: themeColor.danger },
        style,
      ]}
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      placeholderTextColor={themeColor.mutedForeground}
      {...others}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: Borders.radius.md,
    fontSize: Fonts.size.md,
  },
});
