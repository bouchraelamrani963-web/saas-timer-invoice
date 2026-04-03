"use client";

import { useState } from "react";

const SECTOREN = ["IT & Software","Marketing & Communicatie","Finance & Accounting","HR & Recruitment","Verkoop & Sales","Techniek & Engineering","Zorg & Welzijn","Onderwijs","Juridisch","Management","Logistiek & Transport","Bouw","Overig"];

export default function CoachPage() {
  const [form, setForm] = useState({ huidigSalaris: "", gewenstSalaris: "", functie: "", sector: "", argumenten: "" });
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError(""); setScript("");
    try {
      const res = await fetch("/api/coach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      setScript(data.script);
    } catch { setError("Er ging iets mis."); }
    finally { setLoading(false); }
  }

  function copyScript() {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const inputClass = "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-gray-900">Onderhandelcoach</h1>
        <p className="mt-2 text-gray-500">Vul jouw situatie in en ontvang een persoonlijk onderhandelscript.</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="mb-5 text-lg font-bold text-gray-900">Jouw situatie</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Huidig bruto jaarsalaris (€) *</label>
                <input required type="number" className={inputClass} value={form.huidigSalaris} onChange={set("huidigSalaris")} placeholder="60000" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gewenst bruto jaarsalaris (€) *</label>
                <input required type="number" className={inputClass} value={form.gewenstSalaris} onChange={set("gewenstSalaris")} placeholder="72000" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Jouw functie *</label>
              <input required className={inputClass} value={form.functie} onChange={set("functie")} placeholder="Software Engineer" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Sector *</label>
              <select required className={inputClass} value={form.sector} onChange={set("sector")}>
                <option value="">Kies sector...</option>
                {SECTOREN.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Waarom verdien je meer? (optioneel)</label>
              <textarea rows={4} className={inputClass} value={form.argumenten} onChange={set("argumenten")} placeholder="Bijv: ik heb het afgelopen jaar 3 grote projecten geleid, een nieuw klant binnengehaald van €200k, en mijn team gecoacht..." />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-bold text-white hover:bg-indigo-700 disabled:opacity-60">
              {loading ? "Script wordt gemaakt..." : "Genereer mijn onderhandelscript →"}
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900">Jouw script</h2>
            {script && (
              <button onClick={copyScript} className="rounded-lg border border-gray-200 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-50">
                {copied ? "✓ Gekopieerd!" : "Kopieer"}
              </button>
            )}
          </div>
          {!script && !loading && (
            <div className="flex h-64 items-center justify-center rounded-xl bg-gray-50 text-center">
              <div>
                <p className="text-4xl mb-3">💬</p>
                <p className="text-sm text-gray-400">Je script verschijnt hier na het invullen van het formulier</p>
              </div>
            </div>
          )}
          {loading && (
            <div className="flex h-64 items-center justify-center">
              <p className="text-sm text-gray-400 animate-pulse">Script wordt gegenereerd...</p>
            </div>
          )}
          {script && (
            <pre className="overflow-auto rounded-xl bg-gray-50 p-4 text-xs leading-relaxed text-gray-800 whitespace-pre-wrap max-h-[500px]">{script}</pre>
          )}
        </div>
      </div>
    </div>
  );
}
