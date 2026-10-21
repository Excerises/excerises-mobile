import { Exercise } from "./exercise";
import { User } from "./user";

export interface SessionExercise {
  id: any;
  session_id: any;
  exercise_id: any;
  exercise?: Exercise;
  duration?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Session {
  id: any;
  user_id: any;
  user?: User;
  duration: number;
  feedback?: any;
  created_at?: string;
  updated_at?: string;
  exercises: SessionExercise[];
}
