import { useState } from "react";
import { Link } from "react-router-dom";
import { MailCheck } from "lucide-react";
import { AuthShell, Field, inputClasses } from "../components/AuthShell";
import { Button } from "../components/ui";

export default function Forgot() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthShell
      title="Lupa kata sandi?"
      subtitle="Masukkan emailmu, kami kirim tautan untuk mengatur ulang."
      footer={
        <Link to="/masuk" className="font-bold text-brand hover:underline">
          Kembali ke halaman masuk
        </Link>
      }
    >
      {sent ? (
        <div className="rounded-2xl bg-success-soft dark:bg-success/20 p-6 text-center">
          <MailCheck className="mx-auto text-success" size={36} />
          <p className="font-bold text-fg mt-3">Tautan terkirim!</p>
          <p className="text-sm text-fg-muted mt-1">
            Cek kotak masuk <span className="font-bold">{email}</span> (juga folder spam).
          </p>
          <Button variant="outline" className="mt-5" onClick={() => setSent(false)}>
            Kirim ke email lain
          </Button>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (email.includes("@")) setSent(true);
          }}
        >
          <Field label="Email terdaftar">
            <input
              type="email"
              className={inputClasses}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nama@email.com"
            />
          </Field>
          <Button type="submit" size="lg" className="w-full">
            Kirim tautan reset
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
