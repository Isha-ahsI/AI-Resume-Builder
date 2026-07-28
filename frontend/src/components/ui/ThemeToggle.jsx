import React from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { NAV } from "../../data/testIds";
import { cn } from "../../lib/utils";

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      data-testid={NAV.themeToggle}
      aria-label="Toggle theme"
      className={cn(
        "relative h-9 w-9 rounded-full border border-border bg-background hover:bg-muted grid place-items-center transition-colors",
        className
      )}
    >
      <FiSun
        className={`h-4 w-4 absolute transition-all ${
          theme === "dark"
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
      />
      <FiMoon
        className={`h-4 w-4 absolute transition-all ${
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
}