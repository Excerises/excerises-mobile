export type UserRole = "admin" | "user";

export interface UserProfile {
  id: string;
  birth_date: string;
  height: number;
  weight: number;
  bmi: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  reminder_days: number[];
  reminder_time: string;
  fitness_level: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  profile?: UserProfile;
}
