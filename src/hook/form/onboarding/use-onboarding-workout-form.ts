import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  workoutFreqPerWeek: z.number().min(1, "Frequency per week is required"),
  workoutDurationPerSession: z
    .number()
    .min(0.1, "Duration per session is required"),
  waterIntakeDaily: z.number().min(0.1, "Water Intake Daily is required"),
});

export function useOnboardingWorkoutForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      workoutFreqPerWeek: 0,
      workoutDurationPerSession: 0,
      waterIntakeDaily: 0,
    },
  });
}
