import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../../type/entity";

type AuthContext = {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoaded: boolean;
};

const AuthContext = createContext({} as AuthContext);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isLoaded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
