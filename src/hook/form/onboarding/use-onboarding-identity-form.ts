import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  birthDate: z.string().min(1, "Birth date is required"),
  gender: z.string().min(1, "Gender is required"),
  height: z.number().min(1, "Height is required"),
  weight: z.number().min(1, "Weight is required"),
});

export function useOnboardingIdentityForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      birthDate: "",
      gender: "",
      height: 0,
      weight: 0,
    },
  });
}
