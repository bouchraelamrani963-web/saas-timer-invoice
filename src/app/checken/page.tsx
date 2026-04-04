"use client";

import { useState } from "react";
import Link from "next/link";

const SECTOREN = [
  "IT", "Marketing", "Finance", "HR", "Sales", "Zorg", "Onderwijs",
  "Juridisch", "Bouw", "Logistiek", "Retail", "Overheid", "Horeca",
  "Creatief", "Techniek", "Overig",
];

const REGIO_LIJST = [
  "Noord-Holland", "Zuid-Holland", "Utrecht", "Noord-Brabant", "Gelderland",
  "Overijssel", "Limburg", "Groningen", "Friesland", "Drenthe", "Zeeland", "Flevoland",
];

interface SalaryStats {
  gemiddeld: number;
  mediaan: number;
  p25: number;
  p75: number;
  count: number;
  filters: {
    sector?: string | null;
    regio?: string | null;
    functie?: string | null;
    ervaringMin?: string | null;
    ervaringMax?: string | null;
  };
}

function formatEuro(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function NavBar() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
          <span className="text-lg font-bold text-gray-900">SalarisRadar<span className="text-indigo-600">.nl</span></span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/invullen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Bijdragen</Link>
          <Link href="/onderhandelen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Onderhandelen</Link>
          <Link href="/prijzen" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Upgrade</Link>
        </nav>
      </div>
    </header>
  );
}

