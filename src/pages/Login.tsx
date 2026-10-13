import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, LogIn, Sparkles } from "lucide-react";
import { AuthShell, Field, inputClasses } from "../components/AuthShell";
import { Button } from "../components/ui";
import { useApp } from "../lib/store";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const [email, setEmail] = useState("aisyah@lughati.app");
  const [password, setPassword] = useState("rahasia123");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const target = location?.state?.from || "/app/belajar";

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return setError("Alamat email belum benar.");
    if (password.length < 6) return setError("Kata sandi minimal 6 karakter.");
    login(email);
    navigate(target, { replace: true });
  }

  function guest() {
    login("tamu@lughati.app", "Sahabat Lughati");
    navigate("/app/belajar", { replace: true });
  }

  return (
    <AuthShell
      title="Ahlan wa sahlan! 👋"
      subtitle="Masuk untuk melanjutkan progres belajarmu."
      footer={
        <>
          Belum punya akun?{" "}
          <Link to="/daftar" className="font-bold text-brand hover:underline">
            Daftar gratis
          </Link>
        </>
      }
    >
      <form onSubmit={submit}>
        <Field label="Email">
          <input
            type="email"
            className={inputClasses}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nama@email.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Kata sandi">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-subtle hover:text-brand"
              aria-label={show ? "Sembunyikan sandi" : "Tampilkan sandi"}
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </Field>

        <div className="flex items-center justify-between mb-5">
          <label className="flex items-center gap-2 text-sm text-fg-muted">
            <input type="checkbox" defaultChecked className="accent-brand w-4 h-4" />
            Ingat saya
          </label>
          <Link to="/lupa-sandi" className="text-sm font-bold text-brand hover:underline">
            Lupa sandi?
          </Link>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-coral-soft dark:bg-coral/20 text-coral text-sm font-semibold px-3 py-2.5">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          <LogIn size={18} /> Masuk
        </Button>
      </form>

      <div className="my-5 flex items-center gap-3 text-xs text-fg-subtle">
        <span className="h-px flex-1 bg-line" /> atau <span className="h-px flex-1 bg-line" />
      </div>

      <div className="space-y-3">
        <button
          onClick={() => {
            login("aisyah@gmail.com", "Aisyah");
            navigate(target, { replace: true });
          }}
          className="w-full rounded-full border border-line bg-surface px-5 py-3 font-bold text-fg hover:border-brand transition inline-flex items-center justify-center gap-2"
        >
          <span className="font-display font-bold text-brand">G</span> Masuk dengan Google
        </button>
        <button
          onClick={guest}
          className="w-full rounded-full bg-surface-2 px-5 py-3 font-bold text-fg-muted hover:text-brand transition inline-flex items-center justify-center gap-2"
        >
          <Sparkles size={17} /> Lanjutkan sebagai tamu
        </button>
      </div>
    </AuthShell>
  );
}
