import { StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIButton from "./button";

type SingleProps = {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  multiple?: false;
  icons?: React.ReactNode[];
};

type MultipleProps = {
  options: string[];
  value: string[];
  onChange: (value: string[]) => void;
  multiple: true;
  icons?: React.ReactNode[];
};

type OptionSelectorProps = SingleProps | MultipleProps;

export default function OptionSelector(props: OptionSelectorProps) {
  const themeColor = useThemeColor();

  const isSelected = (option: string) => {
    if (props.multiple) {
      return props.value.includes(option);
    }

    return props.value === option;
  };

  const handlePress = (option: string) => {
    if (props.multiple) {
      if (props.value.includes(option)) {
        props.onChange(
          props.value.filter((item) => item !== option),
        );
      } else {
        props.onChange([...props.value, option]);
      }

      return;
    }

    props.onChange(option);
  };

  return (
    <View style={styles.container}>
      {props.options.map((option, index) => {
        const selected = isSelected(option);

        return (
          <UIButton
            key={option}
            label={option}
            icon={props.icons?.[index]}
            style={[
              styles.button,
              props.options.length === 2 && styles.twoColumnButton,
              {
                backgroundColor: selected
                  ? themeColor.primary
                  : themeColor.card,
                borderColor: selected
                  ? themeColor.primary
                  : themeColor.border,
              },
            ]}
            labelStyle={{
              color: selected
                ? "#FFFFFF"
                : themeColor.foreground,
            }}
            onPress={() => handlePress(option)}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  button: {
    width: "31.5%",
    height: 48,
  },

  twoColumnButton: {
    flex: 1,
    width: undefined,
    flexDirection: "row",
  },
});