import type { ImageSourcePropType } from "react-native";

import { workouts, type Workout } from "./workout-data";

export type HomeNewsItem = {
  id: string;
  image: ImageSourcePropType;
  title: string;
};

export type TodayWorkout = {
  workout: Workout;
  completed: boolean;
};

export type RecentWorkout = {
  workout: Workout;
  duration: number;
  completedAt: Date;
};

export const homeNewsData: HomeNewsItem[] = [
  {
    id: "1",
    image: require("@/assets/images/news-1.png"),
    title: "5 Tips to Stay Consistent with Your Workout",
  },
  {
    id: "2",
    image: require("@/assets/images/news-2.png"),
    title: "How to Build a Better Workout Routine",
  },
  {
    id: "3",
    image: require("@/assets/images/news-3.png"),
    title: "Simple Ways to Improve Your Fitness",
  },
];

export const todayWorkouts: TodayWorkout[] = [
  {
    workout: workouts[0],
    completed: true,
  },
  {
    workout: workouts[1],
    completed: false,
  },
];

export const recentWorkouts: RecentWorkout[] = [
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-21T10:00:00"),
  },
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-22T10:00:00"),
  },
];

export const bodyStats = {
  height: "171",
  weight: "68.5",
  bmi: "23.4",
  bmiStatus: "Normal",
};

export const homeUserName = "User";

export const workoutBanner = {
  image: require("@/assets/images/workout-banner.jpeg"),
  title: "Ready to Workout?",
  description: "Choose your workout type and get personalized exercises.",
};

export const weeklyTarget = 4;

export const weeklyDayNames = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];
