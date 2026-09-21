import { BarChart3 } from "lucide-react-native";

import { StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

type FitnessLevelCardProps = {
  level: string;
  description: string;
  backgroundColor: string;
  foregroundColor: string;
};

export default function FitnessLevelCard({
  level,
  description,
  backgroundColor,
  foregroundColor,
}: FitnessLevelCardProps) {
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor,
        },
      ]}
    >
      <UIText style={styles.cardTitle}>Your Fitness Level</UIText>

      <View style={styles.content}>
        <View
          style={[
            styles.iconContainer,
            {
              borderColor: foregroundColor,
            },
          ]}
        >
          <BarChart3 size={28} color={foregroundColor} />
        </View>

        <View style={styles.textContainer}>
          <UIText style={styles.level}>{level}</UIText>

          <UIText style={styles.description}>{description}</UIText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: 6,
    padding: 14,
    marginTop: 24,
  },

  cardTitle: {
    fontSize: 13,
    marginBottom: 12,
  },

  content: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },

  textContainer: {
    marginLeft: 12,
    flex: 1,
  },

  level: {
    fontSize: 14,
    fontWeight: "600",
  },

  description: {
    fontSize: 11,
    lineHeight: 14,
    opacity: 0.6,
    marginTop: 3,
  },
});
