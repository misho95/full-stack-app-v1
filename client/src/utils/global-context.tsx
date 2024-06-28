import { create } from "zustand";

type useThemeContextType = {
  theme: string;
  setTheme: (prop: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const useThemeContext = create<useThemeContextType>((set) => ({
  theme: "light",
  setTheme: (prop) => ({ theme: prop }),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));
