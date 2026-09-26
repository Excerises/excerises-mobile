import { useThemeContext } from "@/components/provider/theme-provider";
import useThemeColor from "@/hooks/use-theme-color";
import { View } from "lucide-react-native";
import moment from "moment";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Pressable } from "react-native";
import DateTimePicker, {
  ReactNativeModalDateTimePickerProps,
} from "react-native-modal-datetime-picker";
import Input, { InputProps } from "./input";

export type DatetimeModalPickerProps = Omit<
  ReactNativeModalDateTimePickerProps,
  "isVisible" | "onCancel" | "onConfirm" | "onChange" | "onValueChange"
> & {
  value?: Date;
  onValueChange?: (date?: Date) => void;
  children?: React.ReactNode;
};

type DatetimePickerModalContext = {
  mode: "date" | "time" | "datetime";
  value?: Date;
  setValue?: (v?: Date) => void;
  show: boolean;
  setShow: (v: boolean) => void;
};

const DatetimePickerModalContext = createContext(
  {} as DatetimePickerModalContext,
);

function useDatetimePickerModal() {
  return useContext(DatetimePickerModalContext);
}

export default function DatetimePickerModal({
  value: baseValue,
  onValueChange,
  isDarkModeEnabled,
  children,
  ...props
}: DatetimeModalPickerProps) {
  const { theme } = useThemeContext();

  const [show, setShow] = useState(false);
  const [value, setValue] = useState(baseValue);

  const isDark = ![null, undefined].includes(isDarkModeEnabled as any)
    ? isDarkModeEnabled
    : theme === "dark";

  function handleChangeDate(date?: Date) {
    setValue(date);
    onValueChange?.(date);
  }

  useEffect(() => {
    if (baseValue && !moment(baseValue).isSame(moment(value))) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(value);
    }
  }, [baseValue]);

  return (
    <DatetimePickerModalContext.Provider
      value={{
        value,
        setValue: handleChangeDate,
        show,
        setShow,
        mode: props.mode || "date",
      }}
    >
      {children}
      <DateTimePicker
        isVisible={show}
        onCancel={() => setShow(false)}
        onConfirm={(date) => {
          if (!value) handleChangeDate(date);
          setShow(false);
        }}
        onValueChange={(_, date) => handleChangeDate(date)}
        isDarkModeEnabled={isDark}
        {...props}
      />
    </DatetimePickerModalContext.Provider>
  );
}

export function DatetimePickerModalTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const { show, setShow } = useDatetimePickerModal();

  return <Pressable onPress={() => setShow(!show)}>{children}</Pressable>;
}

export function DatetimePickerModalInput({
  value: baseValue,
  style,
  readOnly: _,
  ...others
}: InputProps) {
  const { value, mode } = useDatetimePickerModal();
  const v = baseValue || value;

  const format = useMemo(() => {
    return {
      date: "DD MMMM YYYY",
      time: "HH:mm",
      datetime: "DD MMMM YYYY HH:mm:ss",
    }[mode];
  }, []);

  return (
    <Input
      value={v ? moment(v).format(format) : undefined}
      style={[style, { pointerEvents: "none" }]}
      readOnly
      {...others}
    />
  );
}
