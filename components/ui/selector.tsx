import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";

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
  const [open, setOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.text}>
          {value || placeholder}
        </Text>
        <Text style={styles.arrow}>{open ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.dropdown}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.option}
              onPress={() => {
                onChange?.(option);
                setOpen(false);
              }}
            >
              <Text style={styles.text}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 44,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: "#292929",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdown: {
    marginTop: 4,
    borderRadius: 6,
    backgroundColor: "#292929",
    overflow: "hidden",
  },

  option: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 14,
  },

  arrow: {
    color: "#FFFFFF",
    fontSize: 12,
  },
});