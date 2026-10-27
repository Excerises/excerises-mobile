import { useAuth } from "@/context/auth-context";
import { zodResolver } from "@hookform/resolvers/zod";
import moment from "moment";
import { useEffect } from "react";
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

export function useEditPreferencesForm() {
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(
      z.object({
        birth_date: z.string().min(1, "Birth date is required"),
        gender: z.enum(["male", "female"]),
        height: z.number().positive("Height must be greater than zero"),
        weight: z.number().positive("Weight must be greater than zero"),
        workout_freq_per_week: z.number().int().min(1).max(6),
        workout_duration_per_day: z.number().min(0.01, "Duration is required"),
        water_intake_daily: z.number().min(0).max(4),
        reminder_days: z.array(z.number().int().min(1).max(7)),
        reminder_time: z.string().min(1, "Reminder time is required"),
      }),
    ),
    mode: "onBlur",
    defaultValues: {
      birth_date: "",
      gender: "male",
      height: 0,
      weight: 0,
      workout_freq_per_week: 1,
      workout_duration_per_day: 0,
      water_intake_daily: 0,
      reminder_days: [],
      reminder_time: "08:00",
    },
  });

  useEffect(() => {
    if (!user) return;

    form.reset({
      birth_date: user.profile?.birth_date
        ? moment(user.profile?.birth_date).format("YYYY-MM-DD")
        : "",
      gender: user.profile?.gender === "female" ? "female" : "male",
      height: Number(user.profile?.height ?? 0),
      weight: Number(user.profile?.weight ?? 0),
      workout_freq_per_week: Number(user.profile?.workout_freq_per_week ?? 1),
      workout_duration_per_day: Number(
        user.profile?.workout_duration_per_day ?? 0,
      ),
      water_intake_daily: Number(user.profile?.water_intake_daily ?? 0),
      reminder_days: Array.isArray(user.profile?.reminder_days)
        ? user.profile?.reminder_days.map(Number)
        : [],
      reminder_time: user.profile?.reminder_time ?? "08:00",
    });
  }, [user, form.reset]);

  return form;
}
