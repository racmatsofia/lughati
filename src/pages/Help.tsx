import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Mail, MessageCircle, Search } from "lucide-react";
import { FAQ } from "../lib/data";
import { Card, Chip, buttonClasses } from "../components/ui";
import { Mascot } from "../components/brand";
import { cn } from "../lib/utils";

export default function Help() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<number | null>(0);

  const filtered = FAQ.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      f.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="mx-auto max-w-[900px] px-5 sm:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Chip tone="brand" className="mb-4">
          Pusat Bantuan
        </Chip>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-fg">Ada yang bisa kami bantu?</h1>
        <p className="text-fg-muted mt-3">Cari jawaban cepat, atau hubungi tim kami.</p>

        <div className="relative mt-6 max-w-lg mx-auto">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-fg-subtle" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari bantuan…"
            className="w-full rounded-2xl border border-line bg-surface pl-11 pr-4 py-3.5 text-fg placeholder:text-fg-subtle focus:border-brand focus:ring-4 focus:ring-brand/15 outline-none"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <Link to="/app/belajar" className={cn(buttonClasses("outline", "md"), "!justify-start !rounded-2xl !py-4")}>
          🐪 Mulai belajar
        </Link>
        <a href="mailto:bantuan@lughati.app" className={cn(buttonClasses("outline", "md"), "!justify-start !rounded-2xl !py-4")}>
          <Mail size={18} /> Email kami
        </a>
        <a href="#faq" className={cn(buttonClasses("outline", "md"), "!justify-start !rounded-2xl !py-4")}>
          <MessageCircle size={18} /> Live chat
        </a>
      </div>

      <div id="faq" className="space-y-3">
        {filtered.length === 0 && (
          <Card className="p-8 text-center">
            <Mascot message="Belum ketemu jawabannya? Hubungi kami ya! 🐪" size="md" className="justify-center" />
          </Card>
        )}
        {filtered.map((f, i) => {
          const isOpen = open === i;
          return (
            <Card key={f.q} className="overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-bold text-fg">{f.q}</span>
                <ChevronDown
                  size={20}
                  className={cn("text-fg-subtle transition-transform shrink-0", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-fg-muted leading-relaxed animate-fade-up">{f.a}</div>
              )}
            </Card>
          );
        })}
      </div>

      <Card className="p-8 mt-8 text-center bg-bg-alt dark:bg-surface-2">
        <Mascot message="Masih butuh bantuan? Aku siap membantu! 🐪" size="lg" className="justify-center mb-5" />
        <h2 className="font-display font-bold text-xl text-fg">Hubungi tim Lughati</h2>
        <p className="text-fg-muted mt-2">Kami biasanya membalas dalam 1×24 jam.</p>
        <a href="mailto:bantuan@lughati.app" className={cn(buttonClasses("primary", "lg"), "mt-5")}>
          <Mail size={18} /> bantuan@lughati.app
        </a>
      </Card>
    </div>
  );
}
