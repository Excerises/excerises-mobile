import {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
import { CalendarDays } from "lucide-react-native";
import { Platform, Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";

type DateInputProps = {
  value: Date | null;
  onChange: (date: Date) => void;
};

export default function DateInput({
  value,
  onChange,
}: DateInputProps) {
  const themeColor = useThemeColor();

  const openDatePicker = () => {
    if (Platform.OS === "android") {
      DateTimePickerAndroid.open({
        value: value || new Date(),
        mode: "date",
        display: "default",
        maximumDate: new Date(),
        onValueChange: (_, date) => {
          if (date) {
            onChange(date);
          }
        },
      });
    }
  };

  return (
    <View>
      <Pressable
        onPress={openDatePicker}
        style={[
          styles.container,
          { backgroundColor: themeColor.card },
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
          {value ? value.toLocaleDateString("en-GB") : "day/month/year"}
        </UIText>

        <CalendarDays
          size={20}
          color={themeColor.mutedForeground}
        />
      </Pressable>
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