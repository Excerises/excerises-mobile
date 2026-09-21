import { workouts, type Workout } from "./exercise-data";

export const todayWorkouts = [
  {
    workout: workouts[0],
    completed: true,
  },
  {
    workout: workouts[1],
    completed: false,
  },
];

export const currentWorkouts = [
  {
    workout: workouts[3],
    duration: "04:25",
  },
  {
    workout: workouts[1],
    duration: "02:18",
  },
];

export type WorkoutHistoryItem = {
  workout: Workout;
  duration: string;
  completed: boolean;
};

export const historyToday: WorkoutHistoryItem[] = [
  {
    workout: workouts[0],
    duration: "04:25",
    completed: true,
  },
  {
    workout: workouts[1],
    duration: "06:12",
    completed: true,
  },
  {
    workout: workouts[8],
    duration: "03:45",
    completed: true,
  },
];

export const historyYesterday: WorkoutHistoryItem[] = [
  {
    workout: workouts[2],
    duration: "05:20",
    completed: true,
  },
  {
    workout: workouts[3],
    duration: "06:18",
    completed: true,
  },
];




export type WorkoutHistory = {
  workout: Workout;
  duration: number;
  completedAt: Date;
};

export const recentHomeWorkouts: WorkoutHistory[] = [
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-17T10:00:00"),
  },
  {
    workout: workouts[0],
    duration: 332,
    completedAt: new Date("2026-09-15T10:00:00"),
  },
];


export const historyLabels = {
  today: "Today, 18 Sep 2026",
  yesterday: "Yesterday, 17 Sep 2026",
};
