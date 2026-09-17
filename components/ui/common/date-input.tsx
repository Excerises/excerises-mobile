import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import useThemeColor from "@/hooks/use-theme-color";

import UIText from "./text";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
  const themeColor = useThemeColor();
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate && event.type !== "dismissed") {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) {
      return "Select date of birth";
    }

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={[
          styles.inputBox,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
        onPress={() => setShowPicker(true)}
      >
        <UIText
          style={[
            styles.text,
            {
              color: value ? themeColor.foreground : themeColor.mutedForeground,
            },
          ]}
        >
          {formatDate(value)}
        </UIText>
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={value || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  inputBox: {
    height: 48,
    borderRadius: 6,
    borderWidth: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  text: {
    fontSize: 14,
  },
});
