"use client";

import { useState } from "react";
import type { OfferteFormData, GeneratedOffer } from "@/lib/types";

const PROJECT_TYPES = [
  { value: "schilderwerk", label: "Schilderwerk" },
  { value: "verbouwing", label: "Verbouwing / Renovatie" },
  { value: "loodgieterswerk", label: "Loodgieterswerk / Sanitair" },
  { value: "tuin", label: "Tuinaanleg / Bestrating" },
  { value: "dakwerk", label: "Dakwerk" },
  { value: "overig", label: "Overig" },
];

const BETAALTERMIJNEN = ["14 dagen", "21 dagen", "30 dagen", "op afroep"];

interface Props {
  onGenerated: (offer: GeneratedOffer) => void;
}

export default function OfferteForm({ onGenerated }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<OfferteFormData>({
    bedrijfsnaam: "",
    contactpersoon: "",
    telefoon: "",
    email: "",
    adres: "",
    klantNaam: "",
    klantAdres: "",
    klantEmail: "",
    projectType: "schilderwerk",
    projectOmschrijving: "",
    werkzaamheden: [],
    oppervlakte: "",
    locatie: "",
    startdatum: "",
    doorlooptijd: "",
    materiaalkosten: "",
    arbeidskosten: "",
    extraKosten: "",
    btwPercentage: "21",
    betalingstermijn: "14 dagen",
    geldigTot: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
  });

  const set = (field: keyof OfferteFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const showOppervlakte = ["schilderwerk", "tuin", "dakwerk"].includes(form.projectType);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Genereren mislukt");
      const offer: GeneratedOffer = await res.json();
      onGenerated(offer);
    } catch {
      setError("Er is iets misgegaan. Probeer het opnieuw.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500";
  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Bedrijfsgegevens */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Uw bedrijfsgegevens</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Bedrijfsnaam *</label>
            <input required className={inputClass} value={form.bedrijfsnaam} onChange={set("bedrijfsnaam")} placeholder="Schildersbedrijf Jansen" />
          </div>
          <div>
            <label className={labelClass}>Contactpersoon *</label>
            <input required className={inputClass} value={form.contactpersoon} onChange={set("contactpersoon")} placeholder="Jan Jansen" />
          </div>
          <div>
            <label className={labelClass}>Telefoon</label>
            <input className={inputClass} value={form.telefoon} onChange={set("telefoon")} placeholder="06-12345678" />
          </div>
          <div>
            <label className={labelClass}>E-mailadres</label>
            <input type="email" className={inputClass} value={form.email} onChange={set("email")} placeholder="info@jansen.nl" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Adres</label>
            <input className={inputClass} value={form.adres} onChange={set("adres")} placeholder="Dorpsstraat 1, 1234 AB Amsterdam" />
          </div>
        </div>
      </section>

      {/* Klantgegevens */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Klantgegevens</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Naam klant *</label>
            <input required className={inputClass} value={form.klantNaam} onChange={set("klantNaam")} placeholder="Familie de Vries" />
          </div>
          <div>
            <label className={labelClass}>E-mail klant</label>
            <input type="email" className={inputClass} value={form.klantEmail} onChange={set("klantEmail")} placeholder="devries@email.nl" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Adres klant</label>
            <input className={inputClass} value={form.klantAdres} onChange={set("klantAdres")} placeholder="Kerkstraat 5, 5678 CD Rotterdam" />
          </div>
        </div>
      </section>

      {/* Projectgegevens */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Projectgegevens</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Type werk *</label>
            <select required className={inputClass} value={form.projectType} onChange={set("projectType")}>
              {PROJECT_TYPES.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Locatie</label>
            <input className={inputClass} value={form.locatie} onChange={set("locatie")} placeholder="Woning te Rotterdam" />
          </div>
          {showOppervlakte && (
            <div>
              <label className={labelClass}>Oppervlakte (m²)</label>
              <input type="number" className={inputClass} value={form.oppervlakte} onChange={set("oppervlakte")} placeholder="50" />
            </div>
          )}
          <div>
            <label className={labelClass}>Startdatum</label>
            <input type="date" className={inputClass} value={form.startdatum} onChange={set("startdatum")} />
          </div>
          <div>
            <label className={labelClass}>Doorlooptijd</label>
            <input className={inputClass} value={form.doorlooptijd} onChange={set("doorlooptijd")} placeholder="2 werkdagen" />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass}>Beschrijving werkzaamheden</label>
            <textarea rows={3} className={inputClass} value={form.projectOmschrijving} onChange={set("projectOmschrijving")} placeholder="Beschrijf kort wat er gedaan wordt..." />
          </div>
        </div>
      </section>

      {/* Financieel */}
      <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Financieel</h2>
        <p className="mb-4 text-sm text-gray-500">Vul bedragen in om de standaard berekening te overschrijven, of laat leeg voor automatische berekening.</p>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Arbeidskosten (€)</label>
            <input type="number" className={inputClass} value={form.arbeidskosten} onChange={set("arbeidskosten")} placeholder="Automatisch" />
          </div>
          <div>
            <label className={labelClass}>Materiaalkosten (€)</label>
            <input type="number" className={inputClass} value={form.materiaalkosten} onChange={set("materiaalkosten")} placeholder="Automatisch" />
          </div>
          <div>
            <label className={labelClass}>Extra kosten (€)</label>
            <input type="number" className={inputClass} value={form.extraKosten} onChange={set("extraKosten")} placeholder="0" />
          </div>
          <div>
            <label className={labelClass}>BTW</label>
            <select className={inputClass} value={form.btwPercentage} onChange={set("btwPercentage")}>
              <option value="21">21%</option>
              <option value="9">9%</option>
              <option value="0">0% (vrijgesteld)</option>
            </select>
          </div>
          <div>
            <label className={labelClass}>Betalingstermijn</label>
            <select className={inputClass} value={form.betalingstermijn} onChange={set("betalingstermijn")}>
              {BETAALTERMIJNEN.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className={labelClass}>Offerte geldig tot</label>
            <input type="date" className={inputClass} value={form.geldigTot} onChange={set("geldigTot")} />
          </div>
        </div>
      </section>

      {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-orange-500 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:bg-orange-600 disabled:opacity-60"
      >
        {loading ? "Offerte wordt gegenereerd..." : "Genereer mijn offerte →"}
      </button>
    </form>
  );
}
