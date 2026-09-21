import type { ImageSourcePropType } from "react-native";

export type Exercise = {
  exercise_id: string;
  exercise_name: string;
  exercise_category: string;
  equipment: string;
  level: string;
  target: string;
  body_part: string;
  image: ImageSourcePropType;
  description: string;
  secondary_muscles: string;
  instructions: string[];
};

export const exercises: Exercise[] = [
  {
    exercise_id: "EX001",
    exercise_name: "Push Up",
    exercise_category: "Upper Body",
    equipment: "Bodyweight",
    level: "Beginner",
    target: "Strength",
    body_part: "Chest",
    image: require("@/assets/images/news-1.png"),
    description:
      "A basic bodyweight exercise that targets the chest, shoulders, and triceps.",
    secondary_muscles: "Shoulders, Triceps",
    instructions: [
      "Start in a high plank position.",
      "Lower your body toward the floor.",
      "Push your body back to the starting position.",
    ],
  },
  {
    exercise_id: "EX002",
    exercise_name: "Dumbbell Shoulder Press",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Beginner",
    target: "Strength",
    body_part: "Shoulders",
    image: require("@/assets/images/news-2.png"),
    description:
      "A shoulder exercise using dumbbells to build pressing strength.",
    secondary_muscles: "Triceps",
    instructions: [
      "Sit or stand with a dumbbell in each hand.",
      "Press the dumbbells overhead.",
      "Lower them back to shoulder level.",
    ],
  },
  {
    exercise_id: "EX003",
    exercise_name: "Bodyweight Squat",
    exercise_category: "Lower Body",
    equipment: "Bodyweight",
    level: "Beginner",
    target: "Strength",
    body_part: "Legs",
    image: require("@/assets/images/news-3.png"),
    description: "A bodyweight exercise for strengthening the lower body.",
    secondary_muscles: "Glutes, Hamstrings",
    instructions: [
      "Stand with your feet shoulder-width apart.",
      "Lower your body by bending your knees.",
      "Return to the starting position.",
    ],
  },
  {
    exercise_id: "EX004",
    exercise_name: "Dumbbell Bicep Curl",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Beginner",
    target: "Strength",
    body_part: "Arms",
    image: require("@/assets/images/news-1.png"),
    description: "A simple dumbbell exercise for building biceps strength.",
    secondary_muscles: "Forearms",
    instructions: [
      "Stand with a dumbbell in each hand.",
      "Curl the dumbbells toward your shoulders.",
      "Lower them slowly to the starting position.",
    ],
  },
  {
    exercise_id: "EX005",
    exercise_name: "Dumbbell Bench Press",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Intermediate",
    target: "Strength",
    body_part: "Chest",
    image: require("@/assets/images/news-2.png"),
    description: "A pressing exercise that targets the chest using dumbbells.",
    secondary_muscles: "Shoulders, Triceps",
    instructions: [
      "Lie on a bench with dumbbells at chest level.",
      "Press the dumbbells upward.",
      "Lower them under control.",
    ],
  },
  {
    exercise_id: "EX006",
    exercise_name: "Dumbbell Fly",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Intermediate",
    target: "Strength",
    body_part: "Chest",
    image: require("@/assets/images/news-3.png"),
    description: "An isolation exercise for the chest using dumbbells.",
    secondary_muscles: "Shoulders",
    instructions: [
      "Lie on a bench holding dumbbells above your chest.",
      "Lower your arms outward in a controlled motion.",
      "Bring the dumbbells back together.",
    ],
  },
  {
    exercise_id: "EX007",
    exercise_name: "Shoulder Press",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Intermediate",
    target: "Strength",
    body_part: "Shoulders",
    image: require("@/assets/images/news-1.png"),
    description:
      "A shoulder pressing movement for developing upper body strength.",
    secondary_muscles: "Triceps",
    instructions: [
      "Hold the weights at shoulder level.",
      "Press them upward.",
      "Return to the starting position.",
    ],
  },
  {
    exercise_id: "EX008",
    exercise_name: "Incline Push Up",
    exercise_category: "Upper Body",
    equipment: "Bodyweight",
    level: "Beginner",
    target: "Strength",
    body_part: "Chest",
    image: require("@/assets/images/news-2.png"),
    description: "A modified push-up variation suitable for beginners.",
    secondary_muscles: "Shoulders, Triceps",
    instructions: [
      "Place your hands on an elevated surface.",
      "Lower your chest toward the surface.",
      "Push back to the starting position.",
    ],
  },
  {
    exercise_id: "EX009",
    exercise_name: "Plank",
    exercise_category: "Core",
    equipment: "Bodyweight",
    level: "Beginner",
    target: "Endurance",
    body_part: "Core",
    image: require("@/assets/images/news-3.png"),
    description: "A core exercise that helps improve stability and endurance.",
    secondary_muscles: "Shoulders, Back",
    instructions: [
      "Start with your forearms on the floor.",
      "Keep your body straight.",
      "Hold the position while keeping your core engaged.",
    ],
  },
  {
    exercise_id: "EX010",
    exercise_name: "Dumbbell Lateral Raise",
    exercise_category: "Upper Body",
    equipment: "Dumbbell",
    level: "Beginner",
    target: "Strength",
    body_part: "Shoulders",
    image: require("@/assets/images/news-1.png"),
    description: "An isolation movement for the shoulder muscles.",
    secondary_muscles: "Traps",
    instructions: [
      "Hold dumbbells beside your body.",
      "Raise your arms to shoulder height.",
      "Lower them slowly.",
    ],
  },
];
