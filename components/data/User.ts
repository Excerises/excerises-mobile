export type User = {
  user_id: string;
  role: string;
  name: string;
  email: string;
  password: string;
  email_verified_at: string | null;
};

export const users: User[] = [
  {
    user_id: "USR001",
    role: "user",
    name: "Rama",
    email: "rama@email.com",
    password: "password123",
    email_verified_at: "2026-09-01T08:00:00",
  },
];

export const currentUser = users[0];
