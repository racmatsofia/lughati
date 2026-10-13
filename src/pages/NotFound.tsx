import { Link } from "react-router-dom";
import { Home, LayoutGrid } from "lucide-react";
import { Logo, Mascot } from "../components/brand";
import { buttonClasses } from "../components/ui";

export default function NotFound() {
  return (
    <div className="min-h-dvh grid place-items-center bg-bg px-5 py-14 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-40" />
      <div className="relative text-center max-w-md">
        <div className="flex justify-center mb-6">
          <Mascot message="Hmm, aku tersesat! 🐪" size="lg" />
        </div>
        <p className="font-display font-bold text-8xl text-brand">404</p>
        <h1 className="font-display font-bold text-2xl text-fg mt-3">Halaman tidak ditemukan</h1>
        <p className="text-fg-muted mt-2">
          Sepertinya halaman yang kamu cari sudah dipindah atau tidak pernah ada. Ayo kembali ke
          jalur belajar!
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className={buttonClasses("primary", "lg")}>
            <Home size={18} /> Kembali ke Beranda
          </Link>
          <Link to="/app/belajar" className={buttonClasses("outline", "lg")}>
            <LayoutGrid size={18} /> Ke Jalur Belajar
          </Link>
        </div>
        <div className="mt-10 flex justify-center">
          <Logo />
        </div>
      </div>
    </div>
  );
}
