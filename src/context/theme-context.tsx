import { Theme } from "@/constant/theme";
import { createContext, ReactNode, useContext, useState } from "react";

type ThemeContext = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  rotateTheme: () => void;
};

const ThemeContext = createContext({} as ThemeContext);

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  function rotateTheme() {
    // const themes = ["system", "light", "dark"];
    const themes = ["light", "dark"];
    const nextIndex = themes.indexOf(theme) + 1;
    setTheme(themes[nextIndex > themes.length - 1 ? 0 : nextIndex] as any);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, rotateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
