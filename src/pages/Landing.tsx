import { Link } from "react-router-dom";
import {
  ArrowRight,
  Award,
  BookOpen,
  Gamepad2,
  Languages,
  Play,
  Sparkles,
  Volume2,
  WifiOff,
} from "lucide-react";
import { ArabicWord, AudioNote, SpeakerButton } from "../components/audio";
import { Card, Chip, buttonClasses } from "../components/ui";
import { Mascot } from "../components/brand";
import { cn } from "../lib/utils";

const features = [
  { icon: Volume2, title: "Audio Klik-untuk-Dengar", desc: "Klik tulisan Arab mana pun, langsung dengar pengucapan penutur asli. Ada mode lambat 0.75×.", tone: "brand" },
  { icon: Gamepad2, title: "Belajar Sambil Bermain", desc: "XP, streak, misi harian, liga, dan badge membuat belajar terasa seperti main game.", tone: "gold" },
  { icon: Languages, title: "Mulai dari Hijaiyah", desc: "Belum bisa baca huruf Arab? Modul hijaiyah memandumu satu huruf demi satu huruf.", tone: "coral" },
  { icon: BookOpen, title: "Kamus Interaktif", desc: "Cari kata Arab ↔ Indonesia, lihat contoh kalimat, dan dengar pengucapannya.", tone: "brand" },
  { icon: Award, title: "Latihan Berbicara", desc: "Rekam suaramu, dapat skor akurasi pengucapan, lalu perbaiki huruf yang kurang tepat.", tone: "gold" },
  { icon: WifiOff, title: "Bisa Offline (PWA)", desc: "Unduh paket pelajaran & audio, belajar kapan saja walau tanpa internet.", tone: "coral" },
];

const stats = [
  { value: "10.000+", label: "pelajar aktif" },
  { value: "500+", label: "kosakata ber-audio" },
  { value: "28", label: "huruf hijaiyah" },
  { value: "4.8★", label: "rating pengguna" },
];

const steps = [
  { n: 1, title: "Pilih levelmu", desc: "Kenali tujuan & kemampuan awalmu lewat kuis singkat." },
  { n: 2, title: "Belajar 5 menit/hari", desc: "Pelajaran singkat dengan audio, latihan, dan cerita." },
  { n: 3, title: "Rayakan progres", desc: "Kumpulkan XP, jaga streak, dan buka badge baru." },
];

const testimonials = [
  { name: "Aisyah, 17", text: "Suka banget fitur klik-untuk-dengar! Jadi tahu pengucapan yang benar tanpa takut salah.", avatar: "👩‍🎓" },
  { name: "Budi, 34", text: "Dipakai kerja di Saudi. Frase praktisnya kepakai banget, dan bisa offline.", avatar: "🧔" },
  { name: "Ust. Rahmat", text: "Dashboard kelasnya membantu memantau 30 siswa sekaligus. Materinya rapi.", avatar: "👨‍🏫" },
];

const demoWords = [
  { ar: "كِتَاب", translit: "kitaab", id: "buku" },
  { ar: "مَاء", translit: "maa'", id: "air" },
  { ar: "أُسْرَة", translit: "usrah", id: "keluarga" },
  { ar: "سَيَّارَة", translit: "sayyaarah", id: "mobil" },
];

