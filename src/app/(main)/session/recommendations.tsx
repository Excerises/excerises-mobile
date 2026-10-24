import {
  HomeScreen,
  HomeScreenTitle,
} from "@/component/screen/main/home-screen";
import { SelectExerciseCard } from "@/component/fitness";
import { Button, Text, View } from "@/component/ui";
import { useAuth } from "@/context/auth-context";
import { useRecommendExercises } from "@/hook/api/public/use-recommend-exercises";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import {
  Exercise,
  ExerciseBodyPart,
  ExerciseCategory,
  ExerciseDifficulty,
  ExerciseEquipment,
  ExerciseTarget,
} from "@/../type/entity";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Recommendations() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { user } = useAuth();
  const { mutation } = useRecommendExercises();
  const { body_part, equipment, target, category } = useLocalSearchParams<{
    body_part: string;
    equipment: string;
    target: string;
    category: string;
  }>();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const loading = mutation.isIdle || mutation.isPending;
  const difficulty = (user?.profile?.fitness_level ??
    "beginner") as ExerciseDifficulty;

  useEffect(() => {
    const top_n = {
      beginner: 8,
      intermediate: 14,
      advanced: 20,
    }[difficulty];

    mutation.mutate(
      {
        body_part: body_part as ExerciseBodyPart,
        equipment: equipment as ExerciseEquipment,
        target: target as ExerciseTarget,
        difficulty,
        category: category as ExerciseCategory,
        top_n,
      },
      {
        onSuccess: (res) => {
          setExercises(res.data?.exercises ?? []);
        },
        onError: () => {
          setExercises([]);
        },
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body_part, equipment, target, category, difficulty]);

  const filters = [body_part, target].filter(Boolean);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedCount = selectedIds.size;
  const selectedExercises = exercises.filter((e) => selectedIds.has(e.id));

  return (
    <HomeScreen
      title={<HomeScreenTitle>Recommendations</HomeScreenTitle>}
      canBack
    >
      <View variant="ghost" style={styles.filtersRow}>
        {filters.map((filter, i) => (
          <View key={i} variant="card" style={styles.filterChip}>
            <Text size="sm">{capitalize(filter!)}</Text>
          </View>
        ))}
      </View>

      {loading ? (
        <View variant="ghost" style={styles.centered}>
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      ) : exercises.length === 0 ? (
        <View variant="ghost" style={styles.centered}>
          <Text variant="muted" size="lg">
            No exercises found
          </Text>
          <Button
            variant="secondary"
            size="md"
            onPress={() => router.back()}
            style={{ marginTop: 16 }}
          >
            <Text>Adjust Preferences</Text>
          </Button>
        </View>
      ) : (
        <>
          <View style={{ flex: 1 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.list}
            >
              {exercises.map((exercise) => (
                <SelectExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedIds.has(exercise.id)}
                  onToggle={() => toggleSelect(exercise.id)}
                />
              ))}
            </ScrollView>
          </View>

          {selectedCount > 0 && (
            <View
              variant="ghost"
              style={[styles.bottomBar, { borderTopColor: themeColor.border }]}
            >
              <View style={styles.bottomBarContent}>
                <Text weight="semibold" size="lg">
                  {selectedCount} exercise{selectedCount > 1 ? "s" : ""}{" "}
                  selected
                </Text>
                <SafeAreaView edges={["bottom"]}>
                  <Button
                    full
                    size="lg"
                    onPress={() =>
                      router.push({
                        pathname: "/session/active",
                        params: {
                          exercises: JSON.stringify(selectedExercises),
                        },
                      })
                    }
                  >
                    <Text weight="semibold">Start Exercises</Text>
                  </Button>
                </SafeAreaView>
              </View>
            </View>
          )}
        </>
      )}
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  filtersRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
    marginBottom: 16,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 9999,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    gap: 12,
    paddingBottom: 10,
  },
  bottomBar: {
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  bottomBarContent: {
    gap: 12,
  },
});
