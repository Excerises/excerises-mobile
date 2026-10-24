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
  ScrollView,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  ViewStyle,
} from "react-native";
import { View } from ".";
import { SafeAreaView } from "react-native-safe-area-context";
import { Borders } from "@/constant/theme";

type BottomSheetContext = {
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const BottomSheetContext = createContext({} as BottomSheetContext);

function useBottomSheet() {
  return useContext(BottomSheetContext);
}

export function BottomSheet({
  children,
  open: initialOpen,
  onOpenChange: handleOpenChange,
}: Partial<BottomSheetContext> & { children?: ReactNode }) {
  const [open, setOpen] = useState(initialOpen || false);

  function onOpenChange(v: boolean) {
    setOpen(v);
    handleOpenChange?.(v);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(initialOpen || false);
  }, [initialOpen]);

  return (
    <BottomSheetContext.Provider value={{ open, onOpenChange }}>
      {children}
    </BottomSheetContext.Provider>
  );
}

export function BottomSheetContent({
  children,
  size,
  style,
}: {
  children?: ReactNode;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { open, onOpenChange } = useBottomSheet();
  const { height } = useWindowDimensions();

  return (
    <Modal
      visible={open}
      animationType="slide"
      transparent
      onRequestClose={() => {
        onOpenChange?.(false);
      }}
    >
      <Pressable style={styles.mask} onPress={() => onOpenChange(false)} />
      <View variant="ghost" style={{ flex: 1 }}></View>
      <View
        style={[styles.content, style, { maxHeight: height * (size || 0.65) }]}
        variant="card"
      >
        <ScrollView>
          <SafeAreaView>{children}</SafeAreaView>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mask: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
