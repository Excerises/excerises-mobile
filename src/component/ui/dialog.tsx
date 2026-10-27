import { useThemeColor } from "@/hook/use-theme-color";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  Modal,
  Pressable,
  View,
  StyleSheet,
  type ViewStyle,
} from "react-native";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used within <Dialog>.");
  }

  return context;
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

export function Dialog({
  open: initialOpen = false,
  onOpenChange: handleOpenChange,
  children,
}: DialogProps) {
  const [open, setOpen] = useState(initialOpen);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(initialOpen);
  }, [initialOpen]);

  function onOpenChange(v: boolean) {
    setOpen(v);
    handleOpenChange?.(v);
  }

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

interface DialogContentProps {
  children: ReactNode;
  style?: ViewStyle;
  dismissOnBackdropPress?: boolean;
  animationType?: "none" | "slide" | "fade";
}

export function DialogContent({
  children,
  style,
  dismissOnBackdropPress = true,
  animationType = "fade",
}: DialogContentProps) {
  const themeColor = useThemeColor();
  const { open, onOpenChange } = useDialog();

  const handleRequestClose = () => {
    onOpenChange(false);
  };

  return (
    <Modal
      visible={open}
      transparent
      animationType={animationType}
      onRequestClose={handleRequestClose}
      onDismiss={handleRequestClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => {
            if (dismissOnBackdropPress) {
              onOpenChange(false);
            }
          }}
          accessibilityRole="button"
          accessibilityLabel="Close dialog"
        />

        <View
          style={[styles.content, { backgroundColor: themeColor.card }, style]}
          accessibilityRole="none"
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

interface DialogSectionProps {
  children: ReactNode;
  style?: ViewStyle;
}

export function DialogHeader({ children, style }: DialogSectionProps) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function DialogTitle({ children, style }: DialogSectionProps) {
  const { open } = useDialog();

  return (
    <View
      style={style}
      accessibilityRole="header"
      accessibilityElementsHidden={!open}
    >
      {children}
    </View>
  );
}

export function DialogDescription({ children, style }: DialogSectionProps) {
  return <View style={[styles.description, style]}>{children}</View>;
}

export function DialogFooter({ children, style }: DialogSectionProps) {
  return <View style={[styles.footer, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    width: "100%",
    maxWidth: 420,
    padding: 24,
    borderRadius: 16,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  header: {
    gap: 8,
    marginBottom: 20,
  },
  description: {
    marginTop: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 24,
    gap: 8,
  },
});
