import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Pressable,
  StyleSheet,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import useThemeColor from "@/hooks/use-theme-color";
import UIView from "../view";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react-native";
import Input, { InputProps } from "./input";

type SelectContext = {
  show: boolean;
  setShow: (v: boolean) => void;
  value?: any;
  setValue: (v?: any) => void;
};

const SelectContext = createContext({} as SelectContext);

function useSelect() {
  return useContext(SelectContext);
}

export interface SelectProps {
  children: React.ReactNode;
  value?: any;
  onValueChange?: (v?: any) => void;
}

export default function Select({
  value: baseValue,
  onValueChange,
  children,
}: SelectProps) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState<any | undefined>(baseValue);

  function handleChangeValue(v?: any) {
    onValueChange?.(v);
    setValue(v);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setValue(baseValue);
  }, [baseValue]);

  return (
    <View style={styles.container}>
      <SelectContext.Provider
        value={{ show, setShow, value, setValue: handleChangeValue }}
      >
        {children}
      </SelectContext.Provider>
    </View>
  );
}

export function SelectTrigger({ children }: { children: React.ReactNode }) {
  const { show, setShow } = useSelect();

  return <Pressable onPress={() => setShow(!show)}>{children}</Pressable>;
}

export function SelectInput({
  style,
  value: baseValue,
  readOnly: _,
  ...inputProps
}: InputProps) {
  const color = useThemeColor();
  const { value, show } = useSelect();

  const Icon = show ? ChevronUpIcon : ChevronDownIcon;

  return (
    <View style={{ position: "relative" }}>
      <Input
        style={[{ pointerEvents: "none", paddingRight: 32 }, style]}
        readOnly
        {...inputProps}
        value={baseValue || value}
      />
      <View style={styles.triggerIconContainer}>
        <Icon size={20} color={color.mutedForeground} />
      </View>
    </View>
  );
}

export function SelectContent({ children }: { children: React.ReactNode }) {
  const { show } = useSelect();

  const color = useThemeColor();

  if (!show) {
    return null;
  }

  return (
    <UIView
      style={[styles.content, { borderColor: color.border }]}
      variant="card"
    >
      {children}
    </UIView>
  );
}

export function SelectItem({
  value,
  children,
}: {
  value?: any;
  children: React.ReactNode;
}) {
  const { value: selectedValue, setValue, setShow } = useSelect();
  const color = useThemeColor();
  const isActive = selectedValue && selectedValue === value;

  return (
    <TouchableOpacity
      onPress={() => {
        setValue(value);
        setShow(false);
      }}
      style={[
        styles.item,
        { backgroundColor: isActive ? color.border : undefined },
      ]}
    >
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  content: {
    position: "absolute",
    bottom: -2,
    paddingTop: 3,
    paddingBottom: 3,
    transform: [{ translateY: "100%" }],
    borderRadius: 5,
    left: 0,
    right: 0,
    borderWidth: 1,
    zIndex: 5,
  },
  item: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  triggerIconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
