import { User } from "@/types/entity";
import { create } from "zustand";

export type AuthContext = {
  user?: User | null;
  setUser: (user?: User | null) => void;
};

export const useAuth = create<AuthContext>((set) => {
  return {
    user: null,
    setUser: (user) => set(() => ({ user })),
  };
});
