"use client";

import { useState } from "react";
import OfferteForm from "@/components/OfferteForm";
import OffertePreview from "@/components/OffertePreview";
import type { GeneratedOffer } from "@/lib/types";

export default function Home() {
  const [offer, setOffer] = useState<GeneratedOffer | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-orange-500 px-2 py-1 text-sm font-black text-white">AO</span>
            <span className="text-lg font-bold text-gray-900">AutoOffer</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:block">Professionele offertes in 10 seconden</span>
            <a href="#prijzen" className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-600">
              Pro — €29/m
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {!offer ? (
          <>
            {/* Hero */}
            <div className="mb-10 text-center print:hidden">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
                ⚡ Gratis proberen — geen account nodig
              </div>
              <h1 className="mb-3 text-4xl font-black text-gray-900 sm:text-5xl">
                Offerte maken in{" "}
                <span className="text-orange-500">10 seconden</span>
              </h1>
              <p className="mx-auto max-w-xl text-lg text-gray-500">
                Voor aannemers, schilders, loodgieters en andere vakmensen.
                Vul je gegevens in en download direct een professionele PDF.
              </p>
            </div>

            {/* Stappen */}
            <div className="mb-10 grid grid-cols-3 gap-4 print:hidden">
              {[
                { n: "1", t: "Vul je gegevens in", s: "Bedrijf, klant en project" },
                { n: "2", t: "Klik op genereren", s: "AI maakt de offerte aan" },
                { n: "3", t: "Download als PDF", s: "Direct versturen naar klant" },
              ].map((s) => (
                <div key={s.n} className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-gray-100">
                  <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                    {s.n}
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{s.t}</p>
                  <p className="text-xs text-gray-500">{s.s}</p>
                </div>
              ))}
            </div>

            <OfferteForm onGenerated={setOffer} />

            {/* Prijzen */}
            <section id="prijzen" className="mt-20 print:hidden">
              <h2 className="mb-2 text-center text-3xl font-black text-gray-900">Eenvoudige prijzen</h2>
              <p className="mb-10 text-center text-gray-500">Start gratis, upgrade wanneer je groeit</p>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  {
                    name: "Gratis",
                    price: "€0",
                    period: "voor altijd",
                    features: ["3 offertes per maand", "Alle project-types", "PDF download", "Geen account nodig"],
                    cta: "Nu starten",
                    highlight: false,
                  },
                  {
                    name: "Pro",
                    price: "€29",
                    period: "per maand",
                    features: ["Onbeperkt offertes", "Eigen logo & huisstijl", "Klantendatabase opslaan", "E-mail offerte direct", "Prioriteit support"],
                    cta: "Pro proberen",
                    highlight: true,
                  },
                  {
                    name: "Agency",
                    price: "€49",
                    period: "per maand",
                    features: ["Alles van Pro", "Tot 5 teamleden", "White-label (eigen domein)", "API toegang", "Maandrapportages"],
                    cta: "Contact opnemen",
                    highlight: false,
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`rounded-2xl p-6 ${
                      plan.highlight
                        ? "bg-orange-500 text-white shadow-xl ring-2 ring-orange-400"
                        : "bg-white shadow-sm ring-1 ring-gray-100"
                    }`}
                  >
                    <p className={`mb-1 font-semibold ${plan.highlight ? "text-orange-100" : "text-gray-500"}`}>{plan.name}</p>
                    <p className="mb-1 text-4xl font-black">{plan.price}</p>
                    <p className={`mb-5 text-sm ${plan.highlight ? "text-orange-200" : "text-gray-400"}`}>{plan.period}</p>
                    <ul className="mb-6 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <span className={plan.highlight ? "text-orange-200" : "text-orange-500"}>✓</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      className={`w-full rounded-xl py-2 text-sm font-bold transition ${
                        plan.highlight
                          ? "bg-white text-orange-600 hover:bg-orange-50"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {plan.cta}
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Social proof */}
            <section className="mt-16 print:hidden">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { quote: "Bespaar me 2 uur per week. Eindelijk professionele offertes.", name: "Marco V., Schildersbedrijf" },
                  { quote: "Klanten reageren veel sneller nu mijn offertes er zo netjes uitzien.", name: "Petra K., Aannemerij" },
                  { quote: "Binnen 5 minuten een offerte verstuurd. Waanzinnig handig.", name: "Dennis B., Loodgieter" },
                ].map((r) => (
                  <div key={r.name} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
                    <p className="mb-3 text-sm italic text-gray-600">&quot;{r.quote}&quot;</p>
                    <p className="text-xs font-semibold text-gray-800">{r.name}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : (
          <OffertePreview offer={offer} onBack={() => setOffer(null)} />
        )}
      </main>

      <footer className="mt-20 border-t border-gray-100 bg-white py-6 text-center text-xs text-gray-400 print:hidden">
        © {new Date().getFullYear()} AutoOffer — Gebouwd voor Nederlandse vakmensen
      </footer>
    </div>
  );
}
