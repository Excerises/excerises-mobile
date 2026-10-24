export * from "./color";
export * from "./font";
export * from "./border";
export * from "./spacing";

export type Theme = "system" | "light" | "dark";
type ThemeColor = {
  primary: string;
  card: string;
  background: string;
  foreground: string;
  muted: string;
  mutedForeground: string;
  border: string;
  overlay: string;
  success: string;
  danger: string;
};

export const ThemeColors: Record<string, ThemeColor> = {
  light: {
    primary: "#f9a237",
    background: "#F2F2F2",
    card: "#FFFFFF",
    foreground: "#01101C",
    muted: "#E6E6E6",
    mutedForeground: "#7d8287",
    border: "#E6E6E6",
    overlay: "rgba(0,0,0,0.35)",
    success: "#16C84E",
    danger: "#FF2C2C",
  },
  dark: {
    primary: "#f9a237",
    card: "#252525",
    background: "#000000",
    foreground: "#F7F8FA",
    muted: "#333333",
    mutedForeground: "#9BA1A6",
    border: "#333333",
    overlay: "rgba(0,0,0,0.35)",
    success: "#16C84E",
    danger: "#FF2C2C",
  },
};
