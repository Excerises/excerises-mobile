import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Pressable } from "react-native";
import { Input } from ".";
import { NInputProps } from "./input";
import moment from "moment";
import DateTimePickerModal, {
  DateTimePickerProps,
} from "react-native-modal-datetime-picker";

type DatePickerContext = {
  show: boolean;
  setShow: (v: boolean) => void;
  value: Date | null;
  setValue: (v: Date | null) => void;
};

const DatePickerContext = createContext({} as DatePickerContext);

function useDatePicker() {
  return useContext(DatePickerContext);
}

export function ModalDatePicker({
  children,
  value: baseValue,
  onValueChange,
}: {
  children?: ReactNode;
  value?: Date | null;
  onValueChange?: (value: Date | null) => void;
}) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<Date | null>(null);

  useEffect(() => {
    if (baseValue && baseValue != value) setValue(value);
  }, [baseValue]);

  useEffect(() => {
    onValueChange?.(value);
  }, [value]);

  return (
    <DatePickerContext value={{ show, setShow, value, setValue }}>
      {children}
    </DatePickerContext>
  );
}

export function ModalDatePickerTrigger({ children }: { children?: ReactNode }) {
  const { setShow, show } = useDatePicker();

  function toggleShow() {
    setShow(!show);
  }

  return <Pressable onPress={toggleShow}>{children}</Pressable>;
}

export function ModalDatePickerInput({
  placeholder = "Select date",
  ...props
}: NInputProps) {
  const { value } = useDatePicker();

  return (
    <Input
      placeholder={placeholder}
      readOnly
      value={value ? moment(value).format("DD MMMM YYYY") : undefined}
      style={{ pointerEvents: "none" }}
      {...props}
    />
  );
}

export function ModalDatePickerContent({
  onConfirm,
  onCancel,
  ...props
}: Omit<DateTimePickerProps, "onConfirm" | "onCancel"> & {
  onConfirm?: (date: Date | null) => void;
  onCancel?: () => void;
}) {
  const { show, setShow, setValue } = useDatePicker();

  function hideDatePicker() {
    setShow(false);
    onCancel?.();
  }

  function handleConfirm(date: Date) {
    setShow(false);
    setValue(date);
    onConfirm?.(date);
  }

  return (
    <DateTimePickerModal
      isVisible={show}
      mode="date"
      onConfirm={handleConfirm}
      onCancel={hideDatePicker}
      {...props}
    />
  );
}
