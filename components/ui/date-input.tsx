import UIText from "@/components/ui/text";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useState } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";

interface DateInputProps {
  value: Date | null;
  onChange: (date: Date) => void;
}

export default function DateInput({ value, onChange }: DateInputProps) {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date,
  ) => {
    // Pada Android, picker akan otomatis tertutup setelah memilih tanggal
    if (Platform.OS === "android") {
      setShowPicker(false);
    }

    if (selectedDate && event.type !== "dismissed") {
      onChange(selectedDate);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "Select date of birth";
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <View style={styles.container}>
      {/* Container ini dibuat Pressable agar bisa diklik */}
      <Pressable style={styles.inputBox} onPress={() => setShowPicker(true)}>
        <UIText style={[styles.text, !value && styles.placeholderText]}>
          {formatDate(value)}
        </UIText>
      </Pressable>

      {/* Date Picker Native */}
      {showPicker && (
        <DateTimePicker
          value={value || new Date(2000, 0, 1)}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()} // Membatasi agar tanggal tidak bisa melebihi hari ini
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
    borderColor: "#333333",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 14,
  },
  placeholderText: {
    color: "#8E8E93",
  },
});
