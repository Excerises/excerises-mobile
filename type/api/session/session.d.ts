interface CreateSessionRequestExercise {
  exercise_id: number;
  duration: number;
}

export interface CreateSessionRequest {
  name?: string;
  duration: number;
  feedback?: any;
  exercises: CreateSessionRequestExercise[];
}
