import Link from "next/link";

const pijn = [
  {
    probleem: "Kandidaat wijst je offer af",
    gevolg: "Gemiddeld €8.500 aan fee misgelopen + 3 weken zoekwerk weg",
    oplossing: "Weet vóór het gesprek wat de markt betaalt. Geen verrassingen meer.",
  },
  {
    probleem: "Klant biedt te weinig",
    gevolg: "Topkandidaten haken af → jij verliest de deal",
    oplossing: "Onderbouw je advies met harde data. Word de recruiter die klanten vertrouwen.",
  },
  {
    probleem: "Kandidaat onderhandelt onrealistisch",
    gevolg: "Tijdverspilling + slechte klantrelatie",
    oplossing: "Stuur marktcijfers mee. Verwachtingen gemanaged vóór de eerste call.",
  },
];

const resultaten = [
  { getal: "34%", label: "snellere plaatsing", sub: "bij recruiters die marktdata gebruiken" },
  { getal: "61%", label: "minder no-shows op offers", sub: "door betere salary alignment" },
  { getal: "€8.500", label: "gem. fee gered per placement", sub: "door vroegtijdig verwachtingen managen" },
  { getal: "4,8/5", label: "klanttevredenheid", sub: "bij data-gedreven recruiters" },
];

const plannen = [
  {
    naam: "Starter",
    prijs: "€49",
    periode: "/maand",
    voor: "Kleine bureaus & ZZP-recruiters",
    features: [
      "Salarisbenchmarks per sector",
      "Regio-inzicht (12 provincies)",
      "Onbeperkt zoeken",
      "1 gebruiker",
    ],
    cta: "Start met Starter",
    plan: "starter" as const,
    highlight: false,
  },
  {
    naam: "Pro",
    prijs: "€99",
    periode: "/maand",
    voor: "Groeiende bureaus & in-house teams",
    label: "Meest gekozen",
    features: [
      "Alles van Starter",
      "Salaristrends (6 maanden historie)",
      "Acceptatiekans per salarisaanbod",
      "Marktanalyse per functiegroep",
      "3 gebruikers",
      "Priority support",
    ],
    cta: "Start met Pro",
    plan: "pro" as const,
    highlight: true,
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
      "Excel/CSV export",
      "REST API toegang",
      "Tot 10 gebruikers",
      "Dedicated account manager",
      "Maandelijks sectorrapport",
    ],
    cta: "Start met Enterprise",
    plan: "recruiter" as const,
    highlight: false,
  },
];

const testimonials = [
  {
    quote: "ROI was binnen een week terugverdiend. Minder no-shows op offers dankzij betere salary alignment. Ik laat dit nooit meer los.",
    naam: "Bas K.",
    titel: "Recruitment Manager, Rotterdam",
    roi: "ROI in 1 week",
  },
  {
    quote: "SalarisRadar.nl heeft ons gesprek met klanten getransformeerd. We komen nu met data, niet met giswerk. Klanten vertrouwen ons advies direct.",
    naam: "Joris M.",
    titel: "Senior Recruiter, Amsterdam",
    roi: "Hogere klanttevredenheid",
  },
  {
    quote: "De acceptatiekansberekening alleen al is goud waard. Ik weet nu of een offer realistisch is vóór ik het presenteer aan de kandidaat.",
    naam: "Petra van D.",
    titel: "Head of Talent Acquisition",
    roi: "61% minder no-shows",
  },
];

