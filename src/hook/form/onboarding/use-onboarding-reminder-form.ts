import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  reminderDays: z.array(z.number()).min(1, "Reminder days is required"),
  reminderTime: z.string().min(1, "Reminder time is required"),
});

export function useOnboardingReminderForm() {
  return useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      reminderDays: [],
      reminderTime: "08:00",
    },
  });
}
