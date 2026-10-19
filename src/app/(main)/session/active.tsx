import { HomeScreen, HomeScreenTitle } from "@/component/screen/main/home-screen";
import { Text, View } from "@/component/ui";
import { Fonts } from "@/constant/theme";
import { useThemeColor } from "@/hook/use-theme-color";
import { ArrowLeftIcon } from "lucide-react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Exercise } from "@/../type/entity";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

export default function ActiveSession() {
  const router = useRouter();
  const themeColor = useThemeColor();
  const { exercises } = useLocalSearchParams<{
    exercises: string;
  }>();

  const [parsedExercises] = useState<Exercise[]>(() => {
    try {
      if (exercises) {
        return JSON.parse(exercises);
      }
    } catch {
      // ignore
    }
    return [];
  });

  return (
    <HomeScreen
      title={<HomeScreenTitle>Active Session</HomeScreenTitle>}
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View variant="ghost" style={styles.container}>
          <Text size="xl" weight="bold">
            Session Started
          </Text>
          <Text variant="muted" size="sm" style={styles.subtitle}>
            {parsedExercises.length} exercise{parsedExercises.length > 1 ? "s" : ""} selected
          </Text>
          
          {parsedExercises.map((exercise, index) => (
            <View key={exercise.id} variant="card" style={styles.exerciseItem}>
              <Text size="md" weight="semibold">
                {index + 1}. {exercise.name}
              </Text>
              <Text variant="muted" size="sm">
                {exercise.description}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </HomeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    paddingBottom: 40,
  },
  subtitle: {
    marginBottom: 8,
  },
  exerciseItem: {
    padding: 16,
    borderRadius: 12,
  },
});