function StatCard({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl p-6 text-center ${accent ? "bg-indigo-600 text-white" : "bg-white ring-1 ring-gray-100"}`}>
      <p className={`mb-1 text-sm font-semibold ${accent ? "text-indigo-200" : "text-gray-500"}`}>{label}</p>
      <p className={`text-3xl font-black ${accent ? "text-white" : "text-indigo-700"}`}>{value}</p>
      {sub && <p className={`mt-1 text-xs ${accent ? "text-indigo-200" : "text-gray-400"}`}>{sub}</p>}
    </div>
  );
}

export default function CheckenPage() {
  const [form, setForm] = useState({
    functie: "",
    sector: "",
    ervaringMin: "",
    ervaringMax: "",
    regio: "",
  });
  const [stats, setStats] = useState<SalaryStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setSearched(true);

    const params = new URLSearchParams();
    if (form.functie) params.set("functie", form.functie);
    if (form.sector) params.set("sector", form.sector);
    if (form.regio) params.set("regio", form.regio);
    if (form.ervaringMin) params.set("ervaringMin", form.ervaringMin);
    if (form.ervaringMax) params.set("ervaringMax", form.ervaringMax);

    try {
      const res = await fetch(`/api/salaris/vergelijk?${params}`);
      if (res.status === 404) {
        setError("Geen resultaten gevonden voor deze criteria. Probeer minder filters.");
        setStats(null);
        setLoading(false);
        return;
      }
      if (!res.ok) {
        setError("Er is een fout opgetreden. Probeer het opnieuw.");
        setStats(null);
        setLoading(false);
        return;
      }
      const json = await res.json() as SalaryStats;
      setStats(json);
    } catch {
      setError("Verbindingsfout. Controleer je internetverbinding.");
      setStats(null);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 text-center">
          <h1 className="mb-3 text-4xl font-black text-gray-900">Salarischeck</h1>
          <p className="text-lg text-gray-500">Ontdek wat anderen verdienen in jouw functie</p>
        </div>

        {/* Filter form */}
        <div className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-4 text-lg font-bold text-gray-900">Filter salarissen</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Functie</label>
              <input
                type="text"
                value={form.functie}
                onChange={(e) => update("functie", e.target.value)}
                placeholder="bijv. Software Engineer"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Sector</label>
              <select
                value={form.sector}
                onChange={(e) => update("sector", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Alle sectoren</option>
                {SECTOREN.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Regio</label>
              <select
                value={form.regio}
                onChange={(e) => update("regio", e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              >
                <option value="">Alle regio&apos;s</option>
                {REGIO_LIJST.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Ervaring (min. jaar)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={form.ervaringMin}
                onChange={(e) => update("ervaringMin", e.target.value)}
                placeholder="bijv. 2"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold text-gray-700">Ervaring (max. jaar)</label>
              <input
                type="number"
                min="0"
                max="50"
                value={form.ervaringMax}
                onChange={(e) => update("ervaringMax", e.target.value)}
                placeholder="bijv. 8"
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Zoeken…" : "Salaris vergelijken →"}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Results */}
        {stats && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Resultaten</h2>
              <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm font-semibold text-indigo-700">
                {stats.count} salarissen gevonden
              </span>
            </div>

            <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <StatCard label="Gemiddeld" value={formatEuro(stats.gemiddeld)} sub="bruto per jaar" accent />
              <StatCard label="Mediaan" value={formatEuro(stats.mediaan)} sub="50e percentiel" />
              <StatCard label="Ondergrens (P25)" value={formatEuro(stats.p25)} sub="25e percentiel" />
              <StatCard label="Bovengrens (P75)" value={formatEuro(stats.p75)} sub="75e percentiel" />
            </div>

            {/* Salary bar visualization */}
            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
              <h3 className="mb-4 font-bold text-gray-900">Salarisbandverdeling</h3>
              <div className="relative h-6 rounded-full bg-gray-100">
                <div
                  className="absolute top-0 h-full rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 opacity-40"
                  style={{
                    left: `${Math.max(0, ((stats.p25 - stats.p25 * 0.7) / (stats.p75 * 1.3 - stats.p25 * 0.7)) * 100)}%`,
                    width: `${Math.min(100, ((stats.p75 - stats.p25) / (stats.p75 * 1.3 - stats.p25 * 0.7)) * 100)}%`,
                  }}
                />
                <div
                  className="absolute top-0 h-full w-1 rounded-full bg-indigo-700"
                  style={{
                    left: `${Math.max(0, Math.min(98, ((stats.mediaan - stats.p25 * 0.7) / (stats.p75 * 1.3 - stats.p25 * 0.7)) * 100))}%`,
                  }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-gray-400">
                <span>{formatEuro(Math.round(stats.p25 * 0.7))}</span>
                <span className="font-semibold text-indigo-600">Mediaan: {formatEuro(stats.mediaan)}</span>
                <span>{formatEuro(Math.round(stats.p75 * 1.3))}</span>
              </div>
            </div>

            {/* Applied filters */}
            <div className="mb-6 rounded-xl bg-indigo-50 px-4 py-3 text-sm text-indigo-700">
              <span className="font-semibold">Filters toegepast: </span>
              {[
                stats.filters.functie && `Functie: ${stats.filters.functie}`,
                stats.filters.sector && `Sector: ${stats.filters.sector}`,
                stats.filters.regio && `Regio: ${stats.filters.regio}`,
                stats.filters.ervaringMin && `Ervaring ≥ ${stats.filters.ervaringMin} jaar`,
                stats.filters.ervaringMax && `Ervaring ≤ ${stats.filters.ervaringMax} jaar`,
              ].filter(Boolean).join(" · ") || "Alle salarissen"}
            </div>

            {/* Pro upsell */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-800 p-6 text-white">
              <h3 className="mb-2 text-lg font-bold">Wil je meer inzicht?</h3>
              <p className="mb-4 text-indigo-200 text-sm">
                Met Pro heb je toegang tot uitgebreide filters, salarisalerts en de volledige onderhandelcoach.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/prijzen"
                  className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-colors"
                >
                  Upgrade naar Pro — €9/mnd
                </Link>
                <Link
                  href="/onderhandelen"
                  className="rounded-xl bg-indigo-500/50 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                >
                  Onderhandelcoach →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!searched && !stats && (
          <div className="rounded-2xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Vul filters in en zoek</h3>
            <p className="text-gray-500">
              Kies een sector, regio of functietitel om salarisdata te zien uit onze database van meer dan 12.000 bijdragen.
            </p>
          </div>
        )}

        {/* CTA to submit */}
        <div className="mt-8 rounded-2xl bg-orange-50 p-6 text-center ring-1 ring-orange-100">
          <p className="mb-3 font-semibold text-orange-900">Help anderen door jouw salaris te delen</p>
          <Link
            href="/invullen"
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-white hover:bg-orange-600 transition-colors"
          >
            Mijn salaris toevoegen →
          </Link>
        </div>
      </div>
    </div>
  );
}
