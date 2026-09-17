import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import type { StyleProp, TextInputProps, ViewStyle } from "react-native";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

type InputProps = Omit<TextInputProps, "style"> & {
  prefix?: React.ReactNode;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Input({
  isPassword = false,
  prefix,
  style,
  ...props
}: InputProps) {
  const themeColor = useThemeColor();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
        },
        style,
      ]}
    >
      {prefix}

      <TextInput
        style={[
          styles.input,
          {
            color: themeColor.foreground,
          },
        ]}
        {...props}
        secureTextEntry={isPassword && !showPassword}
        placeholderTextColor={themeColor.mutedForeground}
      />

      {isPassword && (
        <Pressable
          style={styles.eyeButton}
          onPress={() => setShowPassword((current) => !current)}
          hitSlop={8}
        >
          {showPassword ? (
            <EyeIcon size={20} color={themeColor.mutedForeground} />
          ) : (
            <EyeOffIcon size={20} color={themeColor.mutedForeground} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingHorizontal: 18,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },

  eyeButton: {
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
