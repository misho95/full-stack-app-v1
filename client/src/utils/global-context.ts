import { create } from "zustand";
import { UserType } from "./types";

type useThemeContextType = {
  theme: string;
  setTheme: (prop: "light" | "dark") => void;
  toggleTheme: () => void;
};

export const useThemeContext = create<useThemeContextType>((set) => ({
  theme: "light",
  setTheme: (prop) => set(() => ({ theme: prop })),
  toggleTheme: () =>
    set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
}));

type useSessionUserType = {
  user: null | UserType;
  setUser: (prop: UserType) => void;
  clearUser: () => void;
};

export const useSessionUser = create<useSessionUserType>((set) => ({
  user: null,
  setUser: (prop) => set(() => ({ user: prop })),
  clearUser: () => set(() => ({ user: null })),
}));
