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

const VOORDELEN = [
  { id: "auto", label: "Lease auto" },
  { id: "pensioen", label: "Pensioenregeling" },
  { id: "bonus", label: "Jaarlijkse bonus" },
  { id: "thuiswerken", label: "Thuiswerken mogelijk" },
  { id: "aandelenoptie", label: "Aandelenopties" },
  { id: "studiebudget", label: "Studiebudget" },
  { id: "telefoon", label: "Zakelijke telefoon" },
  { id: "reiskosten", label: "Reiskostenvergoeding" },
];

interface FormData {
  functie: string;
  sector: string;
  ervaringsjaren: string;
  regio: string;
  bedrijfsGrootte: string;
  opleidingsniveau: string;
  brutoSalaris: string;
  extraVoordelen: string[];
}

const initialData: FormData = {
  functie: "",
  sector: "",
  ervaringsjaren: "",
  regio: "",
  bedrijfsGrootte: "",
  opleidingsniveau: "",
  brutoSalaris: "",
  extraVoordelen: [],
};

function NavBar() {
  return (
    <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
          <span className="text-lg font-bold text-gray-900">SalarisRadar<span className="text-indigo-600">.nl</span></span>
        </Link>
        <Link href="/checken" className="text-sm text-indigo-600 hover:underline">← Terug naar checken</Link>
      </div>
    </header>
  );
}

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div className="mb-8 flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              i + 1 < step ? "bg-green-500 text-white" : i + 1 === step ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400"
            }`}
          >
            {i + 1 < step ? "✓" : i + 1}
          </div>
          {i < total - 1 && <div className={`h-0.5 w-10 ${i + 1 < step ? "bg-green-500" : "bg-gray-200"}`} />}
        </div>
      ))}
    </div>
  );
}

export default function InvullenPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const update = (field: keyof FormData, value: string | string[]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const toggleVoordeel = (id: string) =>
    setData((prev) => ({
      ...prev,
      extraVoordelen: prev.extraVoordelen.includes(id)
        ? prev.extraVoordelen.filter((v) => v !== id)
        : [...prev.extraVoordelen, id],
    }));

  const validateStep = () => {
    if (step === 1 && (!data.functie || !data.sector)) {
      setError("Vul functie en sector in.");
      return false;
    }
    if (step === 2 && (!data.ervaringsjaren || !data.regio || !data.bedrijfsGrootte || !data.opleidingsniveau)) {
      setError("Vul alle velden in.");
      return false;
    }
    if (step === 3 && !data.brutoSalaris) {
      setError("Vul je brutosalaris in.");
      return false;
    }
    const sal = Number(data.brutoSalaris);
    if (step === 3 && (sal < 10000 || sal > 500000)) {
      setError("Salaris moet tussen €10.000 en €500.000 liggen.");
      return false;
    }
    setError("");
    return true;
  };

  const handleNext = () => { if (!validateStep()) return; setStep((s) => s + 1); };

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/salaris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          ervaringsjaren: Number(data.ervaringsjaren),
          brutoSalaris: Number(data.brutoSalaris),
          extraVoordelen: data.extraVoordelen,
        }),
      });
      if (!res.ok) {
        const json = await res.json() as { error?: string };
        setError(json.error ?? "Er is een fout opgetreden.");
        setLoading(false);
        return;
      }
      setStep(4);
    } catch {
      setError("Er is een netwerkfout opgetreden. Probeer het opnieuw.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Trust bar */}
      <div className="bg-indigo-900 text-white py-2.5">
        <div className="mx-auto max-w-4xl px-4 flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            <strong>12.847</strong> salarissen in de database
          </span>
          <span className="text-indigo-400">·</span>
          <span className="flex items-center gap-1.5 text-green-300">
            🔒 <strong>100% anoniem</strong> — geen persoonsgegevens opgeslagen
          </span>
          <span className="text-indigo-400">·</span>
          <span className="text-indigo-300">Laatste bijdrage: <strong className="text-white">4 min geleden</strong></span>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-12">
        {step < 4 && (
          <>
            {/* Header met value prop */}
            <div className="mb-6 text-center">
              <h1 className="text-3xl font-black text-gray-900">Deel jouw salaris</h1>
              <p className="mt-2 text-gray-500">
                <strong className="text-gray-700">Jij geeft:</strong> 2 minuten ·
                <strong className="text-gray-700"> Jij krijgt:</strong> toegang tot alle salarisdata
              </p>
            </div>

            {/* Stap voortgang */}
            <StepIndicator step={step} total={3} />

            {/* Anonimiteit banner */}
            <div className="mb-6 flex items-center gap-3 rounded-xl bg-green-50 border border-green-100 px-4 py-3">
              <span className="text-xl flex-shrink-0">🔒</span>
              <div className="text-sm">
                <p className="font-semibold text-green-800">Volledig anoniem</p>
                <p className="text-green-700">Geen account, geen naam, geen e-mail. Je bijdrage is nooit herleidbaar naar jou.</p>
              </div>
            </div>
          </>
        )}

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Stap 1 — Functie &amp; sector</h2>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Functietitel *</label>
                <input
                  type="text"
                  value={data.functie}
                  onChange={(e) => update("functie", e.target.value)}
                  placeholder="bijv. Software Engineer, Marketing Manager"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Sector *</label>
                <select
                  value={data.sector}
                  onChange={(e) => update("sector", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Kies een sector</option>
                  {SECTOREN.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Stap 2 — Achtergrond</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Jaren ervaring *</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={data.ervaringsjaren}
                    onChange={(e) => update("ervaringsjaren", e.target.value)}
                    placeholder="bijv. 5"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Regio *</label>
                  <select
                    value={data.regio}
                    onChange={(e) => update("regio", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="">Kies regio</option>
                    {REGIO_LIJST.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Bedrijfsgrootte *</label>
                <select
                  value={data.bedrijfsGrootte}
                  onChange={(e) => update("bedrijfsGrootte", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Kies een grootte</option>
                  <option value="1-10">1–10 medewerkers</option>
                  <option value="11-50">11–50 medewerkers</option>
                  <option value="51-200">51–200 medewerkers</option>
                  <option value="200+">200+ medewerkers</option>
                </select>
              </div>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Hoogste opleiding *</label>
                <select
                  value={data.opleidingsniveau}
                  onChange={(e) => update("opleidingsniveau", e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  <option value="">Kies opleidingsniveau</option>
                  <option value="mbo">MBO</option>
                  <option value="hbo">HBO</option>
                  <option value="wo">WO / Universiteit</option>
                </select>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold text-gray-900">Stap 3 — Salaris &amp; voordelen</h2>
              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Bruto jaarsalaris (€) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-gray-400">€</span>
                  <input
                    type="number"
                    min="10000"
                    max="500000"
                    step="1000"
                    value={data.brutoSalaris}
                    onChange={(e) => update("brutoSalaris", e.target.value)}
                    placeholder="bijv. 65000"
                    className="w-full rounded-xl border border-gray-200 py-3 pl-8 pr-4 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">Exclusief bonus en andere toeslagen · Dit getal is nooit herleidbaar naar jou</p>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">Extra voordelen (optioneel)</label>
                <div className="grid grid-cols-2 gap-2">
                  {VOORDELEN.map((v) => (
                    <label
                      key={v.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                        data.extraVoordelen.includes(v.id)
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={data.extraVoordelen.includes(v.id)}
                        onChange={() => toggleVoordeel(v.id)}
                        className="h-4 w-4 accent-indigo-600"
                      />
                      {v.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Succes */}
          {step === 4 && (
            <div className="py-4 text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                <span className="text-4xl">✓</span>
              </div>
              <h2 className="mb-3 text-2xl font-black text-gray-900">Bedankt voor je bijdrage!</h2>
              <p className="mb-2 text-gray-500">
                Je salarisinformatie is anoniem opgeslagen en helpt anderen eerlijk betaald te krijgen.
              </p>
              <p className="mb-8 text-sm text-gray-400">
                Je bent nu onderdeel van <strong>12.848</strong> bijdragen in de database 🎉
              </p>

              {/* Referral block */}
              <div className="mb-6 rounded-xl bg-indigo-50 p-5 text-left ring-1 ring-indigo-100">
                <p className="font-bold text-indigo-900 mb-1">🎁 Nodig een collega uit → win 1 maand Pro gratis</p>
                <p className="text-sm text-indigo-700 mb-3">
                  Maak een gratis account aan om jouw persoonlijke referral code te zien.
                </p>
                <Link href="/registreer" className="inline-block rounded-lg bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-700 transition-colors">
                  Account aanmaken →
                </Link>
              </div>

              <div className="space-y-3">
                <Link
                  href="/checken"
                  className="block rounded-xl bg-indigo-600 px-6 py-3 text-center font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  Bekijk salarisstatistieken →
                </Link>
                <Link
                  href="/onderhandelen"
                  className="block rounded-xl bg-orange-50 px-6 py-3 text-center font-semibold text-orange-600 hover:bg-orange-100 transition-colors"
                >
                  Genereer onderhandelscript
                </Link>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          )}

          {step < 4 && (
            <div className="mt-8 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  ← Terug
                </button>
              ) : <div />}
              {step < 3 ? (
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-indigo-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 transition-colors"
                >
                  Volgende →
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="rounded-xl bg-green-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  {loading ? "Opslaan…" : "Salaris opslaan ✓"}
                </button>
              )}
            </div>
          )}
        </div>

        {step < 4 && (
          <div className="mt-4 rounded-xl bg-gray-50 px-4 py-3 text-center">
            <p className="text-xs text-gray-400">
              🔒 <strong>Geen persoonsgegevens vereist.</strong> Volledig anoniem en GDPR-compliant.
              Wij kunnen nooit achterhalen van wie welk salaris is — ook intern niet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
