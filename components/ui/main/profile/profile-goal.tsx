import { ChevronRight, Target } from "lucide-react-native";

import { Pressable, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

type ProfileGoalProps = {
  goal: string;
  description: string;
  progress: number;
  onPress?: () => void;
};

export default function ProfileGoal({
  goal,
  description,
  progress,
  onPress,
}: ProfileGoalProps) {
  const themeColor = useThemeColor();

  return (
    <View style={styles.container}>
      <Pressable style={styles.header} onPress={onPress}>
        <UIText style={styles.title}>My Goal</UIText>

        <ChevronRight size={20} color={themeColor.foreground} />
      </Pressable>

      <Pressable
        style={[
          styles.card,
          {
            backgroundColor: themeColor.card,
            borderColor: themeColor.border,
          },
        ]}
        onPress={onPress}
      >
        <View
          style={[
            styles.iconContainer,
            {
              backgroundColor: themeColor.primary,
            },
          ]}
        >
          <Target size={32} color={themeColor.white} />
        </View>

        <View style={styles.content}>
          <UIText style={styles.goal}>{goal}</UIText>

          <UIText variant="muted" style={styles.description}>
            {description}
          </UIText>

          <View style={styles.progressRow}>
            <View
              style={[
                styles.progressBackground,
                {
                  backgroundColor: themeColor.border,
                },
              ]}
            >
              <View
                style={[
                  styles.progress,
                  {
                    width: `${progress}%`,
                    backgroundColor: themeColor.primary,
                  },
                ]}
              />
            </View>

            <UIText style={styles.progressText}>{progress}%</UIText>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  card: {
    width: "100%",
    minHeight: 80,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 7,
  },

  iconContainer: {
    width: 58,
    height: 58,
    borderRadius: 29,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    marginLeft: 12,
  },

  goal: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    fontSize: 10,
    marginTop: 3,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 9,
  },

  progressBackground: {
    flex: 1,
    height: 6,
    borderRadius: 4,
    overflow: "hidden",
  },

  progress: {
    height: "100%",
    borderRadius: 4,
  },

  progressText: {
    fontSize: 10,
    fontWeight: "600",
  },
});
