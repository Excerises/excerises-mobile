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

export default function AuthInput({ isPassword, prefix, ...props }: Props) {
  const themeColor = useThemeColor();
  const { style, ...other } = props;

  const [showPassword, setShowPassword] = useState(!isPassword);

  return (
    <View
      style={[{ backgroundColor: themeColor.card }, styles.group, style as any]}
    >
      {prefix}
      <TextInput
        style={styles.input}
        {...other}
        secureTextEntry={!showPassword}
      />
      {isPassword && (
        <Pressable onPress={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <EyeIcon color={themeColor.mutedForeground} />
          ) : (
            <EyeOffIcon color={themeColor.mutedForeground} />
          )}
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    display: "flex",
    borderRadius: 50,
    flexDirection: "row",
    height: 46,
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    borderWidth: 0,
    borderColor: "transparent",
  },
});
