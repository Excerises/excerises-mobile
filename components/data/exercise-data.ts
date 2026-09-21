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
    title: "Dumbbell Shoulder Press",
    bodyPart: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-2.png"),
    description:
      "A shoulder exercise using dumbbells to build pressing strength.",
    secondaryMuscles: "Triceps",
    instructions: [
      "Sit or stand with a dumbbell in each hand.",
      "Press the dumbbells overhead.",
      "Lower them back to shoulder level.",
    ],
  },

  {
    id: "3",
    title: "Bodyweight Squat",
    bodyPart: "Legs",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Strength",
    category: "Lower Body",
    image: require("@/assets/images/news-3.png"),
    description: "A bodyweight exercise for strengthening the lower body.",
    secondaryMuscles: "Glutes, Hamstrings",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your body by bending your knees.",
      "Return to the starting position.",
    ],
  },

  {
    id: "4",
    title: "Dumbbell Bicep Curl",
    bodyPart: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-1.png"),
    description: "A simple dumbbell exercise for building biceps strength.",
    secondaryMuscles: "Forearms",
    instructions: [
      "Stand with a dumbbell in each hand.",
      "Curl the dumbbells toward your shoulders.",
      "Lower them slowly to the starting position.",
    ],
  },

  {
    id: "5",
    title: "Dumbbell Bench Press",
    bodyPart: "Chest",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-2.png"),
    description: "A pressing exercise that targets the chest using dumbbells.",
    secondaryMuscles: "Shoulders, Triceps",
    instructions: [
      "Lie on a bench with dumbbells at chest level.",
      "Press the dumbbells upward.",
      "Lower them under control.",
    ],
  },

  {
    id: "6",
    title: "Dumbbell Fly",
    bodyPart: "Chest",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-3.png"),
    description: "An isolation exercise for the chest using dumbbells.",
    secondaryMuscles: "Shoulders",
    instructions: [
      "Lie on a bench holding dumbbells above your chest.",
      "Lower your arms outward in a controlled motion.",
      "Bring the dumbbells back together.",
    ],
  },

  {
    id: "7",
    title: "Shoulder Press",
    bodyPart: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-1.png"),
    description:
      "A shoulder pressing movement for developing upper body strength.",
    secondaryMuscles: "Triceps",
    instructions: [
      "Hold the weights at shoulder level.",
      "Press them upward.",
      "Return to the starting position.",
    ],
  },

  {
    id: "8",
    title: "Incline Push Up",
    bodyPart: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-2.png"),
    description: "A modified push-up variation suitable for beginners.",
    secondaryMuscles: "Shoulders, Triceps",
    instructions: [
      "Place your hands on an elevated surface.",
      "Lower your chest toward the surface.",
      "Push back to the starting position.",
    ],
  },

  {
    id: "9",
    title: "Plank",
    bodyPart: "Core",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    target: "Endurance",
    category: "Core",
    image: require("@/assets/images/news-3.png"),
    description: "A core exercise that helps improve stability and endurance.",
    secondaryMuscles: "Shoulders, Back",
    instructions: [
      "Start with your forearms on the floor.",
      "Keep your body straight.",
      "Hold the position while keeping your core engaged.",
    ],
  },

  {
    id: "10",
    title: "Dumbbell Lateral Raise",
    bodyPart: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    target: "Strength",
    category: "Upper Body",
    image: require("@/assets/images/news-1.png"),
    description: "An isolation movement for the shoulder muscles.",
    secondaryMuscles: "Traps",
    instructions: [
      "Hold dumbbells beside your body.",
      "Raise your arms to shoulder height.",
      "Lower them slowly.",
    ],
  },
];
