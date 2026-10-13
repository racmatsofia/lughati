import { Link } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { cn } from "../lib/utils";
import { useApp } from "../lib/store";

/* -------------------------------- Logo ---------------------------------- */
export function Logo({
  to = "/",
  compact = false,
  invert = false,
  className,
}: {
  to?: string;
  compact?: boolean;
  invert?: boolean;
  className?: string;
}) {
  return (
    <Link to={to} className={cn("flex items-center gap-3 group", className)} aria-label="Lughati — beranda">
      <span
        className={cn(
          "grid place-items-center w-11 h-11 rounded-2xl bg-brand text-white font-arabic text-2xl font-bold shrink-0",
          "transition-transform group-hover:-rotate-6",
        )}
      >
        ل
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className={cn("font-display font-bold text-xl", invert ? "text-white" : "text-fg")}>
            Lughati
          </span>
          <span className="arabic text-brand text-sm mt-0.5" style={{ lineHeight: 1.2 }}>
            لُغَتِي
          </span>
        </span>
      )}
    </Link>
  );
}

/* ------------------------------- Mascot --------------------------------- */
export function Mascot({
  message,
  className,
  size = "md",
  mood = "happy",
}: {
  message?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  mood?: "happy" | "thinking" | "cheer" | "sad";
}) {
  const avatar = { sm: "w-9 h-9 text-lg", md: "w-12 h-12 text-2xl", lg: "w-16 h-16 text-3xl" };
  const emoji = { happy: "🐪", thinking: "🐪", cheer: "🐪", sad: "🐪" }[mood];
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className={cn(
          "grid place-items-center rounded-full bg-gold-soft dark:bg-gold/20 shrink-0",
          avatar[size],
          mood === "cheer" && "animate-pop",
        )}
        aria-hidden
      >
        {emoji}
      </span>
      {message && (
        <div className="bg-surface border border-line rounded-2xl rounded-bl-sm px-4 py-2.5 shadow-soft">
          <p className="text-sm font-bold text-fg">{message}</p>
        </div>
      )}
    </div>
  );
}

/* ----------------------------- ThemeToggle ------------------------------ */
export function ThemeToggle({ className }: { className?: string }) {
  const { toggleTheme, settings } = useApp();
  const isDark =
    settings.theme === "dark" ||
    (settings.theme === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-color-scheme: dark)").matches);
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      className={cn(
        "grid place-items-center w-10 h-10 rounded-full bg-surface-2 text-fg-muted hover:text-brand transition",
        className,
      )}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

/* ------------------------------ XP / Streak ----------------------------- */
export function StatPill({
  icon,
  value,
  tone = "gold",
  className,
}: {
  icon: string;
  value: string | number;
  tone?: "gold" | "brand";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-extrabold",
        tone === "gold"
          ? "bg-gold-soft text-gold-dark dark:bg-gold/20 dark:text-gold"
          : "bg-brand-light text-brand-dark dark:bg-brand/25 dark:text-white",
        className,
      )}
    >
      <span aria-hidden>{icon}</span>
      {value}
    </span>
  );
}

/* ------------------------------ Confetti -------------------------------- */
export function Confetti({ show }: { show: boolean }) {
  if (!show) return null;
  const pieces = Array.from({ length: 24 });
  const colors = ["#0E7C7B", "#F2A63B", "#E85D5D", "#2FA36B", "#D6F0EF"];
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute top-[-10%] w-2.5 h-3.5 rounded-sm animate-[float_2.4s_ease-in_forwards]"
          style={{
            left: `${(i * 100) / pieces.length}%`,
            background: colors[i % colors.length],
            animation: `fade-up 2.4s ${i * 40}ms ease-in forwards`,
            transform: `rotate(${i * 37}deg)`,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}
