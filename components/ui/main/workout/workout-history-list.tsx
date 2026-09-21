import { Check, MoreVertical } from "lucide-react-native";

import { Image, StyleSheet, View } from "react-native";

import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type { Exercise } from "@/components/data/Exercise";

export type WorkoutHistoryItem = {
  workout: Exercise;
  duration: string;
  completed: boolean;
  createdAt: string;
};

type WorkoutHistoryListProps = {
  today: WorkoutHistoryItem[];
  yesterday: WorkoutHistoryItem[];
};

const formatDate = (date: string) => {
  const value = new Date(date);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return `${value.getDate()} ${months[value.getMonth()]} ${value.getFullYear()}`;
};

export default function WorkoutHistoryList({
  today,
  yesterday,
}: WorkoutHistoryListProps) {
  const todayDate = today[0]?.createdAt;
  const yesterdayDate = yesterday[0]?.createdAt;

  return (
    <View style={styles.container}>
      {todayDate && (
        <HistoryGroup
          title={`Today, ${formatDate(todayDate)}`}
          workouts={today}
        />
      )}

      {yesterdayDate && (
        <HistoryGroup
          title={`Yesterday, ${formatDate(yesterdayDate)}`}
          workouts={yesterday}
        />
      )}
    </View>
  );
}

type HistoryGroupProps = {
  title: string;
  workouts: WorkoutHistoryItem[];
};

function HistoryGroup({ title, workouts }: HistoryGroupProps) {
  return (
    <View style={styles.group}>
      <UIText style={styles.date}>{title}</UIText>

      <View style={styles.list}>
        {workouts.map((item, index) => (
          <HistoryCard key={`${item.workout.exercise_id}-${index}`} item={item} />
        ))}
      </View>
    </View>
  );
}

type HistoryCardProps = {
  item: WorkoutHistoryItem;
};

function HistoryCard({ item }: HistoryCardProps) {
  const themeColor = useThemeColor();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: themeColor.card,
          borderColor: themeColor.border,
        },
      ]}
    >
      <Image source={item.workout.image} style={styles.image} />

      <View style={styles.content}>
        <UIText style={styles.title} numberOfLines={1}>
          {item.workout.exercise_name}
        </UIText>

        <UIText variant="muted" style={styles.meta}>
          {item.workout.body_part} • {item.workout.equipment}
        </UIText>

        <View style={styles.infoRow}>
          <UIText variant="muted" style={styles.info}>
            ◷ {item.duration}
          </UIText>

          <UIText variant="muted" style={styles.info}>
            | 3 sets
          </UIText>
        </View>
      </View>

      <View style={styles.right}>
        {item.completed && (
          <View
            style={[
              styles.completed,
              {
                backgroundColor: themeColor.card,
              },
            ]}
          >
            <Check size={12} color={themeColor.success} strokeWidth={3} />

            <UIText
              style={[
                styles.completedText,
                {
                  color: themeColor.success,
                },
              ]}
            >
              Completed
            </UIText>
          </View>
        )}

        <MoreVertical size={17} color={themeColor.foreground} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
  },

  group: {
    marginBottom: 18,
  },

  date: {
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },

  list: {
    gap: 6,
  },

  card: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 6,
    overflow: "hidden",
  },

  image: {
    width: 62,
    height: 62,
  },

  content: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 7,
  },

  title: {
    fontSize: 10,
    fontWeight: "600",
  },

  meta: {
    fontSize: 8,
    marginTop: 3,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 3,
  },

  info: {
    fontSize: 8,
  },

  right: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignSelf: "stretch",
    paddingVertical: 7,
    paddingRight: 7,
  },

  completed: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 5,
  },

  completedText: {
    fontSize: 8,
    fontWeight: "600",
  },
});
