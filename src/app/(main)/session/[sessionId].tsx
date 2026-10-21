import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { NoRecordCard } from "@/component/common/no-record";
import { ExerciseCard } from "@/component/fitness";
import { Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { useGetSession } from "@/hook/api/session/use-get-session";
import { formatDuration } from "@/utils/fitness/format-duration";
import { Exercise, SessionExercise } from "@/../type/entity";
import { useRouter, useLocalSearchParams } from "expo-router";
import moment from "moment";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  DumbbellIcon,
  RotateCcwIcon,
} from "lucide-react-native";

function toExercises(sessionExercises: SessionExercise[]): Exercise[] {
  return sessionExercises
    .map((item) => item.exercise)
    .filter((exercise): exercise is Exercise => Boolean(exercise));
}

export default function SessionDetailScreen() {
  const router = useRouter();
  const colors = useThemeColor();
  const { sessionId } = useLocalSearchParams<{ sessionId: string }>();
  const {
    query: { data, isLoading },
  } = useGetSession({ sessionId });

  const session = data?.data;

  const retrySession = () => {
    if (!session) return;

    router.push({
      pathname: "/session/active",
      params: { exercises: JSON.stringify(toExercises(session.exercises)) },
    });
  };

  return (
    <HomeScreen
      title={<HomeScreenTitle>Session Detail</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon size={Fonts.size.xl} color={colors.foreground} />
          ),
          onTap: () => router.back(),
        },
        {
          icon: (
            <RotateCcwIcon size={Fonts.size.xl} color={colors.foreground} />
          ),
          onTap: retrySession,
        },
      ]}
    >
      {isLoading ? (
        <View variant="ghost" style={styles.center}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : !session ? (
        <NoRecordCard
          icon={DumbbellIcon}
          message="Session not found"
        />
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
          >
            <View variant="card" style={styles.summaryCard}>
              <View variant="ghost" style={styles.summaryRow}>
                <View
                  variant="ghost"
                  style={[
                    styles.summaryIcon,
                    { backgroundColor: `${colors.primary}24` },
                  ]}
                >
                  <CalendarIcon size={20} color={colors.primary} />
                </View>
                <View variant="ghost" style={{ flex: 1, gap: 4 }}>
                  <Text variant="muted" size="xs">
                    Workout Date
                  </Text>
                  <Text weight="semibold">
                    {moment(session.created_at).format("DD MMMM YYYY")}
                  </Text>
                </View>
              </View>
              <View variant="ghost" style={styles.summaryRow}>
                <View
                  variant="ghost"
                  style={[
                    styles.summaryIcon,
                    { backgroundColor: `${colors.primary}24` },
                  ]}
                >
                  <ClockIcon size={20} color={colors.primary} />
                </View>
                <View variant="ghost" style={{ flex: 1, gap: 4 }}>
                  <Text variant="muted" size="xs">
                    Duration
                  </Text>
                  <Text weight="semibold">
                    {formatDuration(session.duration)}
                  </Text>
                </View>
              </View>
            </View>

            <View variant="ghost" style={{ gap: 12 }}>
              <Text weight="semibold" size="lg">
                Exercises
              </Text>
              {session.exercises.length === 0 ? (
                <NoRecordCard message="No exercises recorded" />
              ) : (
                session.exercises.map((item) =>
                  item.exercise ? (
                    <ExerciseCard
                      key={item.id}
                      exercise={item.exercise}
                      trailing={
                        item.duration != null ? (
                          <View variant="ghost" style={styles.durationBadge}>
                            <ClockIcon
                              size={14}
                              color={colors.mutedForeground}
                            />
                            <Text size="sm" variant="muted">
                              {formatDuration(item.duration)}
                            </Text>
                          </View>
                        ) : undefined
                      }
                    />
                  ) : null,
                )
              )}
            </View>
          </ScrollView>
        </>
      )}
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gap: 20,
    paddingBottom: 24,
  },
  summaryCard: {
    padding: 16,
    borderRadius: 16,
    gap: 16,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  summaryIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 12,
  },
  durationBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
});
