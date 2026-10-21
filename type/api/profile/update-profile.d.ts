import { CalculateFitnessRequest } from "../public/calculate-fitness-level";

export interface UpdateProfile extends CalculateFitnessRequest {
  reminder_days: number[];
  reminder_time: string;
}
