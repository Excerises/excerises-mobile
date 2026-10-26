import { CalculateFitnessRequest } from "../public/calculate-fitness-level";

export interface UpdateProfileRequest extends CalculateFitnessRequest {
  reminder_days: number[];
  reminder_time: string;
}

export interface UpdateProfileAuthRequest {
  email?: string;
  name?: string;
  password?: string;
}
