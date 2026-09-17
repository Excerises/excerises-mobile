import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIText from "./text";

type SelectorProps = {
  placeholder: string;
  options: string[];
  value?: string;
  onChange?: (value: string) => void;
};

export default function Selector({
  placeholder,
  options,
  value,
  onChange,
}: SelectorProps) {
  const themeColor = useThemeColor();
  const [open, setOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange?.(option);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.input,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
        onPress={() => setOpen((current) => !current)}
      >
        <UIText
          style={[
            styles.text,
            {
              color: value ? themeColor.foreground : themeColor.mutedForeground,
            },
          ]}
        >
          {value || placeholder}
        </UIText>

        <UIText
          style={[
            styles.arrow,
            {
              color: themeColor.foreground,
            },
          ]}
        >
          {open ? "▲" : "▼"}
        </UIText>
      </Pressable>

      {open && (
        <View
          style={[
            styles.dropdown,
            {
              backgroundColor: themeColor.card,
              borderColor: themeColor.border,
            },
          ]}
        >
          {options.map((option) => (
            <Pressable
              key={option}
              style={[
                styles.option,
                option === value && {
                  backgroundColor: themeColor.primary,
                },
              ]}
              onPress={() => handleSelect(option)}
            >
              <UIText
                style={[
                  styles.text,
                  {
                    color: option === value ? "#FFFFFF" : themeColor.foreground,
                  },
                ]}
              >
                {option}
              </UIText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  input: {
    height: 48,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  option: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  text: {
    fontSize: 14,
  },

  arrow: {
    fontSize: 12,
  },
});
