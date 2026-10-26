import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

export function useEditAuthForm() {
  return useForm({
    resolver: zodResolver(
      z.object({
        name: z.string(),
        password: z.string(),
        password_confirmation: z.string(),
      }),
    ),
    defaultValues: {
      name: "",
      password: "",
      password_confirmation: "",
    },
  });
}
