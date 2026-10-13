import { Link } from "react-router-dom";
import { Heart, Lightbulb, ShieldCheck, Sparkles, Volume2 } from "lucide-react";
import { Card, Chip, buttonClasses } from "../components/ui";
import { Mascot } from "../components/brand";
import { cn } from "../lib/utils";

const values = [
  { icon: Sparkles, title: "Ringan", desc: "Mudah dipahami, tidak membebani. Materi dipecah menjadi langkah kecil." },
  { icon: Heart, title: "Hangat", desc: "Ramah dan tidak menghakimi kesalahan. Setiap salah adalah bagian belajar." },
  { icon: Lightbulb, title: "Seru", desc: "Belajar terasa seperti bermain, bukan seperti ujian." },
  { icon: ShieldCheck, title: "Terpercaya", desc: "Konten sesuai kaidah dan audio penutur asli." },
];

export default function About() {
  return (
    <div className="mx-auto max-w-[1000px] px-5 sm:px-8 py-14">
      {/* Hero */}
      <div className="text-center max-w-2xl mx-auto">
        <Chip tone="brand" className="mb-5">
          Tentang Kami
        </Chip>
        <h1 className="font-display font-bold text-4xl sm:text-5xl text-fg">
          Lughati <span className="arabic text-brand">لُغَتِي</span>
        </h1>
        <p className="text-xl text-fg-muted mt-3 font-bold">"Bahasa Arab jadi milikmu."</p>
      </div>

      {/* Arti nama */}
      <Card className="p-8 mt-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-display font-bold text-2xl text-fg">Arti nama Lughati</h2>
            <p className="text-fg-muted mt-3 leading-relaxed">
              <span className="font-bold text-fg">Lughati</span> berasal dari kata Arab{" "}
              <span className="arabic text-brand text-xl">لُغَة</span> (<em>lughah</em>) yang berarti
              "bahasa", ditambah akhiran <span className="arabic text-brand text-xl">ـِي</span> (
              <em>-ī</em>) yang berarti "milikku". Jadi, <span className="font-bold text-fg">Lughati berarti "bahasa-ku"</span>.
            </p>
            <p className="text-fg-muted mt-3 leading-relaxed">
              Kami ingin bahasa Arab terasa dekat dan personal — bukan pelajaran asing yang jauh,
              melainkan bahasa milikmu sendiri.
            </p>
          </div>
          <div className="rounded-3xl bg-brand text-white p-8 text-center relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0 pattern-islamic opacity-20" />
            <p className="arabic text-7xl relative">لُغَتِي</p>
            <p className="latin italic text-white/80 mt-3 relative">lughatī · "bahasa-ku"</p>
          </div>
        </div>
      </Card>

      {/* Mascot */}
      <Card className="p-8 mt-6">
        <h2 className="font-display font-bold text-2xl text-fg mb-4">Kenalan dengan Jamal 🐪</h2>
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="shrink-0">
            <span className="grid place-items-center w-32 h-32 rounded-full bg-gold-soft dark:bg-gold/20 text-7xl animate-float">
              🐪
            </span>
          </div>
          <div>
            <p className="text-fg-muted leading-relaxed">
              <span className="font-bold text-fg">Jamal</span> adalah maskot kami. Dalam bahasa Arab,{" "}
              <span className="arabic text-brand">جَمَل</span> (<em>jamal</em>) berarti "unta". Uniknya,
              kata serupa <span className="arabic text-brand">جَمَال</span> (<em>jamāl</em>) berarti{" "}
              <span className="font-bold text-fg">"keindahan"</span>. Inilah pesan kami: belajar bahasa
              Arab itu indah dan menyenangkan.
            </p>
            <p className="text-fg-muted mt-3 leading-relaxed">
              Jamal menemani kamu dari hari pertama — memberi semangat saat salah, dan memberi
              selamat saat kamu berhasil.
            </p>
          </div>
        </div>
      </Card>

      {/* Values */}
      <div className="mt-10">
        <h2 className="font-display font-bold text-2xl text-fg text-center mb-6">Nilai kami</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {values.map((v) => (
            <Card key={v.title} className="p-6 flex gap-4">
              <span className="grid place-items-center w-12 h-12 rounded-2xl bg-brand-light dark:bg-brand/20 text-brand shrink-0">
                <v.icon size={22} />
              </span>
              <div>
                <h3 className="font-display font-bold text-lg text-fg">{v.title}</h3>
                <p className="text-sm text-fg-muted mt-1 leading-relaxed">{v.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Fokus fitur */}
      <Card className="p-8 mt-10">
        <div className="flex items-center gap-3 mb-3">
          <span className="grid place-items-center w-11 h-11 rounded-2xl bg-brand text-white">
            <Volume2 size={22} />
          </span>
          <h2 className="font-display font-bold text-2xl text-fg">Satu fitur yang kami banggakan</h2>
        </div>
        <p className="text-fg-muted leading-relaxed">
          Cukup <span className="font-bold text-fg">klik tulisan Arab</span>, maka pengucapan penutur
          asli langsung diputar. Tidak perlu mencari kamus lain, tidak perlu menebak. Ada juga mode
          lambat <span className="font-bold text-fg">0.75×</span> untuk pemula. Inilah cara belajar
          paling alami: lihat, dengar, tirukan.
        </p>
      </Card>

      {/* CTA */}
      <div className="mt-12 text-center">
        <Mascot message="Ayo mulai perjalananmu bersamaku! 🐪" size="lg" className="justify-center mb-6" />
        <Link to="/daftar" className={buttonClasses("primary", "lg")}>
          Mulai belajar gratis
        </Link>
      </div>
    </div>
  );
}
