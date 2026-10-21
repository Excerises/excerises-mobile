export interface CalculateFitnessRequest {
  age: number;
  gender: string;
  height: number;
  weight: number;
  bmi: number;
  workout_freq_per_week: number;
  workout_duration_per_day: number;
  water_intake_daily: number;
}

export interface CalculateFitnessResponse {
  level: string;
}
