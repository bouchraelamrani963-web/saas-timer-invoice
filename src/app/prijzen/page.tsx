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
    naam: "Starter",
    prijs: "€49",
    periode: "/maand",
    voor: "Kleine bureaus & ZZP-recruiters",
    features: [
      "Onbeperkt salarissen opzoeken",
      "Benchmarks per sector & regio",
      "Regio-inzicht alle 12 provincies",
      "Salarisalert bij marktwijzigingen",
      "1 gebruiker",
      "Email support",
    ],
    beperkingen: [
      "AI onderhandelcoach",
      "Salaristrends & acceptatiekans",
      "Data export",
      "API toegang",
    ],
    cta: "Start met Starter",
    plan: "starter" as const,
    highlight: false,
    label: null as string | null,
  },
  {
    naam: "Pro",
    prijs: "€99",
    periode: "/maand",
    voor: "Groeiende bureaus & in-house HR",
    features: [
      "Alles van Starter",
      "AI onderhandelcoach",
      "Salaristrends (6 maanden historie)",
      "Acceptatiekans per salarisaanbod",
      "Marktanalyse per functiegroep",
      "3 gebruikers",
      "Priority support",
    ],
    beperkingen: [
      "Volledige ongefilterde database",
      "Data export",
      "API toegang",
    ],
    cta: "Start met Pro",
    plan: "pro" as const,
    highlight: true,
    label: "Meest gekozen",
  },
  {
    naam: "Enterprise",
    prijs: "€199",
    periode: "/maand",
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
    highlight: false,
    label: null,
  },
];

const vergelijking = [
  { feature: "Salarissen opzoeken", starter: "Onbeperkt", pro: "Onbeperkt", enterprise: "Onbeperkt" },
  { feature: "Sector & regio filter", starter: true, pro: true, enterprise: true },
  { feature: "Salarisalert", starter: true, pro: true, enterprise: true },
  { feature: "AI onderhandelcoach", starter: false, pro: true, enterprise: true },
  { feature: "Salaristrends (6 mnd)", starter: false, pro: true, enterprise: true },
  { feature: "Acceptatiekans per aanbod", starter: false, pro: true, enterprise: true },
  { feature: "Marktanalyse per functiegroep", starter: false, pro: true, enterprise: true },
  { feature: "Volledige database", starter: false, pro: false, enterprise: true },
  { feature: "CSV / Excel export", starter: false, pro: false, enterprise: true },
  { feature: "API toegang", starter: false, pro: false, enterprise: true },
  { feature: "Gebruikers", starter: "1", pro: "3", enterprise: "10" },
  { feature: "Support", starter: "Email", pro: "Prioriteit", enterprise: "Dedicated" },
];

const faq = [
  {
    v: "Kan ik opzeggen wanneer ik wil?",
    a: "Ja. Geen jaarcontract, geen opzegtermijn. Je behoudt toegang tot het einde van de betaalde maand.",
  },
  {
    v: "Hoe actueel zijn de salarisgegevens?",
    a: "De database wordt dagelijks bijgewerkt via bijdragen van professionals. Data ouder dan 18 maanden wordt gewogen om actualiteit te waarborgen. De meeste data is van de afgelopen 12 maanden.",
  },
  {
    v: "Kan ik upgraden of downgraden?",
    a: "Ja, je kunt op elk moment van plan wisselen. Upgrades gaan direct in, downgrades aan het einde van de betaalperiode.",
  },
  {
    v: "Wat is het verschil tussen Pro en Enterprise?",
    a: "Enterprise geeft toegang tot de volledige ongefilterde database, data export (CSV/Excel), API toegang en een dedicated account manager. Ideaal voor grotere bureaus die data in eigen systemen willen integreren.",
  },
  {
    v: "Zijn er kortingen voor grotere teams?",
    a: "Ja. Neem contact op voor een aangepast enterprise-aanbod bij meer dan 10 gebruikers of een jaarabonnement.",
  },
];

