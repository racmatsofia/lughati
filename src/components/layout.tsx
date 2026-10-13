import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Outlet, useLocation } from "react-router-dom";
import {
  Award,
  BarChart3,
  BookOpen,
  BookText,
  Gamepad2,
  Home,
  Layers,
  Languages,
  Menu,
  Settings,
  Trophy,
  User,
  X,
  Zap,
} from "lucide-react";
import { Logo, Mascot, ThemeToggle } from "./brand";
import { buttonClasses } from "./ui";
import { cn, formatNumber } from "../lib/utils";
import { useApp } from "../lib/store";

/* ============================ Public Layout ============================= */
const publicLinks = [
  { to: "/#fitur", label: "Fitur" },
  { to: "/app/belajar", label: "Kursus" },
  { to: "/harga", label: "Harga" },
  { to: "/tentang", label: "Tentang" },
];

export function PublicLayout() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { user } = useApp();

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-dvh flex flex-col bg-bg">
      <header className="sticky top-0 z-40 backdrop-blur bg-bg/85 border-b border-line">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 h-[72px] flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden lg:flex items-center gap-9">
            {publicLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[15px] font-semibold text-fg-muted hover:text-brand transition"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:grid" />
            <Link to="/masuk" className={cn(buttonClasses("ghost", "md"), "hidden sm:inline-flex")}>
              Masuk
            </Link>
            <Link to={user ? "/app/belajar" : "/daftar"} className={buttonClasses("primary", "md")}>
              {user ? "Buka Aplikasi" : "Coba Gratis"}
            </Link>
            <button
              className="lg:hidden grid place-items-center w-10 h-10 rounded-full bg-surface-2"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {open && (
          <div className="lg:hidden border-t border-line bg-bg px-5 py-4 flex flex-col gap-1 animate-fade-up">
            {publicLinks.map((l) => (
              <Link key={l.label} to={l.to} className="py-3 font-semibold text-fg border-b border-line/60">
                {l.label}
              </Link>
            ))}
            <Link to="/masuk" className="py-3 font-semibold text-brand">
              Masuk
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  const cols = [
    { title: "Produk", links: [["Fitur", "/#fitur"], ["Kursus", "/app/belajar"], ["Harga", "/harga"], ["Kamus", "/app/kamus"]] },
    { title: "Belajar", links: [["Hijaiyah", "/app/hijaiyah"], ["Flashcard", "/app/flashcard"], ["Cerita", "/app/cerita"], ["Peringkat", "/app/peringkat"]] },
    { title: "Perusahaan", links: [["Tentang", "/tentang"], ["Bantuan", "/bantuan"], ["Kelas Guru", "/kelas"]] },
  ] as const;
  return (
    <footer className="border-t border-line bg-bg-alt mt-16">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-sm text-fg-muted mt-4 max-w-xs leading-relaxed">
              Lughati (لُغَتِي) berarti "bahasa-ku". Belajar bahasa Arab dari nol — cukup klik,
              langsung dengar, jadi lancar.
            </p>
            <Mascot message="Ahlan! Aku Jamal 🐪" className="mt-5" size="sm" />
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <h4 className="font-display font-bold text-fg mb-3">{c.title}</h4>
              <ul className="space-y-2.5">
                {c.links.map(([label, to]) => (
                  <li key={label}>
                    <Link to={to} className="text-sm text-fg-muted hover:text-brand transition">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-fg-subtle">
          <p>© {new Date().getFullYear()} Lughati. Dibuat dengan ❤️ untuk pelajar bahasa Arab.</p>
          <p className="arabic">بِالْعَرَبِيَّةِ نَتَعَلَّمُ وَنَتَقَدَّمُ</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================== App Layout ============================== */
const primaryNav = [
  { to: "/app/belajar", label: "Belajar", icon: Home },
  { to: "/app/kamus", label: "Kamus", icon: BookOpen },
  { to: "/app/latihan", label: "Latihan", icon: Gamepad2 },
  { to: "/app/progres", label: "Progres", icon: BarChart3 },
  { to: "/app/profil", label: "Profil", icon: User },
];

const secondaryNav = [
  { to: "/app/hijaiyah", label: "Hijaiyah", icon: Languages },
  { to: "/app/flashcard", label: "Flashcard", icon: Layers },
  { to: "/app/cerita", label: "Cerita", icon: BookText },
  { to: "/app/peringkat", label: "Peringkat", icon: Trophy },
  { to: "/app/pencapaian", label: "Pencapaian", icon: Award },
];

export function AppLayout() {
  const { user, progress, level, settings } = useApp();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!user) return <Navigate to="/masuk" replace state={{ from: pathname }} />;

  return (
    <div className="min-h-dvh bg-bg">
      {/* ===== Desktop sidebar ===== */}
      <aside className="hidden lg:flex fixed inset-y-0 left-0 w-[268px] flex-col border-r border-line bg-surface px-4 py-6">
        <div className="px-2">
          <Logo to="/app/belajar" />
        </div>

        <nav className="mt-8 flex-1 overflow-y-auto no-scrollbar">
          <SideLink to="/app/belajar" label="Belajar" icon={Home} end />
          {secondaryNav.slice(0, 1).map((n) => (
            <SideLink key={n.to} {...n} />
          ))}
          {primaryNav.slice(1, 4).map((n) => (
            <SideLink key={n.to} {...n} />
          ))}
          {secondaryNav.slice(1).map((n) => (
            <SideLink key={n.to} {...n} />
          ))}
        </nav>

        <Link
          to="/app/profil"
          className="mt-4 flex items-center gap-3 rounded-2xl bg-bg-alt dark:bg-surface-2 px-3 py-3 hover:ring-1 hover:ring-brand/40 transition"
        >
          <span className="grid place-items-center w-10 h-10 rounded-full bg-brand text-white text-xl">
            {user.avatar}
          </span>
          <span className="min-w-0 flex-1">
            <span className="block font-bold text-fg truncate">{user.name}</span>
            <span className="block text-xs text-fg-muted">
              Level {level} · {formatNumber(progress.xp)} XP
            </span>
          </span>
          <Settings size={16} className="text-fg-subtle" />
        </Link>
      </aside>

      {/* ===== Mobile top bar ===== */}
      <header className="lg:hidden sticky top-0 z-30 backdrop-blur bg-bg/90 border-b border-line">
        <div className="h-14 px-4 flex items-center justify-between">
          <Logo to="/app/belajar" compact />
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft dark:bg-gold/20 px-3 py-1.5 text-[13px] font-extrabold text-gold-dark dark:text-gold">
              🔥 {progress.streak}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-light dark:bg-brand/25 px-3 py-1.5 text-[13px] font-extrabold text-brand-dark dark:text-white">
              <Zap size={13} /> {formatNumber(progress.xp)}
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ===== Content ===== */}
      <div className="lg:pl-[268px]">
        <div className="mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-10 py-6 lg:py-10 pb-28 lg:pb-16">
          <Outlet />
        </div>
      </div>

      {/* ===== Mobile bottom nav ===== */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-line bg-surface/95 backdrop-blur safe-bottom">
        <ul className="grid grid-cols-5">
          {primaryNav.map((n) => (
            <li key={n.to}>
              <NavLink
                to={n.to}
                className={({ isActive }) =>
                  cn(
                    "flex flex-col items-center gap-1 py-2.5 text-[11px] font-bold transition",
                    isActive ? "text-brand" : "text-fg-subtle",
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={cn(
                        "grid place-items-center w-11 h-7 rounded-full transition",
                        isActive && "bg-brand-light dark:bg-brand/25",
                      )}
                    >
                      <n.icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                    </span>
                    {n.label}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* hint settings for language */}
      {settings.lang === "en" && null}
    </div>
  );
}

function SideLink({
  to,
  label,
  icon: Icon,
  end,
}: {
  to: string;
  label: string;
  icon: any;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 rounded-2xl px-3 py-2.5 mb-1 font-bold text-[15px] transition",
          isActive
            ? "bg-brand-light text-brand-dark dark:bg-brand/25 dark:text-white"
            : "text-fg-muted hover:bg-bg-alt dark:hover:bg-surface-2 hover:text-fg",
        )
      }
    >
      <Icon size={19} strokeWidth={2.2} />
      {label}
    </NavLink>
  );
}

/* ============================ Simple Page =============================== */
export function PageHeader({
  title,
  subtitle,
  action,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-3 mb-6", className)}>
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-fg">{title}</h1>
        {subtitle && <p className="text-fg-muted mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
