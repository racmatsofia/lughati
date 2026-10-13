import { useState } from "react";
import { Link } from "react-router-dom";
import { Check, Sparkles } from "lucide-react";
import { PageHeader } from "../components/layout";
import { PRICING } from "../lib/data";
import { Button, Card, Chip, buttonClasses } from "../components/ui";
import { cn } from "../lib/utils";

export default function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="mx-auto max-w-[1000px] px-5 sm:px-8 py-14">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Chip tone="gold" className="mb-4">
          <Sparkles size={14} /> Harga sederhana
        </Chip>
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-fg">
          Mulai gratis. Upgrade kapan saja.
        </h1>
        <p className="text-fg-muted mt-3">
          Tanpa kartu kredit untuk memulai. Batalkan kapan pun tanpa pertanyaan.
        </p>

        <div className="inline-flex items-center gap-2 mt-6 rounded-full bg-surface-2 p-1">
          <button
            onClick={() => setYearly(false)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-bold transition",
              !yearly ? "bg-brand text-white" : "text-fg-muted",
            )}
          >
            Bulanan
          </button>
          <button
            onClick={() => setYearly(true)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-bold transition",
              yearly ? "bg-brand text-white" : "text-fg-muted",
            )}
          >
            Tahunan · hemat 25%
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Free */}
        <Card className="p-7 flex flex-col">
          <h2 className="font-display font-bold text-2xl text-fg">{PRICING.free.name}</h2>
          <p className="text-fg-muted mt-1">{PRICING.free.tagline}</p>
          <p className="font-display font-bold text-4xl text-fg mt-5">
            Rp0
            <span className="text-base font-body font-normal text-fg-muted"> /selamanya</span>
          </p>
          <ul className="mt-6 space-y-3 flex-1">
            {PRICING.free.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
                <Check size={17} className="text-success mt-0.5 shrink-0" /> {f}
              </li>
            ))}
          </ul>
          <Link to="/daftar" className={cn(buttonClasses("outline", "lg"), "mt-7 w-full")}>
            Mulai gratis
          </Link>
        </Card>

        {/* Premium */}
        <Card className="p-7 flex flex-col border-2 border-brand relative overflow-hidden">
          <div className="absolute top-5 right-5">
            <Chip tone="gold">Paling populer</Chip>
          </div>
          <h2 className="font-display font-bold text-2xl text-brand">{PRICING.premium.name}</h2>
          <p className="text-fg-muted mt-1">{PRICING.premium.tagline}</p>
          <p className="font-display font-bold text-4xl text-fg mt-5">
            Rp{(yearly ? PRICING.premium.yearly : PRICING.premium.price).toLocaleString("id-ID")}
            <span className="text-base font-body font-normal text-fg-muted">
              /{yearly ? "tahun" : "bulan"}
            </span>
          </p>
          <ul className="mt-6 space-y-3 flex-1">
            {PRICING.premium.features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-sm text-fg">
                <span className="grid place-items-center w-5 h-5 rounded-full bg-brand text-white shrink-0 mt-0.5">
                  <Check size={12} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <Button size="lg" className="mt-7 w-full">
            Coba Premium 7 hari
          </Button>
          <p className="text-xs text-fg-subtle text-center mt-3">Lalu Rp39.000/bulan. Batalkan kapan saja.</p>
        </Card>
      </div>

      <Card className="p-6 mt-8">
        <h3 className="font-display font-bold text-lg text-fg mb-4">Pertanyaan umum</h3>
        <div className="space-y-4">
          {[
            ["Apakah benar-benar gratis?", "Ya. Paket Gratis bisa dipakai selamanya dengan modul dasar dan fitur audio klik-untuk-dengar."],
            ["Bisa bayar dengan apa?", "Transfer bank, e-wallet (GoPay, OVO, Dana), QRIS, dan kartu kredit/debit."],
            ["Apakah ada diskon pelajar?", "Ada! Pelajar dan guru mendapat diskon 30%. Hubungi kami lewat halaman Bantuan."],
          ].map(([q, a]) => (
            <div key={q}>
              <p className="font-bold text-fg">{q}</p>
              <p className="text-sm text-fg-muted mt-1">{a}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
