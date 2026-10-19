import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from "react-native";
import { Input, Text, View } from "..";
import { NInputProps } from "./input";
import { Borders } from "@/constant/theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronsUpDownIcon } from "lucide-react-native";
import { useThemeColor } from "@/hook/use-theme-color";

type SelectContext = {
  show: boolean;
  setShow: (v: boolean) => void;
  value: any;
  setValue: (v: any) => void;
};

const SelectContext = createContext({} as SelectContext);

function useSelect() {
  return useContext(SelectContext);
}

export function Select<T = unknown>({
  children,
  value: baseValue,
  onValueChange,
}: {
  children?: ReactNode;
  value?: T;
  onValueChange?: (value?: T) => void;
}) {
  const [value, setValue] = useState<T | undefined>(baseValue);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (baseValue && baseValue != value) setValue(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseValue]);

  useEffect(() => {
    onValueChange?.(value);
  }, [value]);

  return (
    <SelectContext.Provider
      value={{
        value,
        setValue,
        show,
        setShow,
      }}
    >
      {children}
    </SelectContext.Provider>
  );
}

export function SelectTrigger({ children }: { children?: ReactNode }) {
  const { setShow, show } = useSelect();

  function toggleShow() {
    setShow(!show);
  }

  return (
    <Pressable onPress={toggleShow}>
      <View variant="ghost" style={{ pointerEvents: "none" }}>
        {children}
      </View>
    </Pressable>
  );
}

export function SelectInput({
  placeholder = "Select item",
  ...props
}: NInputProps) {
  const themeColor = useThemeColor();
  const { value } = useSelect();

  return (
    <View variant="ghost" style={{ position: "relative" }}>
      <Input placeholder={placeholder} value={value.toString()} {...props} />
      <View
        style={{
          position: "absolute",
          top: 0,
          right: 5,
          bottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
        variant="ghost"
      >
        <ChevronsUpDownIcon color={themeColor.mutedForeground} size={18} />
      </View>
    </View>
  );
}

export function SelectContent({ children }: { children?: ReactNode }) {
  const { show, setShow } = useSelect();
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={show}
      animationType="slide"
      transparent
      onRequestClose={() => {
        setShow(false);
      }}
    >
      <Pressable style={styles.mask} onPress={() => setShow(false)} />
      <View
        style={[styles.content, { maxHeight: height * 0.65 }]}
        variant="card"
      >
        <ScrollView>
          <SafeAreaView>{children}</SafeAreaView>
        </ScrollView>
      </View>
    </Modal>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value: any;
  children?: ReactNode;
}) {
  const { value: selectedValue, setValue, setShow } = useSelect();

  function handleChange() {
    if (value == selectedValue) return;

    setValue(value);
    setShow(false);
  }

  const isActive = value == selectedValue;

  return (
    <Pressable
      style={[
        styles.item,
        isActive && { backgroundColor: "rgba(0, 0, 0, 0.1)" },
      ]}
      onPress={handleChange}
    >
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  mask: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  item: {
    padding: 12,
    borderRadius: Borders.radius.md,
  },
});