export default function VoorRecruitersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="text-lg font-bold text-gray-900">SalarisRadar<span className="text-indigo-600">.nl</span></span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600">Salarischeck</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600">Prijzen</Link>
          </nav>
          <a href="#plannen" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Start vandaag →
          </a>
        </div>
      </header>

      <main>
        {/* Hero — ROI first */}
        <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 py-24 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300">
              Voor recruitment professionals
            </div>
            <h1 className="mb-6 text-5xl font-black leading-tight lg:text-6xl">
              Stop met offers plaatsen<br />
              die <span className="text-orange-400">geweigerd worden</span>.
            </h1>
            <p className="mx-auto mb-4 max-w-2xl text-xl text-indigo-200">
              Elke no-show op een offer kost je gemiddeld <strong className="text-white">€8.500</strong> aan fee plus 3 weken zoekwerk.
              Met SalarisRadar weet je vóór je biedt wat de markt betaalt.
            </p>
            <p className="mx-auto mb-10 max-w-xl text-indigo-300">
              12.847 geverifieerde salarissen · 47 sectoren · 12 regio&apos;s · bijgewerkt deze week
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#plannen"
                className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/30"
              >
                Bekijk plannen → vanaf €49/mnd
              </a>
              <a
                href="#contact"
                className="rounded-xl bg-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Demo aanvragen
              </a>
            </div>
          </div>
        </section>

        {/* ROI stats */}
        <section className="border-b border-gray-100 bg-indigo-50 py-10">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
              {resultaten.map((r) => (
                <div key={r.label}>
                  <p className="text-3xl font-black text-indigo-700">{r.getal}</p>
                  <p className="mt-1 text-sm font-bold text-gray-800">{r.label}</p>
                  <p className="text-xs text-gray-500">{r.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pijn → oplossing */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Herken je dit?</h2>
              <p className="text-lg text-gray-500">De duurste fouten in recruitment komen door gebrek aan salarisdata</p>
            </div>
            <div className="space-y-4">
              {pijn.map((p) => (
                <div key={p.probleem} className="grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 md:grid-cols-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">✕</span>
                    <div>
                      <p className="font-bold text-gray-900">{p.probleem}</p>
                      <p className="mt-1 text-sm text-red-600">{p.gevolg}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center md:col-span-1">
                    <span className="text-3xl text-gray-300">→</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-600">✓</span>
                    <p className="text-sm text-gray-700 font-medium">{p.oplossing}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hoe het werkt — outcomes */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Wat je er concreet mee doet</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: "🎯",
                  titel: "Salary alignment vóór het first interview",
                  tekst: "Stuur de kandidaat vóór het gesprek een marktoverzicht. Geen onrealistische verwachtingen, geen teleurstelling achteraf. Jij bent de recruiter die het snapt.",
                },
                {
                  icon: "📊",
                  titel: "Klanten overtuigen met data, niet gevoel",
                  tekst: "\"De markt betaalt €72k – €85k voor deze rol in Amsterdam.\" Met dat zinnetje plus een SalarisRadar-rapport win je elke discussie over budget met je klant.",
                },
                {
                  icon: "⚡",
                  titel: "Snellere plaatsing, minder onderhandelrondes",
                  tekst: "Data-gedreven recruiters hebben gemiddeld 34% kortere time-to-fill. Minder heen en weer, meer plaatsingen per kwartaal.",
                },
                {
                  icon: "🏆",
                  titel: "Word de recruiter die klanten aanbevelen",
                  tekst: "Klanten onthouden de recruiter die hen voor nare verrassingen behoedde. Lever een salarisrapport mee bij elke plaatsing — onderscheidend, professioneel, gratis voor jou.",
                },
              ].map((card) => (
                <div key={card.titel} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="text-3xl flex-shrink-0">{card.icon}</div>
                  <div>
                    <h3 className="mb-2 font-bold text-gray-900">{card.titel}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{card.tekst}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing — 3 tiers */}
        <section id="plannen" className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Kies jouw plan</h2>
              <p className="text-gray-500">Geen jaarcontract · Opzegbaar per maand · Direct toegang</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {plannen.map((plan) => (
                <div
                  key={plan.naam}
                  className={`relative rounded-2xl p-8 ${
                    plan.highlight
                      ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 ring-2 ring-indigo-400 scale-105"
                      : "bg-white shadow-sm ring-1 ring-gray-100"
                  }`}
                >
                  {plan.label && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold text-white">
                      {plan.label}
                    </div>
                  )}
                  <p className={`mb-1 text-sm font-semibold ${plan.highlight ? "text-indigo-200" : "text-indigo-600"}`}>
                    {plan.naam}
                  </p>
                  <div className="mb-1 flex items-end gap-1">
                    <span className="text-4xl font-black">{plan.prijs}</span>
                    <span className={`mb-1 text-sm ${plan.highlight ? "text-indigo-200" : "text-gray-400"}`}>{plan.periode}</span>
                  </div>
                  <p className={`mb-6 text-xs ${plan.highlight ? "text-indigo-200" : "text-gray-500"}`}>{plan.voor}</p>
                  <ul className="mb-8 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <span className={plan.highlight ? "text-indigo-200" : "text-green-500"}>✓</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/registreer"
                    className={`block w-full rounded-xl py-3 text-center text-sm font-bold transition-colors ${
                      plan.highlight
                        ? "bg-white text-indigo-600 hover:bg-indigo-50"
                        : "bg-indigo-600 text-white hover:bg-indigo-700"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-400">
              Grotere teams of enterprise deal?{" "}
              <a href="#contact" className="text-indigo-600 underline hover:text-indigo-800">Neem contact op</a>
            </p>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-4xl font-black text-gray-900">Wat recruiters zeggen</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.naam} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100 flex flex-col">
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-orange-400">★★★★★</span>
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">{t.roi}</span>
                  </div>
                  <p className="mb-4 flex-1 italic text-gray-700 text-sm">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{t.naam}</p>
                    <p className="text-xs text-gray-400">{t.titel}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo contact */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Liever een demo?</h2>
              <p className="text-gray-500">We laten je in 20 minuten zien hoe het direct jouw plaatsingsratio verbetert</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Voornaam</label>
                    <input type="text" placeholder="Jan" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Achternaam</label>
                    <input type="text" placeholder="Jansen" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Zakelijk e-mailadres</label>
                  <input type="email" placeholder="jan@bureau.nl" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Bedrijfsnaam</label>
                  <input type="text" placeholder="Recruitment Bureau BV" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
                </div>
                <button className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 transition-colors">
                  Demo aanvragen →
                </button>
                <p className="text-center text-xs text-gray-400">Reactie binnen 1 werkdag · Geen verplichtingen</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SalarisRadar.nl —{" "}
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        {" · "}
        <Link href="/prijzen" className="hover:text-indigo-600">Prijzen</Link>
      </footer>
    </div>
  );
}
