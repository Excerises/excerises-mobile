export type History = {
  user_id: string;
  exercise_id: string;
  duration: number;
  status: "completed" | "in_progress";
  created_at: string;
};

export const histories: History[] = [
  {
    user_id: "USR001",
    exercise_id: "EX004",
    duration: 265,
    status: "in_progress",
    created_at: "2026-09-18T11:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX002",
    duration: 138,
    status: "in_progress",
    created_at: "2026-09-18T10:30:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 265,
    status: "completed",
    created_at: "2026-09-21T10:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX002",
    duration: 372,
    status: "completed",
    created_at: "2026-09-18T09:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX009",
    duration: 225,
    status: "completed",
    created_at: "2026-09-18T08:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX003",
    duration: 320,
    status: "completed",
    created_at: "2026-09-17T10:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX004",
    duration: 378,
    status: "completed",
    created_at: "2026-09-17T09:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 332,
    status: "completed",
    created_at: "2026-09-17T08:00:00",
  },
  {
    user_id: "USR001",
    exercise_id: "EX001",
    duration: 332,
    status: "completed",
    created_at: "2026-09-15T10:00:00",
  },
];
