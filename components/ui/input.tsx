import useThemeColor from "@/hooks/use-theme-color";
import {
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import { useState } from "react";

interface Props extends TextInputProps {
  prefix?: React.ReactNode;
  isPassword?: boolean;
}

export default function AuthInput({
  isPassword,
  prefix,
  ...props
}: Props) {
  const themeColor = useThemeColor();
  const { style, ...other } = props;

  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      style={[
        styles.group,
        {
          backgroundColor: themeColor.card,
        },
        style as any,
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
        {...other}
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
  group: {
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