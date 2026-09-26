import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  reminderDays: z.array(z.number()).min(1, "Please select days"),
  reminderTime: z.string().min(1, "Reminder time is required"),
});

export type ProfilingSetReminderInput = z.infer<typeof schema>;

const profilingSetReminderInput: ProfilingSetReminderInput = {
  reminderDays: [],
  reminderTime: "",
};

export function useProfilingSetReminderForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: profilingSetReminderInput,
  });

  return {
    form,
  };
}
