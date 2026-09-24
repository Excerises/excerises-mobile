import Toast, {
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
  ToastType,
} from "react-native-toast-message";
import useThemeColor from "./use-theme-color";
import { useMemo } from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";

export interface ShowToastProps {
  title?: string;
  description?: string;
}

export function useToastConfig() {
  const color = useThemeColor();

  return useMemo<ToastConfig>(() => {
    const contentContainerStyle: StyleProp<ViewStyle> = {
      paddingHorizontal: 15,
      backgroundColor: color.card,
    };

    const text1Style: StyleProp<TextStyle> = {
      fontSize: 14,
      fontWeight: "400",
      color: color.foreground,
    };

    const text2Style: StyleProp<TextStyle> = {
      fontSize: 11,
      color: color.mutedForeground,
    };

    return {
      success: (props) => (
        <SuccessToast
          {...props}
          contentContainerStyle={contentContainerStyle}
          text1Style={text1Style}
          text2Style={text2Style}
        />
      ),
      error: (props) => (
        <ErrorToast
          {...props}
          contentContainerStyle={contentContainerStyle}
          text1Style={text1Style}
          text2Style={text2Style}
        />
      ),
      info: (props) => (
        <InfoToast
          {...props}
          contentContainerStyle={contentContainerStyle}
          text1Style={text1Style}
          text2Style={text2Style}
        />
      ),
    };
  }, [color]);
}

export function useToast() {
  function show(
    text1: string = "Success",
    text2: string = "Doing action successfully",
    type: ToastType = "success",
  ) {
    Toast.show({
      text1,
      text2,
      type,
      position: "bottom",
    });
  }

  function success({ title, description }: ShowToastProps) {
    show(title, description, "success");
  }

  function error({ title, description }: ShowToastProps) {
    show(title, description, "error");
  }

  function info({ title, description }: ShowToastProps) {
    show(title, description, "info");
  }

  return {
    success,
    error,
    info,
  };
}
