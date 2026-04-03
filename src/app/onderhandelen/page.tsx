"use client";

import { useState } from "react";
import Link from "next/link";

const SECTOREN = [
  "IT", "Marketing", "Finance", "HR", "Sales", "Zorg", "Onderwijs",
  "Juridisch", "Bouw", "Logistiek", "Retail", "Overheid", "Horeca",
  "Creatief", "Techniek", "Overig",
];

interface FormData {
  huidigSalaris: string;
  gevraagdSalaris: string;
  functie: string;
  sector: string;
  ervaringsjaren: string;
  argumenten: string;
}

interface Script {
  opening: string;
  argumentenSectie: string;
  marktPositie: string;
  tegenwerpingResponse: string;
  afsluiting: string;
  tips: string[];
}

function generateScript(data: FormData): Script {
  const huidig = Number(data.huidigSalaris);
  const gevraagd = Number(data.gevraagdSalaris);
  const stijging = gevraagd > 0 && huidig > 0 ? Math.round(((gevraagd - huidig) / huidig) * 100) : 0;
  const verschil = gevraagd - huidig;
  const formattedHuidig = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(huidig);
  const formattedGevraagd = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(gevraagd);
  const formattedVerschil = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(verschil);

  const jaren = Number(data.ervaringsjaren);
  const ervaringLabel = jaren === 1 ? "1 jaar" : `${jaren} jaar`;

  const opening = `Goedemiddag [naam manager],

Ik waardeer de kans om over mijn salaris te praten. De afgelopen periode heb ik veel bijgedragen aan [team/afdeling] en ik kijk terug op mooie resultaten. Ik wil graag bespreken of er ruimte is om mijn beloning aan te passen zodat deze beter aansluit bij mijn bijdrage en de markt.`;

  const argumentenSectie = data.argumenten.trim()
    ? `Mijn prestaties en bijdragen:

${data.argumenten
    .split("\n")
    .filter((l) => l.trim())
    .map((l) => `• ${l.trim()}`)
    .join("\n")}

Deze resultaten laten zien dat ik meer waarde lever dan gemiddeld voor iemand in mijn functie en ervaringsniveau.`
    : `In mijn ${ervaringLabel} als ${data.functie || "professional"} in de ${data.sector || "sector"} heb ik aantoonbaar waarde toegevoegd aan de organisatie. Ik heb mijn verantwoordelijkheden uitgebreid, nieuwe vaardigheden opgedaan en bijgedragen aan het succes van het team.`;

  const marktPositie = `Marktwaarde:

Op basis van recente salarisdata voor ${data.functie || "mijn functie"} in de ${data.sector || "sector"} — mede via bronnen als CheckMijnLoon.nl — ligt het marktgemiddelde voor iemand met ${ervaringLabel} ervaring tussen de ${formattedHuidig} en ${formattedGevraagd} bruto per jaar.

Mijn huidige salaris van ${formattedHuidig} ligt daarmee${stijging > 0 ? ` ${stijging}% onder` : " aan de onderkant van"} het marktgemiddelde. Een aanpassing naar ${formattedGevraagd} — een verhoging van ${formattedVerschil} — brengt mij op het marktgemiddelde voor mijn functie en ervaring.`;

  const tegenwerpingResponse = `Als je twijfelt over de verhoging:

Ik begrijp dat budget altijd een overweging is. Laten we dan kijken naar alternatieven die ook voor de organisatie werken:

• Een gefaseerde verhoging: ${formattedVerschil} nu, de rest over 6 maanden bij een tussentijdse evaluatie
• Extra niet-monetaire voordelen zoals thuiswerken, een studiebudget of extra vakantiedagen
• Een eenmalige bonus van ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Math.round(verschil * 0.5))} naast een kleinere structurele verhoging

Ik sta open voor een gesprek over hoe we dit kunnen vormgeven.`;

  const afsluiting = `Afsluiting:

Ik houd van mijn werk hier en zie mezelf groeien binnen de organisatie. Een eerlijke beloning is voor mij een teken dat de organisatie ook in mij investeert. Ik hoop dat we hierin samen een goede oplossing vinden.

Kun je aangeven wanneer ik een terugkoppeling kan verwachten?

Met vriendelijke groet,
[Jouw naam]`;

  const tips: string[] = [
    stijging > 20
      ? "Let op: je vraagt meer dan 20% stijging. Overweeg dit in twee stappen te vragen."
      : "Je loonsverhoging is realistisch. Houd voet bij stuk maar blijf flexibel.",
    "Plan het gesprek begin van de week, niet op vrijdag.",
    "Kom altijd met cijfers — marktdata maakt je argument veel sterker.",
    "Laat een stilte vallen na je verzoek. Wie het eerst spreekt geeft toe.",
    data.sector === "IT" || data.sector === "Finance"
      ? "In jouw sector is schaarste aan talent groot — gebruik dat als argument."
      : "Benadruk unieke vaardigheden die moeilijk te vervangen zijn.",
    "Noem nooit een range — begin met jouw gewenste bedrag als startpunt.",
  ];

  return { opening, argumentenSectie, marktPositie, tegenwerpingResponse, afsluiting, tips };
}

