import UIText from "@/components/ui/text";

import useThemeColor from "@/hooks/use-theme-color";

import { Check } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

type RecentWorkoutCardProps = {
  title: string;
  type: string;
  duration: string;
  onPress?: () => void;
};

export default function RecentWorkoutCard({
  title,
  type,
  duration,
  onPress,
}: RecentWorkoutCardProps) {
  const themeColor = useThemeColor();

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: themeColor.card,
        },
      ]}
    >
      <View style={styles.info}>
        <UIText style={styles.title}>{title}</UIText>

        <UIText
          style={[
            styles.type,
            {
              color: themeColor.mutedForeground,
            },
          ]}
        >
          {type}
        </UIText>
      </View>

      <View style={styles.rightSection}>
        <UIText style={styles.duration}>{duration}</UIText>

        <View style={styles.status}>
          <Check size={12} color="#16C84E" />

          <UIText style={styles.statusText}>Completed</UIText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 58,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  info: {
    flex: 1,
  },

  title: {
    fontSize: 13,
    fontWeight: "600",
  },

  type: {
    fontSize: 10,
    marginTop: 3,
  },

  rightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
  },

  duration: {
    fontSize: 11,
    fontWeight: "600",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    marginTop: 3,
  },

  statusText: {
    fontSize: 9,
    color: "#16C84E",
  },
});
