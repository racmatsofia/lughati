import { useApp } from "../lib/store";
import { cn } from "../lib/utils";

export function AvatarPicker({ emoji }: { emoji: string }) {
  const { user, setAvatar } = useApp();
  const active = user?.avatar === emoji;
  return (
    <button
      onClick={() => setAvatar(emoji)}
      aria-label={`Pilih avatar ${emoji}`}
      aria-pressed={active}
      className={cn(
        "grid place-items-center w-12 h-12 rounded-full text-2xl transition border-2",
        active
          ? "border-brand bg-brand-light dark:bg-brand/25 scale-105"
          : "border-line bg-surface hover:border-brand/50",
      )}
    >
      {emoji}
    </button>
  );
}
