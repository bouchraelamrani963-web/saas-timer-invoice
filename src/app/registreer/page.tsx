"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegistreerPage() {
  const router = useRouter();
  const [form, setForm] = useState({ naam: "", email: "", wachtwoord: "", bevestig: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.wachtwoord !== form.bevestig) { setError("Wachtwoorden komen niet overeen"); return; }
    if (form.wachtwoord.length < 8) { setError("Wachtwoord moet minimaal 8 tekens zijn"); return; }
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/auth/registreer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ naam: form.naam, email: form.email, wachtwoord: form.wachtwoord }) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Registratie mislukt"); return; }
      router.push("/dashboard");
    } catch { setError("Er ging iets mis."); }
    finally { setLoading(false); }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SC</span>
            <span className="text-xl font-bold text-gray-900">SalarisCheck<span className="text-indigo-600">.nl</span></span>
          </Link>
          <h1 className="mt-6 text-2xl font-black text-gray-900">Gratis account aanmaken</h1>
          <p className="mt-1 text-sm text-gray-500">Geen creditcard nodig</p>
        </div>
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Naam</label>
              <input required className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" value={form.naam} onChange={set("naam")} placeholder="Jan de Vries" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">E-mailadres</label>
              <input required type="email" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" value={form.email} onChange={set("email")} placeholder="jan@bedrijf.nl" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wachtwoord</label>
              <input required type="password" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" value={form.wachtwoord} onChange={set("wachtwoord")} placeholder="Minimaal 8 tekens" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Wachtwoord bevestigen</label>
              <input required type="password" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500" value={form.bevestig} onChange={set("bevestig")} />
            </div>
            {error && <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-60">
              {loading ? "Account aanmaken..." : "Account aanmaken →"}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-500">
            Al een account?{" "}
            <Link href="/login" className="font-semibold text-indigo-600 hover:underline">Inloggen</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
