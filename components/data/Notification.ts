export type Notification = {
  notification_id: string;
  user_id: string;
  title: string;
  description: string;
  created_at: string;
  read_at: string | null;
  updated_at: string;
};

export const notifications: Notification[] = [
  {
    notification_id: "NOT001",
    user_id: "USR001",
    title: "Workout Completed",
    description: "You completed My Workout #1.",
    created_at: "2026-09-27T18:58:00",
    read_at: null,
    updated_at: "2026-09-27T18:58:00",
  },
  {
    notification_id: "NOT002",
    user_id: "USR001",
    title: "Great Job!",
    description: "You've been consistent with your workouts.",
    created_at: "2026-09-27T18:00:00",
    read_at: null,
    updated_at: "2026-09-27T18:00:00",
  },
  {
    notification_id: "NOT003",
    user_id: "USR001",
    title: "Reminder",
    description: "Keep up your workout today!",
    created_at: "2026-09-26T18:00:00",
    read_at: null,
    updated_at: "2026-09-26T18:00:00",
  },
  {
    notification_id: "NOT004",
    user_id: "USR001",
    title: "Achievement",
    description: "You have completed 5 workouts!",
    created_at: "2026-09-25T18:00:00",
    read_at: null,
    updated_at: "2026-09-25T18:00:00",
  },
];
