import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Logo, Mascot, ThemeToggle } from "./brand";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  wide,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-dvh grid lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel */}
      <aside className="hidden lg:flex relative flex-col justify-between p-12 bg-brand text-white overflow-hidden">
        <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-25" />
        <div className="relative">
          <Logo to="/" invert />
        </div>
        <div className="relative">
          <p className="arabic text-5xl mb-6">لُغَتِي</p>
          <h2 className="font-display font-bold text-4xl leading-tight max-w-md">
            Bahasa Arab jadi milikmu.
          </h2>
          <p className="text-white/80 mt-4 max-w-md leading-relaxed">
            Klik tulisan Arab, langsung dengar pengucapan penutur asli. Belajar 5 menit sehari —
            seru seperti main game.
          </p>
          <div className="mt-8 flex items-center gap-3 bg-white/10 rounded-2xl p-3 w-fit">
            <span className="text-2xl">🐪</span>
            <p className="text-sm font-bold">Aku Jamal, siap temani belajarmu!</p>
          </div>
        </div>
        <p className="relative text-white/60 text-sm">
          © {new Date().getFullYear()} Lughati · Dibuat untuk pelajar bahasa Arab
        </p>
      </aside>

      {/* Form panel */}
      <main className="flex flex-col bg-bg">
        <div className="flex items-center justify-between p-5">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-fg-muted hover:text-brand transition"
          >
            <ArrowLeft size={16} /> Kembali
          </Link>
          <ThemeToggle />
        </div>
        <div className="flex-1 grid place-items-center px-5 pb-10">
          <div className={wide ? "w-full max-w-lg" : "w-full max-w-md"}>
            <div className="lg:hidden flex justify-center mb-6">
              <Logo to="/" />
            </div>
            <h1 className="font-display font-bold text-3xl text-fg">{title}</h1>
            {subtitle && <p className="text-fg-muted mt-2">{subtitle}</p>}
            <div className="mt-7">{children}</div>
            {footer && <div className="mt-6 text-center text-sm text-fg-muted">{footer}</div>}
          </div>
        </div>
        <div className="lg:hidden p-5 flex justify-center">
          <Mascot message="Butuh bantuan? Aku di sini 🐪" size="sm" />
        </div>
      </main>
    </div>
  );
}

export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: ReactNode;
  hint?: string;
}) {
  return (
    <label className="block mb-4">
      <span className="block text-sm font-bold text-fg mb-1.5">{label}</span>
      {children}
      {hint && <span className="block text-xs text-fg-subtle mt-1.5">{hint}</span>}
    </label>
  );
}

export const inputClasses =
  "w-full rounded-2xl border border-line bg-surface px-4 py-3 text-fg placeholder:text-fg-subtle focus:border-brand focus:ring-4 focus:ring-brand/15 outline-none transition";
