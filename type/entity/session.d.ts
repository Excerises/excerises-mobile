import { Exercise } from "./exercise";
import { User } from "./user";

export interface Session {
  id: any;
  user_id: any;
  user?: User;
  duration: number;
  feedback?: any;
  created_at?: string;
  updated_at?: string;
  exercises: Exercise[];
}
