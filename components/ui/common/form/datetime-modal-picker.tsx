import { useThemeContext } from "@/components/provider/theme-provider";
import useThemeColor from "@/hooks/use-theme-color";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import DateTimePicker, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";

export type DatetimeModalPickerProps = Omit<
  ReactNativeModalDateTimePickerProps,
  "isVisible" | "onCancel" | "onConfirm" | "onChange" | "onValueChange"
> & {
  renderTrigger: (props: { value?: Date }) => React.ReactNode;
  value?: Date;
  onValueChange?: (date?: Date) => void;
};

export default function DatetimeModalPicker({
  value: baseValue,
  onValueChange,
  renderTrigger,
  isDarkModeEnabled,
  ...props
}: DatetimeModalPickerProps) {
  const { theme } = useThemeContext();
  const color = useThemeColor();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(baseValue);

  const isDark = ![null, undefined].includes(isDarkModeEnabled as any)
    ? isDarkModeEnabled
    : theme === "dark";

  function handleChangeDate(date: Date) {
    const nextValue =
      value && moment(value).isSame(moment(date)) ? undefined : date;
    setValue(nextValue);
    onValueChange?.(nextValue);
    setShow(false);
  }

  useEffect(() => {
    if (baseValue && !moment(baseValue).isSame(moment(value))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(value);
    }
  }, [baseValue]);

  return (
    <>
      <Pressable onPress={() => setShow(true)}>
        {renderTrigger({ value: value })}
      </Pressable>
      <DateTimePicker
        isVisible={show}
        onCancel={() => setShow(false)}
        onConfirm={handleChangeDate}
        onValueChange={(_, date) => handleChangeDate(date)}
        isDarkModeEnabled={isDark}
        {...props}
      />
    </>
  );
}
