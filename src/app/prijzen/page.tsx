"use client";
import Link from "next/link";
import { useState } from "react";

async function startCheckout(plan: "starter" | "pro" | "recruiter"): Promise<string | null> {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const data = await res.json();
  if (data.url) { window.location.href = data.url; return null; }
  return data.error ?? "Er ging iets mis. Probeer het opnieuw.";
}

const plannen = [
  {
    naam: "Gratis",
    prijs: "€0",
    periode: "voor altijd",
    voor: "Voor professionals die willen bijdragen",
    features: [
      "Salaris anoniem toevoegen",
      "3 vergelijkingen per maand",
      "Basis salarisrange inzien",
      "Geen creditcard nodig",
    ],
    beperkingen: ["Onbeperkt vergelijken", "AI onderhandelcoach", "Salarisalert"],
    cta: "Gratis starten",
    plan: null as null | "starter" | "pro" | "recruiter",
    href: "/registreer",
    highlight: false,
    label: null,
  },
  {
    naam: "Starter",
    prijs: "€49",
    periode: "per maand",
    voor: "Kleine bureaus & ZZP-recruiters",
    features: [
      "Onbeperkt vergelijken",
      "Salarisbenchmarks per sector",
      "Regio-inzicht (12 provincies)",
      "Salarisalert bij marktwijzigingen",
      "1 gebruiker",
      "Email support",
    ],
    beperkingen: ["AI onderhandelcoach", "Markttrends & acceptatiekans", "Data export"],
    cta: "Start met Starter",
    plan: "starter" as const,
    href: null,
    highlight: false,
    label: null,
  },
  {
    naam: "Pro",
    prijs: "€99",
    periode: "per maand",
    voor: "Groeiende bureaus & in-house HR",
    features: [
      "Alles van Starter",
      "AI onderhandelcoach",
      "Salaristrends (6 maanden)",
      "Acceptatiekans per aanbod",
      "Marktanalyse per functiegroep",
      "3 gebruikers",
      "Priority support",
    ],
    beperkingen: ["Volledige database", "Data export", "API toegang"],
    cta: "Start met Pro — €99/mnd",
    plan: "pro" as const,
    href: null,
    highlight: true,
    label: "Meest gekozen",
  },
  {
    naam: "Enterprise",
    prijs: "€199",
    periode: "per maand",
    voor: "Grote bureaus & corporate HR",
    features: [
      "Alles van Pro",
      "Volledige ongefilterde database",
      "Hiring advies per vacature",
      "CSV & Excel export",
      "REST API toegang",
      "Tot 10 gebruikers",
      "Dedicated account manager",
      "Maandelijks sectorrapport",
    ],
    beperkingen: [],
    cta: "Start met Enterprise",
    plan: "recruiter" as const,
    href: null,
    highlight: false,
    label: null,
  },
];

const vergelijking = [
  { feature: "Salaris opgeven", gratis: true, starter: true, pro: true, enterprise: true },
  { feature: "Vergelijkingen per maand", gratis: "3x", starter: "Onbeperkt", pro: "Onbeperkt", enterprise: "Onbeperkt" },
  { feature: "Regio & sector filter", gratis: false, starter: true, pro: true, enterprise: true },
  { feature: "Salarisalert", gratis: false, starter: true, pro: true, enterprise: true },
  { feature: "AI onderhandelcoach", gratis: false, starter: false, pro: true, enterprise: true },
  { feature: "Salaristrends (6 mnd)", gratis: false, starter: false, pro: true, enterprise: true },
  { feature: "Acceptatiekans per aanbod", gratis: false, starter: false, pro: true, enterprise: true },
  { feature: "Volledige database", gratis: false, starter: false, pro: false, enterprise: true },
  { feature: "CSV / Excel export", gratis: false, starter: false, pro: false, enterprise: true },
  { feature: "API toegang", gratis: false, starter: false, pro: false, enterprise: true },
  { feature: "Gebruikers", gratis: "1", starter: "1", pro: "3", enterprise: "10" },
  { feature: "Support", gratis: "—", starter: "Email", pro: "Prioriteit", enterprise: "Dedicated" },
];

const faq = [
  {
    v: "Is mijn salaris echt anoniem?",
    a: "Ja, 100%. We slaan geen persoonlijke informatie op bij salarisopgaven. Er is geen koppeling tussen jouw account en de salarisinformatie die je deelt. Zelfs wij kunnen niet terughalen van wie welk salaris is.",
  },
  {
    v: "Kan ik mijn abonnement opzeggen?",
    a: "Ja, je kunt op elk moment opzeggen. Geen jaarcontract, geen opzegtermijn. Je behoudt toegang tot het einde van de betaalde maand.",
  },
  {
    v: "Hoe actueel zijn de salarisgegevens?",
    a: "Onze database wordt continu bijgewerkt door bijdragen van gebruikers. Data ouder dan 18 maanden wordt gewogen om de actualiteit te waarborgen. De meeste data is van de afgelopen 12 maanden.",
  },
  {
    v: "Waarom is het Pro-plan highlighted?",
    a: "Het Pro-plan (€99/mnd) biedt de beste waarde voor recruiters die dagelijks data-gedreven adviezen willen geven. De acceptatiekansberekening en markttrends zijn exclusief voor Pro en Enterprise.",
  },
  {
    v: "Kan ik upgraden of downgraden?",
    a: "Ja, je kunt op elk moment van plan wisselen. Upgrades gaan direct in, downgrades aan het einde van de betaalperiode.",
  },
];

