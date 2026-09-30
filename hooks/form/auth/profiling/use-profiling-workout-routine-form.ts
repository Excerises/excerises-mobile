import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  frequencyPerWeek: z.number().min(1, "Frequency per week is required"),
  durationPerSession: z.number().min(0.1, "Duration per session is required"),
  waterIntakeDaily: z.number().min(0.1, "Water intake daily is required"),
});

export type ProfilingWorkoutRoutineInput = z.infer<typeof schema>;

export const profilingWorkoutRoutineDefaultValues: ProfilingWorkoutRoutineInput =
  {
    frequencyPerWeek: 0,
    durationPerSession: 0,
    waterIntakeDaily: 0,
  };

export function useProfilingWorkoutRoutineForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: profilingWorkoutRoutineDefaultValues,
  });

  return { form };
}
