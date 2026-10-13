import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  reminderDays: z.array(z.number()).min(1, "Reminder days is required"),
  reminderTime: z
    .string()
    .regex(/^[0-9]{2}:[0-9]{2}$/, "Invalid time")
    .min(1, "Reminder time is required"),
});

export function useOnboardingReminderForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      reminderDays: [],
      reminderTime: "",
    },
  });
}
