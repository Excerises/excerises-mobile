import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  name: z.string().min(1, "Workout name is required"),
});

export type ConfirmWorkoutRequest = z.infer<typeof schema>;

export const confirmWorkoutDefaultValues: ConfirmWorkoutRequest = {
  name: "",
};

export function useConfirmWorkoutForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: confirmWorkoutDefaultValues,
  });

  return {
    form,
  };
}
