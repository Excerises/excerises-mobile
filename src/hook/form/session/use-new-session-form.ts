import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  body_part: z.string().min(1, "Body part is required"),
  equipment: z.string().min(1, "Equipment is required"),
  target: z.string().min(1, "Target is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
  category: z.string().min(1, "Category is required"),
});

export function useNewSessionForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      body_part: "",
      equipment: "",
      target: "",
      difficulty: "",
      category: "",
    },
  });
}