export default function Landing() {
  const toneMap: Record<string, string> = {
    brand: "bg-brand-light dark:bg-brand/20 text-brand",
    gold: "bg-gold-soft dark:bg-gold/20 text-gold-dark dark:text-gold",
    coral: "bg-coral-soft dark:bg-coral/20 text-coral",
  };

  return (
    <div>
      {/* ============================ HERO ============================ */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-60" />
        <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <Chip tone="brand" className="mb-5">
              <Sparkles size={15} /> Belajar sambil bermain
            </Chip>
            <h1 className="font-display font-bold text-[42px] leading-[1.08] sm:text-[56px] text-fg">
              Bahasa Arab
              <span className="block text-brand">jadi milikmu.</span>
            </h1>
            <p className="mt-5 text-lg text-fg-muted max-w-xl leading-relaxed">
              Klik tulisan Arab, langsung dengar pengucapan penutur asli. Belajar 5 menit sehari —
              seru seperti main game.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link to="/daftar" className={buttonClasses("primary", "lg")}>
                Mulai Gratis <ArrowRight size={18} />
              </Link>
              <a href="#demo" className={buttonClasses("outline", "lg")}>
                <Play size={18} className="text-brand" /> Lihat Demo
              </a>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm">
              <span className="text-gold" aria-hidden>★★★★★</span>
              <span className="font-bold text-fg">4.8/5</span>
              <span className="text-fg-subtle">· 10.000+ pelajar aktif</span>
            </div>

            <AudioNote className="mt-5" />
          </div>

          {/* Showcase panel */}
          <div className="animate-fade-up">
            <div className="rounded-[32px] bg-brand-soft dark:bg-brand/10 p-6 sm:p-9">
              <Mascot message="Ahlan! Aku Jamal, teman belajarmu 👋" />
              <Card className="mt-5 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-wide text-fg-muted">KATA HARI INI</span>
                  <Chip tone="gold">⚡ +10 XP</Chip>
                </div>
                <div className="mt-5">
                  <ArabicWord text="كِتَاب" translit="ki-taa-bun" fontSize={40} showSlow />
                </div>
                <div className="mt-5 pt-5 border-t border-line flex items-center justify-between">
                  <div>
                    <p className="font-display font-bold text-xl text-fg">buku</p>
                    <p className="text-sm text-fg-muted">isim · kata benda</p>
                  </div>
                  <Chip tone="brand">30% menuju Level 8</Chip>
                </div>
              </Card>
              <p className="text-center text-xs text-fg-subtle mt-4">
                Coba klik kata di atas — audio langsung diputar 🔊
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STATS ============================ */}
      <section className="border-y border-line bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display font-bold text-2xl sm:text-3xl text-brand">{s.value}</p>
              <p className="text-sm text-fg-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================== FEATURES ========================== */}
      <section id="fitur" className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24 scroll-mt-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Chip tone="gold" className="mb-4">Fitur Utama</Chip>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-fg">
            Semua yang kamu butuh untuk mulai berbicara
          </h2>
          <p className="text-fg-muted mt-3">
            Dirancang untuk pemula total — tidak perlu bisa baca huruf Arab dulu.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <Card key={f.title} className="p-6 hover:-translate-y-1 hover:shadow-lift transition">
              <span className={cn("grid place-items-center w-12 h-12 rounded-2xl", toneMap[f.tone])}>
                <f.icon size={22} />
              </span>
              <h3 className="font-display font-bold text-lg mt-4 text-fg">{f.title}</h3>
              <p className="text-sm text-fg-muted mt-2 leading-relaxed">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ============================= DEMO ============================ */}
      <section id="demo" className="bg-bg-alt scroll-mt-20">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Chip tone="brand" className="mb-4">Demo Interaktif</Chip>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-fg">
                Klik. Dengar. Lancar.
              </h2>
              <p className="text-fg-muted mt-4 leading-relaxed">
                Setiap tulisan Arab di Lughati bisa diklik. Inilah cara belajar paling alami —
                kamu melihat, mendengar, lalu menirukan. Coba sendiri sekarang:
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Klik kata Arab → audio diputar",
                  "Tekan 0.75× untuk versi lambat",
                  "Transliterasi membantu saat awal",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 text-fg-muted">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-brand text-white text-xs shrink-0">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/daftar" className={cn(buttonClasses("primary", "lg"), "mt-8")}>
                Mulai Gratis <ArrowRight size={18} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {demoWords.map((w) => (
                <Card key={w.ar} className="p-5 text-center">
                  <p className="arabic text-3xl text-fg">{w.ar}</p>
                  <p className="latin text-xs italic text-fg-subtle mt-1">{w.translit}</p>
                  <p className="text-sm font-bold text-fg-muted mt-1">{w.id}</p>
                  <div className="mt-3 flex justify-center">
                    <SpeakerButton text={w.ar} tone="soft" size="md" />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================ STEPS ============================ */}
      <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
        <div className="text-center mb-12">
          <Chip tone="gold" className="mb-4">Cara Kerja</Chip>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-fg">Mulai hanya dalam 3 langkah</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s) => (
            <Card key={s.n} className="p-7">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand text-white font-display font-bold text-xl">
                {s.n}
              </span>
              <h3 className="font-display font-bold text-lg mt-4 text-fg">{s.title}</h3>
              <p className="text-sm text-fg-muted mt-2 leading-relaxed">{s.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ========================= TESTIMONIALS ======================== */}
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
          <div className="text-center mb-12">
            <Chip tone="brand" className="mb-4">Kata Mereka</Chip>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-fg">Sudah diucapkan dengan lancar</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <Card key={t.name} className="p-6">
                <p className="text-gold mb-3" aria-hidden>★★★★★</p>
                <p className="text-fg-muted leading-relaxed">"{t.text}"</p>
                <div className="flex items-center gap-3 mt-5">
                  <span className="grid place-items-center w-10 h-10 rounded-full bg-brand-light dark:bg-brand/25 text-lg">
                    {t.avatar}
                  </span>
                  <span className="font-bold text-fg text-sm">{t.name}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ============================= CTA ============================= */}
      <section className="mx-auto max-w-[1200px] px-5 sm:px-8 py-16 lg:py-24">
        <div className="rounded-[36px] bg-brand text-white relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-20" />
          <div className="relative px-8 py-14 sm:px-14 text-center">
            <div className="flex justify-center mb-6">
              <Mascot message="Ayo mulai, aku temani kamu! 🐪" size="lg" />
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl">
              Bahasa Arab jadi milikmu — mulai hari ini.
            </h2>
            <p className="text-white/85 mt-4 max-w-xl mx-auto">
              Gratis untuk memulai. Tanpa kartu kredit. Belajar 5 menit sehari sudah cukup.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/daftar" className={buttonClasses("gold", "lg")}>
                Coba Gratis Sekarang <ArrowRight size={18} />
              </Link>
              <Link
                to="/harga"
                className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:bg-white/10 transition"
              >
                Lihat Harga
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
