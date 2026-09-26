import { genderOptions } from "@/constant/gender";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  birthDate: z.string().min(1, "Birth of date is required"),
  gender: z.string(),
  height: z.number().min(0, "Height is required"),
  weight: z.number().min(0, "Weight is required"),
});

export type ProfilingIdentityForm = z.infer<typeof schema>;

const profilingIdentityDefaultValues: ProfilingIdentityForm = {
  birthDate: "",
  gender: genderOptions[0].value,
  height: 0,
  weight: 0,
};

export function useProfilingIdentityForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: profilingIdentityDefaultValues,
  });

  return {
    form,
  };
}
