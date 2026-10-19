import { HomeScreen, HomeScreenTitle } from "@/component/screen/main/home-screen";
import { ExerciseCard } from "@/component/fitness";
import { Button, Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { capitalize } from "@/utils/common/text";
import { Exercise } from "@/../type/entity";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeftIcon } from "lucide-react-native";
import { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet } from "react-native";

export default function Recommendations() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { body_part, equipment, target, difficulty, category } =
    useLocalSearchParams<{
      body_part: string;
      equipment: string;
      target: string;
      difficulty: string;
      category: string;
    }>();

  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const mockExercises: Exercise[] = [
        {
          id: "1",
          name: "Assisted Crunch",
          description:
            "A machine-assisted crunch targeting the abdominal muscles.",
          body_part: (body_part as Exercise["body_part"]) || "waist",
          equipment: (equipment as Exercise["equipment"]) || "assisted",
          target: (target as Exercise["target"]) || "abs",
          secondary_muscles: ["obliques"],
          instruction: [
            "Sit on the machine and grab the handles.",
            "Crunch forward by contracting your abs.",
            "Slowly return to the starting position.",
          ],
          difficulty:
            (difficulty as Exercise["difficulty"]) || "beginner",
          category: (category as Exercise["category"]) || "strength",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "2",
          name: "Cable Crunch",
          description:
            "A cable-based crunch for building core strength.",
          body_part: (body_part as Exercise["body_part"]) || "waist",
          equipment: (equipment as Exercise["equipment"]) || "cable",
          target: (target as Exercise["target"]) || "abs",
          secondary_muscles: ["obliques", "hip flexors"],
          instruction: [
            "Kneel below a high pulley with a rope attachment.",
            "Hold the rope beside your head.",
            "Crunch downward, bringing your elbows toward your knees.",
          ],
          difficulty:
            (difficulty as Exercise["difficulty"]) || "intermediate",
          category: (category as Exercise["category"]) || "strength",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "3",
          name: "Decline Sit-up",
          description:
            "A sit-up performed on a decline bench to increase resistance.",
          body_part: (body_part as Exercise["body_part"]) || "waist",
          equipment:
            (equipment as Exercise["equipment"]) || "body weight",
          target: (target as Exercise["target"]) || "abs",
          secondary_muscles: ["hip flexors", "obliques"],
          instruction: [
            "Secure your legs on a decline bench.",
            "Cross your arms over your chest.",
            "Sit up by contracting your abs.",
          ],
          difficulty:
            (difficulty as Exercise["difficulty"]) || "intermediate",
          category: (category as Exercise["category"]) || "strength",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "4",
          name: "Plank",
          description:
            "An isometric core exercise that strengthens the entire midsection.",
          body_part: (body_part as Exercise["body_part"]) || "waist",
          equipment:
            (equipment as Exercise["equipment"]) || "body weight",
          target: (target as Exercise["target"]) || "abs",
          secondary_muscles: [
            "shoulders",
            "glutes",
            "lower back",
          ],
          instruction: [
            "Get into a push-up position with forearms on the ground.",
            "Keep your body in a straight line from head to heels.",
            "Hold the position for the desired duration.",
          ],
          difficulty:
            (difficulty as Exercise["difficulty"]) || "beginner",
          category: (category as Exercise["category"]) || "strength",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "5",
          name: "Russian Twist",
          description:
            "A rotational core exercise targeting the obliques and abs.",
          body_part: (body_part as Exercise["body_part"]) || "waist",
          equipment:
            (equipment as Exercise["equipment"]) || "body weight",
          target: (target as Exercise["target"]) || "abs",
          secondary_muscles: ["obliques", "hip flexors"],
          instruction: [
            "Sit on the floor with knees bent and feet elevated.",
            "Lean back slightly and hold your hands together.",
            "Rotate your torso from side to side.",
          ],
          difficulty:
            (difficulty as Exercise["difficulty"]) || "intermediate",
          category: (category as Exercise["category"]) || "strength",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ];

      setExercises(mockExercises);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [body_part, equipment, target, difficulty, category]);

  const filters = [body_part, target, difficulty].filter(Boolean);

  return (
    <HomeScreen
      title={<HomeScreenTitle>Recommendations</HomeScreenTitle>}
      actions={[
        {
          icon: (
            <ArrowLeftIcon
              size={Fonts.size.xl}
              color={themeColor.foreground}
            />
          ),
          onTap: () => router.back(),
        },
      ]}
    >
      <View variant="ghost" style={styles.filtersRow}>
        {filters.map((filter, i) => (
          <View key={i} variant="card" style={styles.filterChip}>
            <Text size="sm">{capitalize(filter!)}</Text>
          </View>
        ))}
      </View>

      {loading ? (
        <View
          variant="ghost"
          style={styles.centered}
        >
          <ActivityIndicator size="large" color={themeColor.primary} />
        </View>
      ) : exercises.length === 0 ? (
        <View
          variant="ghost"
          style={styles.centered}
        >
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <View variant="ghost" style={styles.list}>
            {exercises.map((exercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </View>
        </ScrollView>
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
    paddingBottom: 40,
  },
});
