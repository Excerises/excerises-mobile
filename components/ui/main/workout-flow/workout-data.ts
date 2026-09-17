import type { ImageSourcePropType } from "react-native";

export type Workout = {
  id: string;
  title: string;
  bodyPart: string;
  equipment: string;
  difficulty: string;
  target: string;
  category: string;
  image: ImageSourcePropType;
  description: string;
  secondaryMuscles: string;
  instructions: string[];
};

export const workouts: Workout[] = [
  {
    id: "1",
    title: "Push Up",
    bodyPart: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-1.png"),
    description:
      "A basic bodyweight exercise that targets the chest, shoulders, and triceps.",
    secondaryMuscles: "Shoulders, Triceps",
    instructions: [
      "Start in a high plank position.",
      "Lower your body toward the floor.",
      "Push your body back to the starting position.",
    ],
  },

  {
    id: "2",
    title: "Bodyweight Squat",
    bodyPart: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Strength",
    category: "Lower Body",
    image: require("@/assets/images/news-1.png"),
    description: "A bodyweight exercise for strengthening the lower body.",
    secondaryMuscles: "Glutes, Hamstrings",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your body by bending your knees.",
      "Return to the starting position.",
    ],
  },

  {
    id: "3",
    title: "Plank",
    bodyPart: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Endurance",
    category: "Core",
    image: require("@/assets/images/news-1.png"),
    description: "A core exercise that helps improve stability and endurance.",
    secondaryMuscles: "Shoulders, Back",
    instructions: [
      "Start with your forearms on the floor.",
      "Keep your body straight.",
      "Hold the position while keeping your core engaged.",
    ],
  },
];
