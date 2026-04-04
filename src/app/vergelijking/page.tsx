import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SalarisRadar vs alternatieven — de beste salarisvergelijker",
  description:
    "Vergelijk SalarisRadar met Loonwijzer, Glassdoor en LinkedIn Salary. Zie waarom Nederlandse professionals kiezen voor SalarisRadar.",
};

const vergelijking = [
  { feature: "Uitsluitend Nederlandse data", sr: true, loonwijzer: true, glassdoor: false, linkedin: false },
  { feature: "Anoniem bijdragen (geen account nodig)", sr: true, loonwijzer: true, glassdoor: false, linkedin: false },
  { feature: "Realtime vergelijking op functie + regio + sector", sr: true, loonwijzer: false, glassdoor: false, linkedin: false },
  { feature: "AI onderhandelcoach", sr: true, loonwijzer: false, glassdoor: false, linkedin: false },
  { feature: "Salarisalerts bij nieuwe data", sr: true, loonwijzer: false, glassdoor: false, linkedin: false },
  { feature: "Gratis basisgebruik", sr: true, loonwijzer: true, glassdoor: true, linkedin: false },
  { feature: "Geen verplichte registratie", sr: true, loonwijzer: true, glassdoor: false, linkedin: false },
  { feature: "GDPR-compliant & Nederlandse host", sr: true, loonwijzer: true, glassdoor: false, linkedin: false },
  { feature: "Recruiter dashboard + data export", sr: true, loonwijzer: false, glassdoor: true, linkedin: true },
  { feature: "Nederlandstalig", sr: true, loonwijzer: true, glassdoor: false, linkedin: false },
];

function Check({ val }: { val: boolean }) {
  return val ? (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-green-100 text-green-700 font-bold text-sm">✓</span>
  ) : (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-400 text-sm">—</span>
  );
}

export default function VergelijkingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="text-lg font-bold text-gray-900">
              SalarisRadar<span className="text-indigo-600">.nl</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Salaris checken</Link>
            <Link href="/blog" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Blog</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Prijzen</Link>
          </nav>
          <Link href="/checken" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Gratis checken
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 py-20 text-white text-center">
          <div className="mx-auto max-w-3xl px-4">
            <h1 className="mb-4 text-4xl font-black sm:text-5xl">
              Waarom SalarisRadar?
            </h1>
            <p className="text-xl text-indigo-200">
              De enige salaristool gebouwd specifiek voor de Nederlandse markt — met AI en realtime data.
            </p>
          </div>
        </section>

        {/* Comparison table */}
        <section className="py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-3xl font-black text-gray-900">
              Functievergelijking
            </h2>

            <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="p-4 text-left text-sm font-semibold text-gray-700 min-w-[220px]">Feature</th>
                    <th className="p-4 text-center">
                      <div className="inline-flex flex-col items-center">
                        <span className="rounded-lg bg-indigo-600 px-2 py-0.5 text-xs font-black text-white mb-1">SR</span>
                        <span className="text-sm font-bold text-indigo-700">SalarisRadar</span>
                      </div>
                    </th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-500">Loonwijzer</th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-500">Glassdoor</th>
                    <th className="p-4 text-center text-sm font-semibold text-gray-500">LinkedIn</th>
                  </tr>
                </thead>
                <tbody>
                  {vergelijking.map((row, i) => (
                    <tr
                      key={row.feature}
                      className={`border-b border-gray-50 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}`}
                    >
                      <td className="p-4 text-sm text-gray-700">{row.feature}</td>
                      <td className="p-4 text-center"><Check val={row.sr} /></td>
                      <td className="p-4 text-center"><Check val={row.loonwijzer} /></td>
                      <td className="p-4 text-center"><Check val={row.glassdoor} /></td>
                      <td className="p-4 text-center"><Check val={row.linkedin} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Why us — cards */}
        <section className="bg-gray-50 py-16">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-3xl font-black text-gray-900">
              Onze voordelen uitgelegd
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: "🇳🇱",
                  titel: "100% Nederlands",
                  tekst: "Alle data afkomstig van Nederlandse professionals. Geen Amerikaanse of Europese gemiddelden die je misleiden. Cao-salarissen per sector inbegrepen.",
                },
                {
                  icon: "🤖",
                  titel: "AI Onderhandelcoach",
                  tekst: "Als enige platform genereren wij op maat gemaakte onderhandelscripts. Voer je functie, sector en gewenst salaris in — en krijg een kant-en-klaar gesprekscript.",
                },
                {
                  icon: "🔒",
                  titel: "Volledig anoniem",
                  tekst: "Geen verplicht account om je salaris bij te dragen of te vergelijken. Wij slaan nooit persoonsgegevens op bij salarisbijdragen. GDPR-compliant, gehost in Nederland.",
                },
                {
                  icon: "📊",
                  titel: "Diepgaande filters",
                  tekst: "Vergelijk op exacte combinatie van sector, functie, regio, ervaringsjaren, opleidingsniveau en bedrijfsgrootte. Niet slechts één filter tegelijk.",
                },
                {
                  icon: "🔔",
                  titel: "Salarisalerts",
                  tekst: "Ontvang een melding zodra het marktgemiddelde in jouw sector verandert. Zo weet je altijd wanneer het tijd is voor een gesprek met je werkgever.",
                },
                {
                  icon: "💼",
                  titel: "Recruiter tools",
                  tekst: "Recruiters en HR-professionals krijgen toegang tot het volledige dataset met export, API en maandelijkse marktrapportages per sector.",
                },
              ].map((card) => (
                <div key={card.titel} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-3 text-3xl">{card.icon}</div>
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{card.titel}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.tekst}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 text-center">
          <div className="mx-auto max-w-xl px-4">
            <h2 className="mb-4 text-3xl font-black text-gray-900">
              Overtuigd? Probeer het gratis.
            </h2>
            <p className="mb-8 text-gray-500">
              Geen account nodig voor jouw eerste salarisscheck. Gratis, anoniem, in 2 minuten klaar.
            </p>
            <Link
              href="/checken"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-bold text-white hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
            >
              Salaris gratis checken →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8">
        <div className="mx-auto max-w-5xl px-4 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} SalarisRadar.nl —{" "}
          <Link href="/" className="hover:text-indigo-600">Home</Link>
          {" · "}
          <Link href="/prijzen" className="hover:text-indigo-600">Prijzen</Link>
          {" · "}
          <Link href="/blog" className="hover:text-indigo-600">Blog</Link>
        </div>
      </footer>
    </div>
  );
}
