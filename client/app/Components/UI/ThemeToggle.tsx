"use client";

import { useTheme } from "@/app/providers";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="w-14 h-7 flex items-center rounded-full px-1 transition-all duration-300 border shadow-sm"
      style={{
        background: isDark ? "var(--surface)" : "var(--muted)",
        borderColor: "var(--border)",
      }}
    >
      <div
        className={`w-5 h-5 rounded-full shadow-md transform transition-all duration-300 flex items-center justify-center text-xs ${
          isDark ? "translate-x-7" : "translate-x-0"
        }`}
        style={{
          background: isDark ? "var(--foreground)" : "var(--foreground)",
          color: isDark ? "var(--background)" : "var(--background)",
        }}
      >
        {isDark ? <Moon size={12} /> : <Sun size={12} />}
      </div>
    </button>
  );
}
