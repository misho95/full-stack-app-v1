"use client";

import { useThemeContext } from "@/utils/global-context";

const ThemeSwitch = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button onClick={() => toggleTheme()}>
      {theme === "light" ? "Switch on Dark" : "Switch on Light"}
    </button>
  );
};

export default ThemeSwitch;
