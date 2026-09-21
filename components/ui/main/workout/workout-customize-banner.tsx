import { ChevronRight, Dumbbell } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type WorkoutCustomizeBannerProps = {
  onPress: () => void;
};

export default function WorkoutCustomizeBanner({
  onPress,
}: WorkoutCustomizeBannerProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      style={[
        styles.container,
        {
          backgroundColor: themeColor.background,
          borderColor: themeColor.primary,
        },
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Dumbbell size={42} color={themeColor.primary} />
      </View>

      <View style={styles.content}>
        <UIText style={styles.title}>CUSTOMIZE WORKOUT</UIText>

        <UIText variant="muted" style={styles.description}>
          Choose your workout preferences
          {"\n"}
          and get the best recommendation
          {"\n"}
          for you.
        </UIText>
      </View>

      <ChevronRight size={24} color={themeColor.foreground} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  iconContainer: {
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
  },

  title: {
    fontSize: 12,
    fontWeight: "600",
  },

  description: {
    fontSize: 10,
    lineHeight: 13,
    marginTop: 2,
  },
});
