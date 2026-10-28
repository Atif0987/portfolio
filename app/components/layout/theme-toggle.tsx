"use client";

import { MoonIcon, SunIcon } from "../ui/icons";

export default function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable (private mode) — theme still applies for this visit
    }
  };

  // Both icons render; CSS shows the right one so server and client HTML match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-chip"
    >
      <MoonIcon className="dark:hidden" />
      <SunIcon className="hidden dark:block" />
    </button>
  );
}
