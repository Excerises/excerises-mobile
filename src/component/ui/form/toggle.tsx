import { createContext, ReactNode, useContext, useState } from "react";
import { Button } from "..";
import { NButtonProps } from "../button";
import { StyleSheet, View } from "react-native";

type ToggleButtonProps<T = any> = NButtonProps & {
  active?: boolean;
  value: T;
  onActiveChange?: (value: boolean) => void;
  onTap?: (value: T) => void;
};

export function ToggleButton<T>({
  active,
  value,
  onActiveChange,
  onTap,
  ...props
}: ToggleButtonProps<T>) {
  function handleToggle(v: boolean) {
    onActiveChange?.(v);
  }

  return (
    <Button
      variant={active ? "default" : "secondary"}
      onPress={() => {
        handleToggle(!active);
        onTap?.(value);
      }}
      {...props}
    ></Button>
  );
}

type ToggleGroupProps<T = any> = {
  value?: T;
  onValueChange?: (value: any) => void;
  children?: ReactNode;
};

type ToggleGroupContext<T = any> = Omit<ToggleGroupProps<T>, "children">;
const ToggleGroupContext = createContext<ToggleGroupContext>({});

function useToggleGroup() {
  return useContext(ToggleGroupContext);
}

export function ToggleGroup<T = any>({
  value: baseValue,
  onValueChange,
  children,
}: ToggleGroupProps<T>) {
  const [value, setValue] = useState<T | undefined>(baseValue);

  function handleChange(value: T) {
    setValue(value);
    onValueChange?.(value);
  }

  return (
    <ToggleGroupContext.Provider value={{ value, onValueChange: handleChange }}>
      <View style={styles.flex}>{children}</View>
    </ToggleGroupContext.Provider>
  );
}

export function ToggleGroupButton<T>({
  value,
  onTap,
  ...props
}: ToggleButtonProps<T>) {
  const { value: groupValue, onValueChange } = useToggleGroup();

  const isActive = groupValue === value;

  function handleTap() {
    onValueChange?.(value);
    onTap?.(value);
  }

  return (
    <ToggleButton
      active={isActive}
      value={value}
      onTap={handleTap}
      {...props}
      style={{ flex: 1 }}
    />
  );
}

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    gap: 10,
  },
});
