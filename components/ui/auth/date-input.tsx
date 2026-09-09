import DateTimePicker from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

type DateInputProps = {
  value: string;
  selectedDate: Date;
  showPicker: boolean;
  onOpen: () => void;
  onChange: (date: Date) => void;
};

export default function DateInput({
  value,
  selectedDate,
  showPicker,
  onOpen,
  onChange,
}: DateInputProps) {
  const themeColor = useThemeColor();

  return (
    <View>
      <Pressable
        onPress={onOpen}
        style={[
          styles.container,
          {
            backgroundColor: themeColor.card,
          },
        ]}
      >
        <UIText
          style={[
            styles.text,
            {
              color: value
                ? themeColor.foreground
                : themeColor.mutedForeground,
            },
          ]}
        >
          {value || "day/month/year"}
        </UIText>

        <CalendarDays
          size={20}
          color={themeColor.mutedForeground}
        />
      </Pressable>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          maximumDate={new Date()}
          onChange={(_, date) => {
            if (date) {
              onChange(date);
            }
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    borderRadius: 6,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 16,
  },
});