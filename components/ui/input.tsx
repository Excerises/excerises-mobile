import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import type {
  StyleProp,
  TextInputProps,
  ViewStyle,
} from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

type InputProps = Omit<TextInputProps, "style"> & {
  prefix?: React.ReactNode;
  isPassword?: boolean;
  style?: StyleProp<ViewStyle>;
};

export default function Input({
  isPassword,
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
        secureTextEntry={isPassword ? !showPassword : false}
        placeholderTextColor={themeColor.mutedForeground}
      />

      {isPassword && (
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          style={styles.eyeButton}
        >
          {showPassword ? (
            <EyeIcon
              color={themeColor.mutedForeground}
              size={20}
            />
          ) : (
            <EyeOffIcon
              color={themeColor.mutedForeground}
              size={20}
            />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 18,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  eyeButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
});