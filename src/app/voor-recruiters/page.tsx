import Link from "next/link";

const features = [
  {
    icon: "📊",
    title: "12.000+ geverifieerde salarissen",
    desc: "Actuele, geanonimiseerde salarisdata van Nederlandse professionals — gedragen door de community.",
  },
  {
    icon: "🔍",
    title: "Geavanceerde filters",
    desc: "Filter op sector, regio, opleiding, bedrijfsgrootte en ervaringsniveau voor nauwkeurige benchmarks.",
  },
  {
    icon: "📤",
    title: "Data export",
    desc: "Exporteer salarisrapporten als Excel of CSV voor gebruik in je eigen systemen.",
  },
  {
    icon: "🔌",
    title: "API-toegang",
    desc: "Integreer salarisdata direct in je ATS, HRMS of eigen platform via onze REST API.",
  },
  {
    icon: "📈",
    title: "Marktrapportages",
    desc: "Maandelijkse rapporten per sector met trends, groeisalarissen en schaarsteindicatoren.",
  },
  {
    icon: "✅",
    title: "Geverifieerde data",
    desc: "Ons verificatieproces zorgt dat de data betrouwbaar en actueel is — geen outliers die het gemiddelde verstoren.",
  },
];

const useCases = [
  {
    title: "Salarisadvies geven",
    desc: "Baseer je salarisadvies op echte marktdata in plaats van onderbuikgevoel. Wees de recruiter die kandidaten vertrouwen.",
  },
  {
    title: "Verwachtingen managen",
    desc: "Voorkom teleurstelling door al vroeg realistische salarisverwachtingen te scheppen op basis van concrete marktcijfers.",
  },
  {
    title: "Vacatures benchmarken",
    desc: "Controleer of jouw klant een competitief salaris biedt voordat je talent zoekt dat toch afhaakt.",
  },
  {
    title: "Rapporten voor klanten",
    desc: "Lever je klanten een professioneel salarisrapport mee als toegevoegde waarde naast elke plaatsing.",
  },
];

const testimonials = [
  {
    quote: "SalarisRadar.nl heeft ons gesprek met klanten getransformeerd. We komen nu met data, niet met giswerk.",
    naam: "Joris M.",
    titel: "Senior Recruiter, Amsterdam",
  },
  {
    quote: "De API-integratie in ons ATS werkt perfect. Kandidaten zien direct marktconforme ranges bij elke vacature.",
    naam: "Petra van D.",
    titel: "Head of Talent Acquisition",
  },
  {
    quote: "ROI was binnen een week terugverdiend. Minder no-shows op offers dankzij betere salary alignment.",
    naam: "Bas K.",
    titel: "Recruitment Manager, Rotterdam",
  },
];

