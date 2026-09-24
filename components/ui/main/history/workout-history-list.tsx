import { CalendarDays, Check, ChevronRight, Clock3 } from "lucide-react-native";

import { Image, StyleSheet, View } from "react-native";

import UIButton from "@/components/ui/common/button";
import UIText from "@/components/ui/common/text";

import useThemeColor from "@/hooks/use-theme-color";

import type {
    WorkoutHistoryGroup,
    WorkoutHistoryItem,
} from "../../../data/History";
import { formatDate, formatTime } from "../../../data/History";

export type {
    WorkoutHistoryGroup,
    WorkoutHistoryItem
} from "../../../data/History";

export type WorkoutHistoryListProps = {
  groups: WorkoutHistoryGroup[];
  onViewWorkout: (workout: WorkoutHistoryItem) => void;
};

export default function WorkoutHistoryList({
  groups,
  onViewWorkout,
}: WorkoutHistoryListProps) {
  return (
    <View style={styles.container}>
      {groups.map((group) => (
        <HistoryGroup
          key={group.title}
          title={group.title}
          workouts={group.workouts}
          onViewWorkout={onViewWorkout}
        />
      ))}
    </View>
  );
}

type HistoryGroupProps = {
  title: string;
  workouts: WorkoutHistoryItem[];
  onViewWorkout: (workout: WorkoutHistoryItem) => void;
};

function HistoryGroup({ title, workouts, onViewWorkout }: HistoryGroupProps) {
  return (
    <View style={styles.group}>
      <UIText style={styles.date}>{title}</UIText>

      <View style={styles.list}>
        {workouts.map((workout) => (
          <HistoryCard
            key={workout.id}
            workout={workout}
            onViewWorkout={onViewWorkout}
          />
        ))}
      </View>
    </View>
  );
}

type HistoryCardProps = {
  workout: WorkoutHistoryItem;
  onViewWorkout: (workout: WorkoutHistoryItem) => void;
};

function HistoryCard({ workout, onViewWorkout }: HistoryCardProps) {
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
      <Image source={workout.image} style={styles.image} />

      <View style={styles.content}>
        <View>
          <UIText style={styles.title} numberOfLines={1}>
            {workout.title}
          </UIText>

          <UIText variant="muted" style={styles.exerciseCount}>
            {workout.exerciseCount} Exercises
          </UIText>

          <View style={styles.metaRow}>
            <CalendarDays size={13} color={themeColor.foreground} />

            <UIText variant="muted" style={styles.metaText}>
              {formatDate(workout.createdAt)}
            </UIText>

            <Clock3 size={13} color={themeColor.foreground} />

            <UIText variant="muted" style={styles.metaText}>
              {formatTime(workout.createdAt)}
            </UIText>
          </View>

          <View style={styles.statusRow}>
            <Check size={15} color={themeColor.success} strokeWidth={3} />

            <UIText style={[styles.statusText, { color: themeColor.success }]}>
              Completed
            </UIText>
          </View>
        </View>

        <View style={styles.bottomRow}>
          <UIText variant="muted" style={styles.details} numberOfLines={1}>
            {workout.target} • {workout.bodyPart}
          </UIText>

          <UIButton
            label="VIEW"
            variant="primary"
            icon={<ChevronRight size={16} color={themeColor.black} />}
            style={styles.viewButton}
            labelStyle={styles.viewButtonText}
            onPress={() => onViewWorkout(workout)}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  group: {
    marginBottom: 18,
  },

  date: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 7,
  },

  list: {
    gap: 8,
  },

  card: {
    minHeight: 112,
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 12,
    overflow: "hidden",
  },

  image: {
    width: 102,
    height: 112,
    resizeMode: "cover",
  },

  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingVertical: 9,
  },

  title: {
    fontSize: 14,
    fontWeight: "600",
  },

  exerciseCount: {
    fontSize: 10,
    marginTop: 2,
  },

  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 7,
  },

  metaText: {
    fontSize: 9,
  },

  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 5,
  },

  statusText: {
    fontSize: 10,
    fontWeight: "600",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 8,
  },

  details: {
    flex: 1,
    fontSize: 9,
  },

  viewButton: {
    minHeight: 36,
    height: 36,
    paddingHorizontal: 8,
    borderRadius: 7,
    gap: 0,
  },

  viewButtonText: {
    fontSize: 10,
    fontWeight: "700",
  },
});
