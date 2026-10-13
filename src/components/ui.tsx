import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";

/* ------------------------------- Button --------------------------------- */
type Variant = "primary" | "secondary" | "outline" | "ghost" | "danger" | "gold";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark active:bg-brand-dark shadow-[0_6px_16px_rgb(14_124_123/0.28)]",
  secondary: "bg-brand-light text-brand-dark hover:bg-brand-soft dark:bg-brand/25 dark:text-white",
  outline: "bg-surface text-fg border border-line hover:border-brand hover:text-brand",
  ghost: "bg-transparent text-fg-muted hover:bg-surface-2 hover:text-fg",
  danger: "bg-coral text-white hover:brightness-95",
  gold: "bg-gold text-[#4a2c00] hover:bg-gold-dark hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-3 text-[15px]",
  lg: "px-7 py-3.5 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-bold transition-all duration-150 select-none",
    "disabled:opacity-50 disabled:pointer-events-none active:translate-y-px",
    variants[variant],
    sizes[size],
    className,
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant; size?: Size }) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

/* -------------------------------- Card ---------------------------------- */
export function Card({
  className,
  children,
  as: As = "div",
}: {
  className?: string;
  children: ReactNode;
  as?: any;
}) {
  return (
    <As
      className={cn(
        "bg-surface border border-line rounded-3xl shadow-soft",
        className,
      )}
    >
      {children}
    </As>
  );
}

/* -------------------------------- Chip ---------------------------------- */
export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: "neutral" | "brand" | "gold" | "coral" | "success";
  className?: string;
}) {
  const tones: Record<string, string> = {
    neutral: "bg-surface-2 text-fg-muted",
    brand: "bg-brand-light text-brand-dark dark:bg-brand/25 dark:text-white",
    gold: "bg-gold-soft text-gold-dark dark:bg-gold/20 dark:text-gold",
    coral: "bg-coral-soft text-coral dark:bg-coral/20 dark:text-coral",
    success: "bg-success-soft text-success dark:bg-success/20 dark:text-success",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[13px] font-bold",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ----------------------------- ProgressBar ------------------------------ */
export function ProgressBar({
  value,
  className,
  tone = "brand",
  height = 10,
}: {
  value: number;
  className?: string;
  tone?: "brand" | "gold" | "coral" | "white";
  height?: number;
}) {
  const tones: Record<string, string> = {
    brand: "bg-brand",
    gold: "bg-gold",
    coral: "bg-coral",
    white: "bg-white",
  };
  return (
    <div
      className={cn("w-full rounded-full overflow-hidden bg-black/10 dark:bg-white/15", className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn("h-full rounded-full transition-[width] duration-500 ease-out", tones[tone])}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

/* -------------------------------- Ring ---------------------------------- */
export function Ring({
  value,
  size = 64,
  stroke = 7,
  className,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (Math.min(100, Math.max(0, value)) / 100) * c;
  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth={stroke} className="stroke-black/10 dark:stroke-white/15" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          className="stroke-brand transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ------------------------------- Section -------------------------------- */
export function SectionTitle({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-4", className)}>
      <div>
        <h2 className="text-xl sm:text-2xl font-display font-bold text-fg">{title}</h2>
        {subtitle && <p className="text-sm text-fg-muted mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

/* ------------------------------ EmptyState ------------------------------ */
export function EmptyState({
  title,
  desc,
  action,
  emoji = "🐪",
}: {
  title: string;
  desc?: string;
  action?: ReactNode;
  emoji?: string;
}) {
  return (
    <div className="text-center py-14 px-6">
      <div className="text-5xl mb-3 animate-float">{emoji}</div>
      <h3 className="font-display font-bold text-lg text-fg">{title}</h3>
      {desc && <p className="text-fg-muted text-sm mt-1 max-w-sm mx-auto">{desc}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}

/* -------------------------------- Modal --------------------------------- */
export function Modal({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="relative w-full sm:max-w-md bg-surface border border-line rounded-t-3xl sm:rounded-3xl shadow-pop p-6 animate-fade-up max-h-[85vh] overflow-y-auto">
        {title && <h3 className="font-display font-bold text-lg mb-3">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