export default function VoorRecruitersPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="text-lg font-bold text-gray-900">SalarisRadar<span className="text-indigo-600">.nl</span></span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600">Salarischeck</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600">Prijzen</Link>
          </nav>
          <a href="#contact" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Demo aanvragen
          </a>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="bg-gradient-to-br from-indigo-900 to-indigo-700 py-24 text-white">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-orange-500/20 px-4 py-2 text-sm font-semibold text-orange-300">
              Voor recruitment professionals
            </div>
            <h1 className="mb-6 text-5xl font-black lg:text-6xl">
              Toegang tot<br />
              <span className="text-orange-400">12.000+ geverifieerde</span><br />
              salarissen
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-indigo-200">
              De meest actuele salarisdata van Nederland. Gebruik het voor betere salarisadviezen,
              klantgesprekken en talent acquisition.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <a
                href="#contact"
                className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/30"
              >
                Demo aanvragen →
              </a>
              <Link
                href="/prijzen"
                className="rounded-xl bg-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors"
              >
                Bekijk prijzen
              </Link>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-gray-100 bg-indigo-50 py-8">
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid grid-cols-4 gap-6 text-center">
              {[
                { n: "12.000+", l: "Salarissen" },
                { n: "47", l: "Sectoren" },
                { n: "12", l: "Regio's" },
                { n: "98%", l: "Data kwaliteit" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="text-2xl font-black text-indigo-700">{s.n}</p>
                  <p className="text-xs text-gray-600">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Alles wat je nodig hebt</h2>
              <p className="text-lg text-gray-500">Professionele salarisdata tools voor recruitment teams</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((f) => (
                <div key={f.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-3 text-3xl">{f.icon}</div>
                  <h3 className="mb-2 font-bold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use cases */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Hoe recruiters het gebruiken</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {useCases.map((u) => (
                <div key={u.title} className="flex gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                    ✓
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-gray-900">{u.title}</h3>
                    <p className="text-sm text-gray-500">{u.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Recruiter plan</h2>
              <p className="text-gray-500">Volledige toegang voor recruitment teams</p>
            </div>
            <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-800 p-1">
              <div className="rounded-[20px] bg-white p-8">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="mb-1 text-sm font-semibold text-indigo-600">Recruiter plan</p>
                    <p className="text-5xl font-black text-gray-900">€199</p>
                    <p className="text-gray-400">per maand</p>
                  </div>
                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">Meest gekozen</span>
                </div>
                <hr className="my-6 border-gray-100" />
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    "Volledig dashboard",
                    "Onbeperkte zoekopdrachten",
                    "Data export (Excel/CSV)",
                    "REST API toegang",
                    "Maandelijkse sectorrapportages",
                    "Geverifieerde salarisdata",
                    "Tot 5 teamleden",
                    "Priority support",
                    "Onboarding sessie",
                    "Custom rapportages",
                  ].map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="text-green-500">✓</span>
                      {f}
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex gap-4">
                  <a
                    href="#contact"
                    className="flex-1 rounded-xl bg-indigo-600 py-3 text-center font-bold text-white hover:bg-indigo-700 transition-colors"
                  >
                    Demo aanvragen
                  </a>
                  <Link
                    href="/prijzen"
                    className="flex-1 rounded-xl border border-gray-200 py-3 text-center font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Vergelijk plannen
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <h2 className="mb-10 text-center text-4xl font-black text-gray-900">Wat recruiters zeggen</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.naam} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-3 text-orange-400">★★★★★</div>
                  <p className="mb-4 italic text-gray-700 text-sm">&quot;{t.quote}&quot;</p>
                  <p className="font-semibold text-gray-900">{t.naam}</p>
                  <p className="text-xs text-gray-400">{t.titel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact form */}
        <section id="contact" className="py-20">
          <div className="mx-auto max-w-xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Demo aanvragen</h2>
              <p className="text-gray-500">We nemen binnen 1 werkdag contact met je op</p>
            </div>
            <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Voornaam</label>
                    <input
                      type="text"
                      placeholder="Jan"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-semibold text-gray-700">Achternaam</label>
                    <input
                      type="text"
                      placeholder="Jansen"
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Zakelijk e-mailadres</label>
                  <input
                    type="email"
                    placeholder="jan@bedrijf.nl"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Bedrijfsnaam</label>
                  <input
                    type="text"
                    placeholder="Recruitment Bureau BV"
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold text-gray-700">Hoe wil je SalarisRadar gebruiken?</label>
                  <textarea
                    rows={3}
                    placeholder="Bijv. salarisadvies geven aan kandidaten, benchmarken van vacatures..."
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <button className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white hover:bg-indigo-700 transition-colors">
                  Demo aanvragen →
                </button>
                <p className="text-center text-xs text-gray-400">
                  We delen je gegevens nooit met derden
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} SalarisRadar.nl —{" "}
        <Link href="/" className="hover:text-indigo-600">Home</Link>
        {" · "}
        <Link href="/prijzen" className="hover:text-indigo-600">Prijzen</Link>
      </footer>
    </div>
  );
}