function CheckoutButton({
  plan, cta, href, highlight,
}: {
  plan: null | "starter" | "pro" | "recruiter";
  cta: string;
  href: string | null;
  highlight: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const cls = `block w-full rounded-xl py-3 text-center text-sm font-bold transition ${
    highlight
      ? "bg-white text-indigo-600 hover:bg-indigo-50"
      : "bg-indigo-600 text-white hover:bg-indigo-700"
  } disabled:opacity-60`;

  if (!plan) return <Link href={href ?? "/registreer"} className={cls}>{cta}</Link>;

  return (
    <div>
      <button
        className={cls}
        disabled={loading}
        onClick={async () => {
          setLoading(true);
          setFout(null);
          const err = await startCheckout(plan);
          if (err) setFout(err);
          setLoading(false);
        }}
      >
        {loading ? "Laden..." : cta}
      </button>
      {fout && <p className="mt-2 text-xs text-red-500 text-center">{fout}</p>}
    </div>
  );
}

function Cell({ ok }: { ok: boolean | string }) {
  if (typeof ok === "string") return <span className="text-sm text-gray-700">{ok}</span>;
  return ok
    ? <span className="text-green-600 font-bold text-base">✓</span>
    : <span className="text-gray-200 text-base">—</span>;
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
        <div className="mb-4 text-center">
          <h1 className="mb-4 text-5xl font-black text-gray-900">Eenvoudige prijzen</h1>
          <p className="text-xl text-gray-500">Begin gratis. Upgrade wanneer je klaar bent.</p>
          <p className="mt-2 text-sm text-gray-400">Geen jaarcontract · Opzegbaar per maand · Direct toegang</p>
        </div>

        {/* Trust bar */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2"><span className="text-green-500">🔒</span> 100% anoniem</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Geen verplicht jaarcontract</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> GDPR-compliant</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Gehost in Nederland</span>
        </div>

        {/* Plans grid */}
        <div className="mb-20 grid gap-6 md:grid-cols-4 items-start">
          {plannen.map((plan) => (
            <div
              key={plan.naam}
              className={`relative rounded-2xl p-6 ${
                plan.highlight
                  ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-400 md:-mt-4 md:mb-4"
                  : "bg-white shadow-sm ring-1 ring-gray-100"
              }`}
            >
              {plan.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                  {plan.label}
                </div>
              )}
              <p className={`mb-1 text-xs font-semibold uppercase tracking-wider ${plan.highlight ? "text-indigo-200" : "text-indigo-500"}`}>
                {plan.naam}
              </p>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-4xl font-black">{plan.prijs}</span>
                <span className={`mb-1 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.periode}</span>
              </div>
              <p className={`mb-5 text-xs leading-tight ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>{plan.voor}</p>
              <ul className="mb-5 space-y-1.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-xs">
                    <span className={plan.highlight ? "text-green-300 mt-0.5" : "text-green-500 mt-0.5"}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {plan.beperkingen.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-xs ${plan.highlight ? "opacity-40" : "opacity-30"}`}>
                    <span className="mt-0.5">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton plan={plan.plan} cta={plan.cta} href={plan.href} highlight={plan.highlight} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-20 overflow-x-auto rounded-2xl ring-1 ring-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-4 text-left font-semibold text-gray-700 min-w-[180px]">Feature</th>
                <th className="px-3 py-4 text-center font-semibold text-gray-500">Gratis</th>
                <th className="px-3 py-4 text-center font-semibold text-gray-500">Starter</th>
                <th className="px-3 py-4 text-center font-semibold text-indigo-700 bg-indigo-50">Pro ⭐</th>
                <th className="px-3 py-4 text-center font-semibold text-gray-500">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {vergelijking.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-4 py-3 text-gray-700">{r.feature}</td>
                  <td className="px-3 py-3 text-center"><Cell ok={r.gratis} /></td>
                  <td className="px-3 py-3 text-center"><Cell ok={r.starter} /></td>
                  <td className="px-3 py-3 text-center bg-indigo-50/40"><Cell ok={r.pro} /></td>
                  <td className="px-3 py-3 text-center"><Cell ok={r.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-black text-gray-900">Veelgestelde vragen</h2>
          <div className="space-y-4">
            {faq.map((item) => (
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
