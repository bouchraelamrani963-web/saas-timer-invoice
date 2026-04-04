"use client";
import Link from "next/link";
import { useState } from "react";

async function startCheckout(plan: "pro" | "recruiter") {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

const plannen = [
  {
    naam: "Gratis",
    prijs: "€0",
    periode: "voor altijd",
    omschrijving: "Ideaal om te starten",
    features: ["Salaris anoniem opgeven", "3 vergelijkingen per maand", "Basis salarisrange zien", "Geen creditcard nodig"],
    beperkingen: ["AI onderhandelcoach", "Onbeperkt vergelijken", "Salarisalert", "Volledige database"],
    cta: "Gratis starten",
    plan: null as null | "pro" | "recruiter",
    href: "/registreer",
    highlight: false,
  },
  {
    naam: "Pro",
    prijs: "€9",
    periode: "per maand",
    omschrijving: "Voor de serieuze onderhandelaar",
    features: ["Alles van Gratis", "Onbeperkt vergelijken", "AI onderhandelcoach", "Persoonlijk salarisrapport", "Salarisalert bij marktwijzigingen", "Prioriteit support"],
    beperkingen: ["Volledige recruiter database", "CSV export", "API toegang"],
    cta: "Pro proberen — €9/maand",
    plan: "pro" as const,
    href: null,
    highlight: true,
  },
  {
    naam: "Recruiter",
    prijs: "€199",
    periode: "per maand",
    omschrijving: "Voor HR en recruitment",
    features: ["Alles van Pro", "Volledige ongefilterde database", "Geavanceerde filters", "CSV & Excel export", "API toegang", "Dedicated account manager", "Factuur op bedrijfsnaam"],
    beperkingen: [],
    cta: "Recruiter starten — €199/maand",
    plan: "recruiter" as const,
    href: null,
    highlight: false,
  },
];

const vergelijking = [
  { feature: "Salaris opgeven", gratis: true, pro: true, recruiter: true },
  { feature: "Vergelijkingen per maand", gratis: "3", pro: "Onbeperkt", recruiter: "Onbeperkt" },
  { feature: "AI onderhandelcoach", gratis: false, pro: true, recruiter: true },
  { feature: "Salarisalert", gratis: false, pro: true, recruiter: true },
  { feature: "Salarisrapport PDF", gratis: false, pro: true, recruiter: true },
  { feature: "Volledige database", gratis: false, pro: false, recruiter: true },
  { feature: "CSV / Excel export", gratis: false, pro: false, recruiter: true },
  { feature: "API toegang", gratis: false, pro: false, recruiter: true },
  { feature: "Support", gratis: "Email", pro: "Prioriteit", recruiter: "Dedicated" },
];

const faq = [
  { v: "Is mijn salaris echt anoniem?", a: "Ja, 100%. We slaan geen persoonlijke informatie op bij salarisopgaven. Er is geen koppeling tussen jouw account en de salarisinformatie die je deelt." },
  { v: "Hoe actueel zijn de gegevens?", a: "Onze database wordt continu bijgewerkt. Salarisgegevens ouder dan 2 jaar worden automatisch gewogen om actuele marktdata te waarborgen." },
  { v: "Kan ik mijn abonnement opzeggen?", a: "Ja, je kunt op elk moment opzeggen via je accountinstellingen. Je behoudt toegang tot het einde van de betaalde periode." },
  { v: "Ik ben recruiter. Waarom SalarisRadar boven alternatieven?", a: "SalarisRadar focust specifiek op de Nederlandse markt met actuele, geverifieerde data. Geen Amerikaanse benchmarks die niet kloppen voor NL." },
];

function CheckoutButton({ plan, cta, highlight }: { plan: null | "pro" | "recruiter"; cta: string; href: string | null; highlight: boolean }) {
  const [loading, setLoading] = useState(false);
  const cls = `block w-full rounded-xl py-3 text-center text-sm font-bold transition ${highlight ? "bg-white text-indigo-600 hover:bg-indigo-50" : "bg-indigo-600 text-white hover:bg-indigo-700"} disabled:opacity-60`;

  if (!plan) {
    return <Link href="/registreer" className={cls}>{cta}</Link>;
  }
  return (
    <button
      className={cls}
      disabled={loading}
      onClick={async () => { setLoading(true); await startCheckout(plan); setLoading(false); }}
    >
      {loading ? "Laden..." : cta}
    </button>
  );
}

function Check({ ok }: { ok: boolean | string }) {
  if (typeof ok === "string") return <span className="text-sm text-gray-700">{ok}</span>;
  return ok
    ? <span className="text-indigo-600 font-bold">✓</span>
    : <span className="text-gray-300">—</span>;
}

export default function PrijzenPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="text-lg font-bold text-gray-900">SalarisRadar<span className="text-indigo-600">.nl</span></span>
          </Link>
          <Link href="/registreer" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Gratis starten</Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-20">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl font-black text-gray-900">Eenvoudige prijzen</h1>
          <p className="text-xl text-gray-500">Begin gratis. Upgrade wanneer je klaar bent.</p>
        </div>

        <div className="mb-20 grid gap-8 md:grid-cols-3">
          {plannen.map(plan => (
            <div key={plan.naam} className={`rounded-2xl p-8 ${plan.highlight ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-400 scale-105" : "bg-white shadow-sm ring-1 ring-gray-100"}`}>
              <p className={`mb-1 text-sm font-semibold ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>{plan.naam}</p>
              <p className="mb-1 text-5xl font-black">{plan.prijs}</p>
              <p className={`mb-1 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.periode}</p>
              <p className={`mb-6 text-sm ${plan.highlight ? "text-indigo-100" : "text-gray-500"}`}>{plan.omschrijving}</p>
              <ul className="mb-6 space-y-2">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={plan.highlight ? "text-indigo-200" : "text-indigo-600"}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {plan.beperkingen.map(f => (
                  <li key={f} className="flex items-start gap-2 text-sm opacity-40">
                    <span>—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton plan={plan.plan} cta={plan.cta} href={plan.href} highlight={plan.highlight} />
            </div>
          ))}
        </div>

        <div className="mb-20 overflow-hidden rounded-2xl ring-1 ring-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-gray-700">Gratis</th>
                <th className="px-4 py-4 text-center font-semibold text-indigo-700 bg-indigo-50">Pro</th>
                <th className="px-4 py-4 text-center font-semibold text-gray-700">Recruiter</th>
              </tr>
            </thead>
            <tbody>
              {vergelijking.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-3 text-gray-700">{r.feature}</td>
                  <td className="px-4 py-3 text-center"><Check ok={r.gratis} /></td>
                  <td className="px-4 py-3 text-center bg-indigo-50/30"><Check ok={r.pro} /></td>
                  <td className="px-4 py-3 text-center"><Check ok={r.recruiter} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-black text-gray-900">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faq.map(item => (
              <div key={item.v} className="rounded-xl bg-gray-50 p-6">
                <p className="mb-2 font-bold text-gray-900">{item.v}</p>
                <p className="text-sm text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
