export type LoginLog = {
  login_logs_id: string;
  user_id: string;
  created_at: string;
  device: string;
  ip: string;
};

export const loginLogs: LoginLog[] = [
  {
    login_logs_id: "LOG001",
    user_id: "USR001",
    created_at: "2026-09-18T07:50:00",
    device: "Android",
    ip: "192.168.0.101",
  },
];
