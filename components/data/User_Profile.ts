export type UserProfile = {
  user_profile_id: string;
  user_id: string;
  gender: "male" | "female";
  birth_date: string;
  height: number;
  weight: number;
  bmi: number;
  bmi_status: string;
  fitness_level: string;
  fitness_level_description: string;
  frequency_exercise: number;
  duration_exercise: number;
  days: string[];
  reminder_time: string;
  goal: string;
  goal_description: string;
  goal_progress: number;
  workout_count: number;
  days_streak: number;
  total_hours: number;
};

export const userProfiles: UserProfile[] = [
  {
    user_profile_id: "PRO001",
    user_id: "USR001",
    gender: "male",
    birth_date: "2002-06-15",
    height: 171,
    weight: 68.5,
    bmi: 23.4,
    bmi_status: "Normal",
    fitness_level: "Beginner",
    fitness_level_description: "A great start! Keep going\nand stay consistent.",
    frequency_exercise: 4,
    duration_exercise: 30,
    days: ["Mon", "Wed", "Fri", "Sun"],
    reminder_time: "19:00",
    goal: "Muscle Gain",
    goal_description: "Stay consistent and reach your goal.",
    goal_progress: 60,
    workout_count: 24,
    days_streak: 12,
    total_hours: 36.5,
  },
];
