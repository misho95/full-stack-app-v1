"use client";

import { ReactNode, useEffect, useLayoutEffect } from "react";
import { useThemeContext } from "./global-context";

const GlobalTheme = ({ children }: { children: ReactNode }) => {
  const { theme, setTheme } = useThemeContext();

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark");
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return children;
};

export default GlobalTheme;
