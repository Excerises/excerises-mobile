import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(5),
  email: z.email().min(1),
  password: z.string().min(8),
  passwordConfirm: z.string().min(8),
});

export type RegisterFormInput = z.infer<typeof schema>;

export const registerFormDefaults: RegisterFormInput = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

export function useRegisterForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: registerFormDefaults,
  });

  return { form };
}
