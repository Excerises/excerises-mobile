import UIText from "@/components/ui/text";
import useThemeColor from "@/hooks/use-theme-color";
import { Mars, Venus } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";

type Gender = "male" | "female";

type GenderSelectorProps = {
  value: Gender;
  onChange: (value: Gender) => void;
};

export default function GenderSelector({
  value,
  onChange,
}: GenderSelectorProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.row}>
      <GenderButton
        label="Male"
        icon={
          <Mars
            size={20}
            color={value === "male" ? "#FFFFFF" : themeColor.foreground}
          />
        }
        selected={value === "male"}
        onPress={() => onChange("male")}
      />

      <GenderButton
        label="Female"
        icon={
          <Venus
            size={20}
            color={value === "female" ? "#FFFFFF" : themeColor.foreground}
          />
        }
        selected={value === "female"}
        onPress={() => onChange("female")}
      />
    </View>
  );
}

type GenderButtonProps = {
  label: string;
  icon: React.ReactNode;
  selected: boolean;
  onPress: () => void;
};

function GenderButton({ label, icon, selected, onPress }: GenderButtonProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: selected ? themeColor.destructive : themeColor.card,
        },
      ]}
    >
      {icon}

      <UIText
        style={{
          color: selected ? "#FFFFFF" : themeColor.foreground,
        }}
      >
        {label}
      </UIText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },

  button: {
    flex: 1,
    height: 40,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});
