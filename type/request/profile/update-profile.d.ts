import { CalculateFitnessRequest } from "../onboarding/calculate-fitness-level";

export interface UpdateProfile extends CalculateFitnessRequest {
  reminder_days: number[];
  reminder_time: string;
}