function NavBar() {
  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">CM</span>
          <span className="text-lg font-bold text-gray-900">CheckMijnLoon<span className="text-indigo-600">.nl</span></span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Salaris checken</Link>
          <Link href="/prijzen" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">Pro</Link>
        </nav>
      </div>
    </header>
  );
}

export default function OnderhandelenPage() {
  const [form, setForm] = useState<FormData>({
    huidigSalaris: "",
    gevraagdSalaris: "",
    functie: "",
    sector: "",
    ervaringsjaren: "",
    argumenten: "",
  });
  const [script, setScript] = useState<Script | null>(null);
  const [copied, setCopied] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    const s = generateScript(form);
    setScript(s);
    setTimeout(() => {
      document.getElementById("script-output")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const fullScript = script
    ? [
        "=== ONDERHANDELSCRIPT — SALARISCHECK.NL ===\n",
        script.opening,
        "\n---\n",
        script.argumentenSectie,
        "\n---\n",
        script.marktPositie,
        "\n---\n",
        script.tegenwerpingResponse,
        "\n---\n",
        script.afsluiting,
      ].join("\n")
    : "";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid =
    form.huidigSalaris &&
    form.gevraagdSalaris &&
    Number(form.gevraagdSalaris) > Number(form.huidigSalaris);

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      <div className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
            Onderhandelcoach
          </div>
          <h1 className="mb-3 text-4xl font-black text-gray-900">Genereer jouw onderhandelscript</h1>
          <p className="text-lg text-gray-500">
            Vul de gegevens in en ontvang een persoonlijk, professioneel script voor jouw salarisonderhandeling.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form */}
          <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
            <h2 className="mb-5 text-lg font-bold text-gray-900">Jouw situatie</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Huidig brutosalaris (€/jaar) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    <input
                      type="number"
                      value={form.huidigSalaris}
                      onChange={(e) => update("huidigSalaris", e.target.value)}
                      placeholder="55000"
                      className="w-full rounded-xl border border-gray-200 py-2.5 pl-7 pr-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Gevraagd salaris (€/jaar) *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">€</span>
                    <input
                      type="number"
                      value={form.gevraagdSalaris}
                      onChange={(e) => update("gevraagdSalaris", e.target.value)}
                      placeholder="65000"
                      className="w-full rounded-xl border border-gray-200 py-2.5 pl-7 pr-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
              </div>

              {form.huidigSalaris && form.gevraagdSalaris && Number(form.gevraagdSalaris) > Number(form.huidigSalaris) && (
                <div className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  Verhoging: +{Math.round(((Number(form.gevraagdSalaris) - Number(form.huidigSalaris)) / Number(form.huidigSalaris)) * 100)}%
                  {" "}(+{new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(Number(form.gevraagdSalaris) - Number(form.huidigSalaris))})
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">Functietitel</label>
                <input
                  type="text"
                  value={form.functie}
                  onChange={(e) => update("functie", e.target.value)}
                  placeholder="bijv. Senior Developer"
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Sector</label>
                  <select
                    value={form.sector}
                    onChange={(e) => update("sector", e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  >
                    <option value="">Kies sector</option>
                    {SECTOREN.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Jaren ervaring</label>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={form.ervaringsjaren}
                    onChange={(e) => update("ervaringsjaren", e.target.value)}
                    placeholder="bijv. 5"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-gray-700">
                  Argumenten &amp; prestaties (één per regel)
                </label>
                <textarea
                  value={form.argumenten}
                  onChange={(e) => update("argumenten", e.target.value)}
                  rows={5}
                  placeholder={"Leid nieuw project van €500k succesvol\nTeam uitgebreid van 3 naar 7 personen\nOmzet stijging van 25% in mijn afdeling"}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                />
                <p className="mt-1 text-xs text-gray-400">Hoe concreter, hoe sterker je script</p>
              </div>

              <button
                onClick={handleGenerate}
                disabled={!isValid}
                className="w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white hover:bg-orange-600 transition-colors disabled:opacity-40"
              >
                Genereer onderhandelscript →
              </button>
              {!isValid && form.huidigSalaris && form.gevraagdSalaris && (
                <p className="text-xs text-red-500 text-center">Het gevraagde salaris moet hoger zijn dan het huidige salaris.</p>
              )}
            </div>
          </div>

          {/* Tips sidebar */}
          <div className="space-y-4">
            <div className="rounded-2xl bg-indigo-50 p-6 ring-1 ring-indigo-100">
              <h3 className="mb-4 font-bold text-indigo-900">Onderhandeltips</h3>
              <ul className="space-y-3 text-sm text-indigo-800">
                {[
                  "Kom altijd met marktdata — niet met emoties of levenskosten.",
                  "Plan het gesprek vroeg in de week, als je manager fris is.",
                  "Laat een stilte vallen na je verzoek. Wie het eerst spreekt, geeft toe.",
                  "Vraag altijd iets hoger dan je doelstelling — er is ruimte voor concessies.",
                  "Zeg nooit een range. Noem je gewenste bedrag als startpunt.",
                  "Bedank voor de tijd, ook als het antwoord nee is — voor nu.",
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-indigo-200 text-xs font-bold text-indigo-700">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-orange-50 p-5 ring-1 ring-orange-100 text-sm text-orange-900">
              <p className="font-semibold mb-1">Pro tip</p>
              <p>Controleer eerst je marktwaarde via onze{" "}
                <Link href="/checken" className="underline font-semibold">checkmijnloon</Link>.
                Daarmee heb je concrete data om mee te onderhandelen.
              </p>
            </div>
          </div>
        </div>

        {/* Script output */}
        {script && (
          <div id="script-output" className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-2xl font-black text-gray-900">Jouw onderhandelscript</h2>
              <div className="flex gap-3">
                <button
                  onClick={handleCopy}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {copied ? "Gekopieerd! ✓" : "Kopieer script"}
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Afdrukken
                </button>
              </div>
            </div>

            {/* Personal tips */}
            <div className="mb-6 rounded-2xl bg-amber-50 p-5 ring-1 ring-amber-100">
              <h3 className="mb-3 font-bold text-amber-900">Persoonlijke tips voor jou</h3>
              <ul className="space-y-2">
                {script.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                    <span className="text-amber-500">→</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {[
                { title: "1. Opening", content: script.opening, color: "border-indigo-200 bg-indigo-50" },
                { title: "2. Jouw prestaties", content: script.argumentenSectie, color: "border-green-200 bg-green-50" },
                { title: "3. Marktpositie", content: script.marktPositie, color: "border-blue-200 bg-blue-50" },
                { title: "4. Reactie op tegenwerping", content: script.tegenwerpingResponse, color: "border-orange-200 bg-orange-50" },
                { title: "5. Afsluiting", content: script.afsluiting, color: "border-purple-200 bg-purple-50" },
              ].map((section) => (
                <div key={section.title} className={`rounded-2xl border p-6 ${section.color}`}>
                  <h3 className="mb-3 font-bold text-gray-900">{section.title}</h3>
                  <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 leading-relaxed">
                    {section.content}
                  </pre>
                </div>
              ))}
            </div>

            {/* Pro CTA */}
            <div className="mt-8 rounded-2xl bg-indigo-900 p-6 text-white">
              <h3 className="mb-2 text-lg font-bold">Wil je dit script opslaan?</h3>
              <p className="mb-4 text-sm text-indigo-300">
                Met Pro kun je scripts opslaan, aanpassen en delen. Plus: onbeperkte checkmijnloon en salarisalerts.
              </p>
              <Link
                href="/prijzen"
                className="inline-block rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-indigo-700 hover:bg-indigo-50 transition-colors"
              >
                Upgrade naar Pro — €9/mnd
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
