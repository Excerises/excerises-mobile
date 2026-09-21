export type User = {
  user_id: string;
  name: string;
  email: string;
  password: string;
  role: "user" | "admin";
  email_verified_at: string | null;
};

export type UserProfile = {
  user_profile_id: string;
  user_id: string;
  gender: "male" | "female";
  birth_date: string;
  height: string;
  weight: string;
  bmi: string;
  fitness_level: string;
  frequency_exercise: number;
  duration_exercise: number;
  days: string[];
  reminder_time: string;
  goal: string;
  goal_description: string;
  goal_progress: number;
};

// Dummy data for the User entity in the ERD.
export const userData: User = {
  user_id: "1",
  name: "Rama",
  email: "rama@email.com",
  password: "password123",
  role: "user",
  email_verified_at: "2026-09-01T08:00:00",
};

// Dummy data for the User_Profile entity in the ERD.
export const userProfileData: UserProfile = {
  user_profile_id: "1",
  user_id: userData.user_id,
  gender: "male",
  birth_date: "2002-05-10",
  height: "171",
  weight: "68.5",
  bmi: "23.4",
  fitness_level: "Beginner",
  frequency_exercise: 4,
  duration_exercise: 30,
  days: ["Mon", "Wed", "Fri", "Sun"],
  reminder_time: "07:00",
};

export const userDisplayData = {
  homeName: "User",
};

export const profileDisplayData = {
  bmiStatus: "Normal",
  goal: "Muscle Gain",
  goalDescription: "Stay consistent and reach your goal.",
  goalProgress: 60,
};

export const profileStats = [
  {
    value: "24",
    label: "Workouts",
  },
  {
    value: "12",
    label: "Days Streak",
  },
  {
    value: "36.5",
    label: "Hours",
  },
];

export const fitnessResult = {
  level: userProfileData.fitness_level,
  description: "A great start! Keep going\nand stay consistent.",
};
