import Link from "next/link";

const demoData = [
  { functie: "Software Engineer", sector: "IT", regio: "Noord-Holland", gemiddeld: "€82.500", range: "€65k – €105k" },
  { functie: "Marketing Manager", sector: "Marketing", regio: "Noord-Holland", gemiddeld: "€72.000", range: "€52k – €95k" },
  { functie: "Financieel Analist", sector: "Finance", regio: "Amsterdam", gemiddeld: "€67.500", range: "€55k – €85k" },
  { functie: "HR Business Partner", sector: "HR", regio: "Utrecht", gemiddeld: "€75.000", range: "€58k – €92k" },
  { functie: "Account Manager", sector: "Sales", regio: "Noord-Brabant", gemiddeld: "€65.000", range: "€48k – €85k" },
];

const testimonials = [
  {
    quote: "Dankzij SalarisCheck wist ik dat ik €15.000 onder marktwaarde verdiende. Na het gesprek met mijn werkgever zit ik nu op het marktgemiddelde.",
    naam: "Sanne V., UX Designer",
    sector: "IT",
  },
  {
    quote: "Eindelijk inzicht in wat collega's verdienen zonder ongemakkelijke gesprekken. De onderhandelcoach was super handig voor mijn jaargesprek.",
    naam: "Mark de B., Financieel Analist",
    sector: "Finance",
  },
  {
    quote: "Als recruiter gebruik ik SalarisCheck om realistische verwachtingen te scheppen bij kandidaten. Onmisbaar tool geworden.",
    naam: "Lisa K., Senior Recruiter",
    sector: "HR",
  },
];

