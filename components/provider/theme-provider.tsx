import { createContext, useContext, useState } from "react";

export type ThemeType = "light" | "dark";
export type ThemeContext = {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
};
const ThemeContext = createContext({} as ThemeContext);

export function useThemeContext() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeType>("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
