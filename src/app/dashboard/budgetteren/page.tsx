"use client";

import { useState } from "react";

function fmt(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

const CATEGORIEEN = [
  { key: "wonen", label: "Wonen (huur/hypotheek)", kleur: "bg-indigo-500", standaard: 35 },
  { key: "boodschappen", label: "Boodschappen", kleur: "bg-emerald-500", standaard: 12 },
  { key: "transport", label: "Transport", kleur: "bg-orange-500", standaard: 10 },
  { key: "verzekeringen", label: "Verzekeringen", kleur: "bg-rose-500", standaard: 8 },
  { key: "sparen", label: "Sparen", kleur: "bg-violet-500", standaard: 15 },
  { key: "energie", label: "Energie & Telefoon", kleur: "bg-yellow-500", standaard: 6 },
  { key: "vrije_tijd", label: "Vrije tijd & Uit eten", kleur: "bg-sky-500", standaard: 8 },
  { key: "kleding", label: "Kleding", kleur: "bg-pink-500", standaard: 4 },
];

type CatKey = (typeof CATEGORIEEN)[number]["key"];

function initBedragen(netto: number): Record<CatKey, number> {
  const result: Record<string, number> = {};
  for (const c of CATEGORIEEN) {
    result[c.key] = Math.round((netto * c.standaard) / 100);
  }
  return result;
}

export default function BudgetterenPage() {
  const [netto, setNetto] = useState("");
  const [bedragen, setBedragen] = useState<Record<CatKey, number> | null>(null);

  const maandNetto = parseInt(netto) || 0;

  function handleStart() {
    if (maandNetto > 0) setBedragen(initBedragen(maandNetto));
  }

  function setBedrag(key: CatKey, val: number) {
    setBedragen(prev => prev ? { ...prev, [key]: Math.max(0, val) } : prev);
  }

  const totaalUitgegeven = bedragen ? Object.values(bedragen).reduce((a, b) => a + b, 0) : 0;
  const resterend = maandNetto - totaalUitgegeven;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-gray-900">Budgetplanner</h1>
          <p className="mt-1 text-sm text-gray-500">Verdeel jouw netto maandloon over jouw uitgavencategorieën.</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-bold text-gray-900">Jouw netto maandloon</h2>
        <div className="flex gap-3 sm:max-w-sm">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">€</span>
            <input
              type="number"
              className="w-full rounded-lg border border-gray-300 py-2 pl-8 pr-3 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
              value={netto}
              onChange={e => { setNetto(e.target.value); setBedragen(null); }}
              placeholder="3500"
            />
          </div>
          <button
            onClick={handleStart}
            disabled={maandNetto <= 0}
            className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            Bereken →
          </button>
        </div>
      </div>

      {bedragen && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Netto maandloon", value: fmt(maandNetto), color: "text-gray-900" },
              { label: "Totaal begroot", value: fmt(totaalUitgegeven), color: "text-indigo-700" },
              {
                label: "Resterend",
                value: fmt(resterend),
                color: resterend < 0 ? "text-red-600" : "text-emerald-600",
              },
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-white p-5 text-center shadow-sm ring-1 ring-gray-100">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>

          {resterend < 0 && (
            <div className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ring-1 ring-red-200">
              Je hebt {fmt(Math.abs(resterend))} meer begroot dan je verdient. Pas je bedragen aan.
            </div>
          )}

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-6 text-lg font-bold text-gray-900">Verdeling per categorie</h2>
            <div className="space-y-5">
              {CATEGORIEEN.map(cat => {
                const bedrag = bedragen[cat.key] ?? 0;
                const pct = maandNetto > 0 ? Math.min(100, (bedrag / maandNetto) * 100) : 0;
                return (
                  <div key={cat.key}>
                    <div className="mb-1 flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">{cat.label}</label>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">{pct.toFixed(0)}%</span>
                        <div className="relative">
                          <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-xs text-gray-400">€</span>
                          <input
                            type="number"
                            className="w-24 rounded-lg border border-gray-200 py-1 pl-6 pr-2 text-right text-sm focus:border-indigo-500 focus:outline-none"
                            value={bedrag}
                            onChange={e => setBedrag(cat.key, parseInt(e.target.value) || 0)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full transition-all ${cat.kleur}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-4 text-lg font-bold text-gray-900">Overzicht</h2>
            <div className="flex h-5 w-full overflow-hidden rounded-full">
              {CATEGORIEEN.map(cat => {
                const bedrag = bedragen[cat.key] ?? 0;
                const pct = maandNetto > 0 ? Math.min(100, (bedrag / maandNetto) * 100) : 0;
                return pct > 0 ? (
                  <div key={cat.key} className={`h-full ${cat.kleur}`} style={{ width: `${pct}%` }} title={`${cat.label}: ${fmt(bedrag)}`} />
                ) : null;
              })}
              {resterend > 0 && (
                <div className="h-full bg-gray-100" style={{ width: `${(resterend / maandNetto) * 100}%` }} title={`Resterend: ${fmt(resterend)}`} />
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {CATEGORIEEN.map(cat => (
                <span key={cat.key} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${cat.kleur}`} />
                  {cat.label}
                </span>
              ))}
              <span className="flex items-center gap-1.5 text-xs text-gray-600">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-gray-200" />
                Resterend
              </span>
            </div>
          </div>

          <div className="rounded-xl bg-indigo-50 px-5 py-4 text-sm text-indigo-800">
            <p className="font-semibold">De 50/30/20-regel als richtlijn:</p>
            <ul className="mt-2 space-y-1 text-indigo-700">
              <li>• <strong>50%</strong> voor vaste lasten (wonen, transport, verzekeringen) → {fmt(maandNetto * 0.5)}</li>
              <li>• <strong>30%</strong> voor persoonlijke uitgaven (boodschappen, vrije tijd) → {fmt(maandNetto * 0.3)}</li>
              <li>• <strong>20%</strong> voor sparen en aflossen → {fmt(maandNetto * 0.2)}</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
