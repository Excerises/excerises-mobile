import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  email: z.email().min(1),
  password: z.string().min(8),
});

export type LoginInput = z.infer<typeof schema>;

export function useLoginForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return { form };
}