const steps = [
  { n: "1", title: "Vul jouw salaris in", desc: "Anoniem en veilig. Geen account nodig. Duurt minder dan 2 minuten." },
  { n: "2", title: "Vergelijk met de markt", desc: "Zie direct hoe jouw salaris zich verhoudt tot vergelijkbare functies." },
  { n: "3", title: "Onderhandel met vertrouwen", desc: "Gebruik onze coach om je argument voor te bereiden." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="rounded-lg bg-indigo-600 px-2 py-1 text-sm font-black text-white">SC</span>
            <span className="text-lg font-bold text-gray-900">SalarisCheck<span className="text-indigo-600">.nl</span></span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link href="/checken" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Salaris checken</Link>
            <Link href="/invullen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Bijdragen</Link>
            <Link href="/onderhandelen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Onderhandelen</Link>
            <Link href="/voor-recruiters" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Voor recruiters</Link>
            <Link href="/prijzen" className="text-sm text-gray-600 hover:text-indigo-600 transition-colors">Prijzen</Link>
          </nav>
          <Link href="/checken" className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
            Gratis checken
          </Link>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-800 to-orange-600 py-24 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-orange-400 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-indigo-400 blur-3xl" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-orange-400 animate-pulse" />
              Anoniem &amp; veilig — GDPR-compliant
            </div>
            <h1 className="mb-6 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              Weet wat je<br />
              <span className="text-orange-400">waard bent</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-xl text-indigo-100">
              Vergelijk jouw salaris met duizenden Nederlandse professionals.
              Volledig anoniem, gratis en zonder gedoe.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/checken"
                className="rounded-xl bg-orange-500 px-8 py-4 text-lg font-bold text-white hover:bg-orange-400 transition-colors shadow-lg shadow-orange-500/30"
              >
                Controleer mijn salaris →
              </Link>
              <Link
                href="/invullen"
                className="rounded-xl bg-white/10 px-8 py-4 text-lg font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur"
              >
                Salaris toevoegen
              </Link>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <section className="border-b border-gray-100 bg-indigo-50 py-8">
          <div className="mx-auto max-w-4xl px-4">
            <div className="grid grid-cols-3 gap-6 text-center">
              {[
                { getal: "12.847", label: "Salarissen in database" },
                { getal: "47", label: "Sectoren gedekt" },
                { getal: "100%", label: "Anoniem & veilig" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-black text-indigo-700">{s.getal}</p>
                  <p className="mt-1 text-sm text-gray-600">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Hoe werkt het?</h2>
              <p className="text-lg text-gray-500">In drie stappen weet je wat je waard bent op de markt</p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((s) => (
                <div key={s.n} className="relative rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-xl font-black text-white">
                    {s.n}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900">{s.title}</h3>
                  <p className="text-gray-500">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo data preview */}
        <section className="bg-gray-50 py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-10 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Salaris inzicht</h2>
              <p className="text-lg text-gray-500">Live data uit onze database — volledig geanonimiseerd</p>
            </div>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
              <div className="hidden grid-cols-4 gap-4 border-b border-gray-100 bg-gray-50 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-gray-500 md:grid">
                <span>Functie</span>
                <span>Sector / Regio</span>
                <span>Gemiddeld salaris</span>
                <span>Bandbreedte</span>
              </div>
              {demoData.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 gap-2 border-b border-gray-50 px-6 py-4 last:border-0 hover:bg-indigo-50/30 transition-colors md:grid-cols-4 md:gap-4"
                >
                  <span className="font-semibold text-gray-900">{row.functie}</span>
                  <span className="text-sm text-gray-500">{row.sector} · {row.regio}</span>
                  <span className="font-bold text-indigo-700">{row.gemiddeld}</span>
                  <span className="text-sm text-gray-400">{row.range}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/checken"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700 transition-colors"
              >
                Jouw salaris vergelijken →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA submit */}
        <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h2 className="mb-4 text-4xl font-black">Help de community groeien</h2>
            <p className="mb-8 text-xl text-orange-100">
              Door jouw salaris te delen, help je anderen eerlijk betaald te krijgen.
              Volledig anoniem, veilig en in 2 minuten klaar.
            </p>
            <Link
              href="/invullen"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-4 text-lg font-bold text-orange-600 hover:bg-orange-50 transition-colors shadow-lg"
            >
              Mijn salaris toevoegen →
            </Link>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black text-gray-900">Wat gebruikers zeggen</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {testimonials.map((t) => (
                <div key={t.naam} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                  <div className="mb-4 text-orange-400">
                    {"★★★★★"}
                  </div>
                  <p className="mb-4 text-gray-700 italic">&quot;{t.quote}&quot;</p>
                  <div>
                    <p className="font-semibold text-gray-900">{t.naam}</p>
                    <p className="text-sm text-gray-400">{t.sector}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing preview */}
        <section id="prijzen" className="bg-indigo-950 py-20 text-white">
          <div className="mx-auto max-w-5xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-3 text-4xl font-black">Eenvoudige prijzen</h2>
              <p className="text-indigo-300">Start gratis, upgrade wanneer je meer wilt</p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  naam: "Gratis",
                  prijs: "€0",
                  periode: "voor altijd",
                  features: ["Salaris toevoegen", "3 zoekopdrachten/maand", "Basis salarischeck"],
                  cta: "Gratis starten",
                  href: "/invullen",
                  highlight: false,
                },
                {
                  naam: "Pro",
                  prijs: "€9",
                  periode: "per maand",
                  features: ["Onbeperkt zoeken", "AI onderhandelcoach", "Salarisalert", "Gedetailleerde statistieken"],
                  cta: "Pro proberen",
                  href: "/prijzen",
                  highlight: true,
                },
                {
                  naam: "Recruiter",
                  prijs: "€199",
                  periode: "per maand",
                  features: ["Volledig dashboard", "Data export", "API toegang", "12.000+ geverifieerde salarissen"],
                  cta: "Contact opnemen",
                  href: "/voor-recruiters",
                  highlight: false,
                },
              ].map((plan) => (
                <div
                  key={plan.naam}
                  className={`rounded-2xl p-6 ${plan.highlight ? "bg-indigo-600 ring-2 ring-orange-400" : "bg-white/10"}`}
                >
                  <p className="mb-1 text-sm font-semibold text-indigo-200">{plan.naam}</p>
                  <p className="mb-1 text-4xl font-black">{plan.prijs}</p>
                  <p className="mb-6 text-sm text-indigo-300">{plan.periode}</p>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span className="text-orange-400">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.href}
                    className={`block w-full rounded-xl py-2 text-center text-sm font-bold transition-colors ${
                      plan.highlight
                        ? "bg-white text-indigo-700 hover:bg-indigo-50"
                        : "bg-indigo-600/50 text-white hover:bg-indigo-600"
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-indigo-400">
              <Link href="/prijzen" className="underline hover:text-white">Bekijk alle features →</Link>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-white py-10">
        <div className="mx-auto max-w-5xl px-4">
          <div className="mb-8 grid grid-cols-2 gap-8 md:grid-cols-4">
            <div>
              <p className="mb-3 font-bold text-gray-900">SalarisCheck.nl</p>
              <p className="text-sm text-gray-500">Salaristransparantie voor iedereen in Nederland.</p>
            </div>
            <div>
              <p className="mb-3 font-semibold text-gray-700">Platform</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/checken" className="hover:text-indigo-600">Salaris checken</Link></li>
                <li><Link href="/invullen" className="hover:text-indigo-600">Salaris toevoegen</Link></li>
                <li><Link href="/onderhandelen" className="hover:text-indigo-600">Onderhandelen</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-gray-700">Bedrijven</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/voor-recruiters" className="hover:text-indigo-600">Voor recruiters</Link></li>
                <li><Link href="/prijzen" className="hover:text-indigo-600">Prijzen</Link></li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-semibold text-gray-700">Juridisch</p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><span className="cursor-default">Privacybeleid</span></li>
                <li><span className="cursor-default">Algemene voorwaarden</span></li>
                <li><span className="cursor-default">GDPR</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-6 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} SalarisCheck.nl — Gebouwd voor Nederland
          </div>
        </div>
      </footer>
    </div>
  );
}
