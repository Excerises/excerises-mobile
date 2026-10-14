import { User } from "./user";

export interface News {
  id: any;
  title: string;
  image?: string;
  description?: string;
  content: string;
  viewed_count: number;
  created_by_id: any;
  created_by?: User;
  created_at: string;
  updated_at: string;
}
