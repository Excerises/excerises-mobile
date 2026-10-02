import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  body_part: z.string().min(1, "Body part is required"),
  target: z.string().min(1, "Target is required"),
  equipment: z.string().min(1, "Equipment is required"),
  category: z.string().min(1, "Category is required"),
});

export function useWorkoutPreferenceForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      body_part: "",
      target: "",
      equipment: "",
      category: "",
    },
  });

  return { form };
}
