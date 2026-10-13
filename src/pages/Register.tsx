import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { AuthShell, Field, inputClasses } from "../components/AuthShell";
import { Button } from "../components/ui";
import { useApp } from "../lib/store";

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [agree, setAgree] = useState(true);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2) return setError("Tulis namamu dulu ya.");
    if (!email.includes("@")) return setError("Alamat email belum benar.");
    if (password.length < 6) return setError("Kata sandi minimal 6 karakter.");
    if (!agree) return setError("Setujui syarat & ketentuan untuk melanjutkan.");
    register(name.trim(), email);
    navigate("/onboarding", { replace: true });
  }

  return (
    <AuthShell
      title="Buat akun gratis"
      subtitle="Gratis selamanya untuk mulai. Tanpa kartu kredit."
      footer={
        <>
          Sudah punya akun?{" "}
          <Link to="/masuk" className="font-bold text-brand hover:underline">
            Masuk
          </Link>
        </>
      }
    >
      <form onSubmit={submit}>
        <Field label="Nama panggilan">
          <input
            className={inputClasses}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Misal: Aisyah"
            autoComplete="name"
          />
        </Field>
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
        <Field label="Kata sandi" hint="Minimal 6 karakter.">
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              className={inputClasses}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="new-password"
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

        <label className="flex items-start gap-2.5 text-sm text-fg-muted mb-5">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="accent-brand w-4 h-4 mt-0.5"
          />
          <span>
            Saya setuju dengan <span className="font-bold text-brand">Syarat & Ketentuan</span> dan{" "}
            <span className="font-bold text-brand">Kebijakan Privasi</span> Lughati.
          </span>
        </label>

        {error && (
          <p className="mb-4 rounded-xl bg-coral-soft dark:bg-coral/20 text-coral text-sm font-semibold px-3 py-2.5">
            {error}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full">
          <UserPlus size={18} /> Buat akun
        </Button>
      </form>
    </AuthShell>
  );
}
