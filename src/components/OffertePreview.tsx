"use client";

import type { GeneratedOffer } from "@/lib/types";

function fmt(n: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(n);
}

interface Props {
  offer: GeneratedOffer;
  onBack: () => void;
}

export default function OffertePreview({ offer, onBack }: Props) {
  function handlePrint() {
    window.print();
  }

  return (
    <div>
      {/* Actiebalk (verborgen bij print) */}
      <div className="mb-6 flex flex-wrap items-center gap-3 print:hidden">
        <button
          onClick={onBack}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          ← Aanpassen
        </button>
        <button
          onClick={handlePrint}
          className="rounded-lg bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600"
        >
          PDF opslaan / Afdrukken
        </button>
        <span className="text-xs text-gray-400">Tip: gebruik &quot;Opslaan als PDF&quot; in het afdrukvenster</span>
      </div>

      {/* Offerte document */}
      <div id="offerte-doc" className="rounded-2xl bg-white p-10 shadow-sm ring-1 ring-gray-100 print:shadow-none print:ring-0">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-black text-gray-900">OFFERTE</h1>
            <p className="mt-1 text-sm text-gray-500">Nummer: {offer.offerteNummer}</p>
            <p className="text-sm text-gray-500">Datum: {offer.datum}</p>
            <p className="text-sm text-gray-500">Geldig tot: {offer.geldigTot}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">{offer.bedrijf.naam}</p>
            <p className="text-sm text-gray-600">{offer.bedrijf.contactpersoon}</p>
            <p className="text-sm text-gray-600">{offer.bedrijf.adres}</p>
            <p className="text-sm text-gray-600">{offer.bedrijf.telefoon}</p>
            <p className="text-sm text-gray-600">{offer.bedrijf.email}</p>
          </div>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* Klantgegevens */}
        <div className="mb-8">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-gray-400">Aan</p>
          <p className="font-semibold text-gray-900">{offer.klant.naam}</p>
          {offer.klant.adres && <p className="text-sm text-gray-600">{offer.klant.adres}</p>}
          {offer.klant.email && <p className="text-sm text-gray-600">{offer.klant.email}</p>}
        </div>

        {/* Project info */}
        <div className="mb-8 rounded-xl bg-orange-50 p-5">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-700">Projectinformatie</p>
          <div className="grid gap-2 sm:grid-cols-2 text-sm">
            <div><span className="font-medium text-gray-700">Type: </span>{offer.project.type}</div>
            {offer.project.locatie && <div><span className="font-medium text-gray-700">Locatie: </span>{offer.project.locatie}</div>}
            {offer.project.startdatum && <div><span className="font-medium text-gray-700">Startdatum: </span>{offer.project.startdatum}</div>}
            {offer.project.doorlooptijd && <div><span className="font-medium text-gray-700">Doorlooptijd: </span>{offer.project.doorlooptijd}</div>}
          </div>
          {offer.toelichting && <p className="mt-3 text-sm text-gray-600">{offer.toelichting}</p>}
        </div>

        {/* Regeloverzicht */}
        <div className="mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="pb-2 text-left font-semibold text-gray-700">Omschrijving</th>
                <th className="pb-2 text-right font-semibold text-gray-700">Aantal</th>
                <th className="pb-2 text-right font-semibold text-gray-700">Eenheid</th>
                <th className="pb-2 text-right font-semibold text-gray-700">Prijs</th>
                <th className="pb-2 text-right font-semibold text-gray-700">Totaal</th>
              </tr>
            </thead>
            <tbody>
              {offer.regels.map((regel, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td className="py-2 pr-4 text-gray-800">{regel.omschrijving}</td>
                  <td className="py-2 text-right text-gray-600">{regel.hoeveelheid}</td>
                  <td className="py-2 text-right text-gray-600">{regel.eenheid}</td>
                  <td className="py-2 text-right text-gray-600">{fmt(regel.prijs)}</td>
                  <td className="py-2 text-right font-medium text-gray-900">{fmt(regel.totaal)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totalen */}
        <div className="ml-auto max-w-xs space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotaal</span>
            <span>{fmt(offer.subtotaal)}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>BTW {offer.btwPercentage}%</span>
            <span>{fmt(offer.btw)}</span>
          </div>
          <div className="flex justify-between rounded-lg bg-gray-900 px-3 py-2 text-base font-bold text-white">
            <span>Totaal</span>
            <span>{fmt(offer.totaal)}</span>
          </div>
        </div>

        {/* Betalingstermijn */}
        <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <span className="font-semibold text-gray-800">Betalingstermijn:</span> Betaling binnen {offer.betalingstermijn} na ontvangst factuur.
        </div>

        {/* Algemene voorwaarden */}
        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">Algemene voorwaarden</p>
          <ul className="space-y-1">
            {offer.voorwaarden.map((v, i) => (
              <li key={i} className="flex gap-2 text-xs text-gray-500">
                <span className="shrink-0">•</span>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Handtekening */}
        <div className="mt-10 grid grid-cols-2 gap-8 pt-6">
          <div>
            <p className="mb-8 text-sm font-medium text-gray-700">Voor akkoord klant:</p>
            <div className="border-t border-gray-300 pt-2 text-xs text-gray-400">Naam + handtekening + datum</div>
          </div>
          <div>
            <p className="mb-8 text-sm font-medium text-gray-700">Namens {offer.bedrijf.naam}:</p>
            <div className="border-t border-gray-300 pt-2 text-xs text-gray-400">{offer.bedrijf.contactpersoon}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
