"use client";

import { useState } from "react";
import Link from "next/link";

const SECTOREN = ["IT & Software","Marketing & Communicatie","Finance & Accounting","HR & Recruitment","Verkoop & Sales","Techniek & Engineering","Zorg & Welzijn","Onderwijs","Juridisch","Management","Logistiek & Transport","Bouw","Overig"];
const REGIOS = ["Amsterdam","Rotterdam","Den Haag","Utrecht","Eindhoven","Groningen","Maastricht","Arnhem/Nijmegen","Tilburg/Breda","Overig Nederland"];
const ERVARINGEN = ["0-1 jaar","1-3 jaar","3-5 jaar","5-10 jaar","10-15 jaar","15+ jaar"];

function toErvaringMin(v: string) { return parseInt(v.split("-")[0].replace("+","")) || 0; }

interface Stats { gemiddeld: number; mediaan: number; p25: number; p75: number; count: number; }

function fmt(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default function DashboardPage() {
  const [form, setForm] = useState({ functie: "", sector: "", regio: "", ervaringMin: "0", ervaringMax: "40", huidigSalaris: "" });
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const params = new URLSearchParams({ sector: form.sector, regio: form.regio, functie: form.functie, ervaringMin: form.ervaringMin, ervaringMax: form.ervaringMax });
      const res = await fetch(`/api/salaris/vergelijk?${params}`);
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Geen data gevonden"); return; }
      setStats(data);
    } catch { setError("Er ging iets mis."); }
    finally { setLoading(false); }
  }

  const huidig = parseInt(form.huidigSalaris) || null;
  const percentiel = stats && huidig ? Math.round(((huidig - stats.p25) / (stats.p75 - stats.p25)) * 100) : null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-900">Jouw salarisdashboard</h1>
        <Link href="/dashboard/coach" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
          Onderhandelcoach →
        </Link>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Vergelijk jouw salaris</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Jouw functie</label>
            <input className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={form.functie} onChange={set("functie")} placeholder="Software Engineer" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Sector</label>
            <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={form.sector} onChange={set("sector")}>
              <option value="">Alle sectoren</option>
              {SECTOREN.map(s => <option key={s}>{s}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Regio</label>
            <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={form.regio} onChange={set("regio")}>
              <option value="">Heel Nederland</option>
              {REGIOS.map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jaren ervaring</label>
            <select className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={form.ervaringMin} onChange={e => setForm(f => ({ ...f, ervaringMin: String(toErvaringMin(e.target.value)), ervaringMax: String(toErvaringMin(e.target.value) + 4) }))}>
              {ERVARINGEN.map(v => <option key={v} value={toErvaringMin(v)}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Jouw huidig salaris (€)</label>
            <input type="number" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none" value={form.huidigSalaris} onChange={set("huidigSalaris")} placeholder="65000" />
          </div>
          <div className="flex items-end">
            <button type="submit" disabled={loading} className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">
              {loading ? "Laden..." : "Vergelijk →"}
            </button>
          </div>
        </form>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
      </div>

      {stats && (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-4">
            {[
              { label: "Mediaan", value: fmt(stats.mediaan), color: "text-indigo-700" },
              { label: "Gemiddeld", value: fmt(stats.gemiddeld), color: "text-gray-900" },
              { label: "Laag (P25)", value: fmt(stats.p25), color: "text-gray-900" },
              { label: "Hoog (P75)", value: fmt(stats.p75), color: "text-gray-900" },
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100 text-center">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {huidig && (
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-4 font-bold text-gray-900">Jouw positie op de markt</h3>
              <div className="relative h-6 rounded-full bg-gray-100">
                <div className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-indigo-200 to-indigo-500" style={{ width: "75%" }} />
                {huidig >= stats.p25 && huidig <= stats.p75 && (
                  <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-orange-500 border-2 border-white shadow-lg flex items-center justify-center text-xs font-bold text-white"
                    style={{ left: `${Math.min(90, Math.max(10, ((huidig - stats.p25) / (stats.p75 - stats.p25)) * 75))}%` }}>
                    JIJ
                  </div>
                )}
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-500">
                <span>{fmt(stats.p25)}</span>
                <span className="font-semibold text-indigo-600">Mediaan: {fmt(stats.mediaan)}</span>
                <span>{fmt(stats.p75)}</span>
              </div>
              {percentiel !== null && (
                <p className="mt-4 rounded-lg bg-indigo-50 px-4 py-3 text-sm font-medium text-indigo-800">
                  {huidig < stats.mediaan
                    ? `⚠️ Jouw salaris van ${fmt(huidig)} ligt onder het marktgemiddelde. Je kunt mogelijk ${fmt(stats.mediaan - huidig)} meer verdienen.`
                    : `✅ Goed nieuws! Jouw salaris van ${fmt(huidig)} ligt boven het marktgemiddelde.`
                  }
                </p>
              )}
            </div>
          )}
          <p className="text-center text-xs text-gray-400">Gebaseerd op {stats.count} anonieme opgaven</p>
        </div>
      )}
    </div>
  );
}
