export type Notification = {
  notification_id: string;
  user_id: string;
  message: string;
  created_at: string;
};

export const notifications: Notification[] = [
  {
    notification_id: "NOT001",
    user_id: "USR001",
    message: "Your workout reminder is ready.",
    created_at: "2026-09-18T18:00:00",
  },
];
