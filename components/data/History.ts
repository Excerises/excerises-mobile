import type { ImageSourcePropType } from "react-native";

import { exercises, type Exercise } from "@/components/data/Exercise";
import { currentUser } from "@/components/data/User";

export type History = {
  user_id: string;
  exercise_id: string;
  duration: number;
  status: "completed" | "in_progress";
  created_at: string;
  difficulty?: "Too Easy" | "Just Right" | "Too Hard";
};

export const histories: History[] = [
  {
    user_id: "USR001",
    exercise_id: "EX004",
    duration: 265,
    status: "in_progress",
    created_at: "2026-09-18T11:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX002",
    duration: 138,
    status: "in_progress",
    created_at: "2026-09-18T10:30:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 265,
    status: "completed",
    created_at: "2026-09-21T10:00:00",
    difficulty: "Just Right",
  },
  {
    user_id: "USR001",
    exercise_id: "EX002",
    duration: 372,
    status: "completed",
    created_at: "2026-09-18T09:00:00",
    difficulty: "Just Right",
  },
  {
    user_id: "USR001",
    exercise_id: "EX009",
    duration: 225,
    status: "completed",
    created_at: "2026-09-18T08:00:00",
    difficulty: "Too Hard",
  },
  {
    user_id: "USR001",
    exercise_id: "EX003",
    duration: 320,
    status: "completed",
    created_at: "2026-09-17T10:00:00",
    difficulty: "Just Right",
  },
  {
    user_id: "USR001",
    exercise_id: "EX004",
    duration: 378,
    status: "completed",
    created_at: "2026-09-18T09:00:00",
    difficulty: "Just Right",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 332,
    status: "completed",
    created_at: "2026-09-17T08:00:00",
    difficulty: "Too Easy",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 332,
    status: "completed",
    created_at: "2026-09-15T10:00:00",
    difficulty: "Just Right",
  },
];

export type WorkoutHistoryItem = {
  id: string;
  title: string;
  exerciseCount: number;
  duration: number;
  image: ImageSourcePropType;
  target: string;
  bodyPart: string;
  equipment: string;
  createdAt: string;
  historyItems: History[];
};

export type WorkoutHistoryGroup = {
  title: string;
  workouts: WorkoutHistoryItem[];
};

const getExercise = (exerciseId: string): Exercise | undefined =>
  exercises.find((exercise) => exercise.exercise_id === exerciseId);

const completedHistory = histories
  .filter(
    (item) =>
      item.user_id === currentUser.user_id && item.status === "completed",
  )
  .sort(
    (first, second) =>
      new Date(second.created_at).getTime() -
      new Date(first.created_at).getTime(),
  );

export const formatDate = (date: string) => {
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

export const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });

const formatSectionTitle = (date: string, index: number) => {
  if (index === 0) {
    return "TODAY";
  }

  if (index === 1) {
    return "YESTERDAY";
  }

  const value = new Date(date);

  const month = value
    .toLocaleDateString("en-US", { month: "short" })
    .toUpperCase();

  return `${value.getDate()} ${month} ${value.getFullYear()}`;
};

export const createWorkoutHistoryGroups = (): WorkoutHistoryGroup[] => {
  const groups: WorkoutHistoryGroup[] = [];

  for (let index = 0; index < completedHistory.length; index += 3) {
    const historyItems = completedHistory.slice(index, index + 3);
    const firstExercise = getExercise(historyItems[0]?.exercise_id);

    if (!firstExercise) {
      continue;
    }

    const workout: WorkoutHistoryItem = {
      id: `WORKOUT-${groups.length + 1}`,
      title: `My Workout #${groups.length + 1}`,
      exerciseCount: historyItems.length,
      duration: historyItems.reduce((total, item) => total + item.duration, 0),
      image: firstExercise.image,
      target: firstExercise.target,
      bodyPart: firstExercise.body_part,
      equipment: firstExercise.equipment,
      createdAt: historyItems[0].created_at,
      historyItems,
    };

    groups.push({
      title: formatSectionTitle(workout.createdAt, groups.length),
      workouts: [workout],
    });
  }

  return groups;
};

export const getHistoryWorkoutById = (workoutId: string) =>
  createWorkoutHistoryGroups()
    .flatMap((group) => group.workouts)
    .find((workout) => workout.id === workoutId);

export const getExerciseById = (exerciseId: string) => getExercise(exerciseId);