function CheckoutButton({ plan, cta, highlight }: { plan: "starter" | "pro" | "recruiter"; cta: string; highlight: boolean }) {
  const [loading, setLoading] = useState(false);
  const [fout, setFout] = useState<string | null>(null);
  const cls = `block w-full rounded-xl py-3 text-center font-bold transition-colors ${
    highlight
      ? "bg-white text-indigo-600 hover:bg-indigo-50"
      : "bg-indigo-600 text-white hover:bg-indigo-700"
  } disabled:opacity-60`;

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
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/voor-recruiters" className="text-sm text-gray-600 hover:text-indigo-600">Voor recruiters</Link>
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600">Salaris checken</Link>
          </nav>
          <Link href="/voor-recruiters#contact" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700">Demo aanvragen</Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-20">

        {/* Header */}
        <div className="mb-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">Voor recruitment professionals</p>
          <h1 className="mb-4 text-5xl font-black text-gray-900">Kies jouw plan</h1>
          <p className="text-xl text-gray-500">Stop no-shows op offers. Word de recruiter die klanten vertrouwen.</p>
          <p className="mt-2 text-sm text-gray-400">Geen jaarcontract · Opzegbaar per maand · Direct toegang</p>
        </div>

        {/* Trust bar */}
        <div className="mb-14 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> 12.847 geverifieerde salarissen</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Bijgewerkt deze week</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> Geen jaarcontract</span>
          <span className="flex items-center gap-2"><span className="text-green-500">✓</span> GDPR-compliant</span>
        </div>

        {/* Plans */}
        <div className="mb-20 grid gap-6 md:grid-cols-3 items-start">
          {plannen.map((plan) => (
            <div
              key={plan.naam}
              className={`relative rounded-2xl p-8 ${
                plan.highlight
                  ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-400 md:-mt-4 md:pb-12"
                  : "bg-white shadow-sm ring-1 ring-gray-100"
              }`}
            >
              {plan.label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white whitespace-nowrap">
                  {plan.label}
                </div>
              )}
              <p className={`mb-1 text-xs font-bold uppercase tracking-wider ${plan.highlight ? "text-indigo-200" : "text-indigo-500"}`}>
                {plan.naam}
              </p>
              <div className="mb-1 flex items-end gap-1">
                <span className="text-5xl font-black">{plan.prijs}</span>
                <span className={`mb-2 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.periode}</span>
              </div>
              <p className={`mb-6 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>{plan.voor}</p>
              <ul className="mb-8 space-y-2">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 ${plan.highlight ? "text-green-300" : "text-green-500"}`}>✓</span>
                    <span>{f}</span>
                  </li>
                ))}
                {plan.beperkingen.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm opacity-30`}>
                    <span className="mt-0.5">—</span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <CheckoutButton plan={plan.plan} cta={plan.cta} highlight={plan.highlight} />
            </div>
          ))}
        </div>

        {/* Comparison table */}
        <div className="mb-20 overflow-x-auto rounded-2xl ring-1 ring-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-left font-semibold text-gray-700 min-w-[200px]">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-gray-500">Starter</th>
                <th className="px-4 py-4 text-center font-semibold text-indigo-700 bg-indigo-50">Pro ⭐</th>
                <th className="px-4 py-4 text-center font-semibold text-gray-500">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {vergelijking.map((r, i) => (
                <tr key={r.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                  <td className="px-6 py-3 text-gray-700">{r.feature}</td>
                  <td className="px-4 py-3 text-center"><Cell ok={r.starter} /></td>
                  <td className="px-4 py-3 text-center bg-indigo-50/40"><Cell ok={r.pro} /></td>
                  <td className="px-4 py-3 text-center"><Cell ok={r.enterprise} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FAQ */}
        <div className="mb-20 mx-auto max-w-3xl">
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

        {/* Gratis bijdragen CTA — onderaan, als aparte laag */}
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
          <p className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">Geen recruiter?</p>
          <h3 className="mb-3 text-2xl font-black text-gray-900">Draag gratis bij aan de database</h3>
          <p className="mb-6 text-gray-500 max-w-lg mx-auto">
            Ben je professional en wil je jouw salaris anoniem toevoegen?
            Dat is altijd gratis — geen account nodig, geen creditcard.
            Jouw bijdrage maakt de data nauwkeuriger voor iedereen.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/invullen"
              className="rounded-xl bg-gray-800 px-6 py-3 font-semibold text-white hover:bg-gray-900 transition-colors"
            >
              Salaris anoniem toevoegen →
            </Link>
            <Link
              href="/checken"
              className="rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Salaris gratis checken
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">🔒 100% anoniem · Geen persoonsgegevens · GDPR-compliant</p>
        </div>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8 mt-10">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SalarisRadar.nl —{" "}
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          {" · "}
          <Link href="/voor-recruiters" className="hover:text-indigo-600">Voor recruiters</Link>
          {" · "}
          <Link href="/vergelijking" className="hover:text-indigo-600">Vs. alternatieven</Link>
        </div>
      </footer>
    </div>
  );
}
