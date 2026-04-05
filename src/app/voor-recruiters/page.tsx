"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// ── Stripe checkout ──────────────────────────────────────────────────────────
async function startCheckout(plan: "starter" | "pro" | "recruiter"): Promise<string | null> {
  const res = await fetch("/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ plan }),
  });
  const data = await res.json();
  if (data.url) { window.location.href = data.url; return null; }
  return data.error ?? "Er ging iets mis.";
}

function CheckoutBtn({ plan, children, featured }: { plan: "starter" | "pro" | "recruiter"; children: React.ReactNode; featured?: boolean }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      disabled={loading}
      onClick={async () => { setLoading(true); await startCheckout(plan); setLoading(false); }}
      style={featured
        ? { background: "#FF4D1C", color: "#fff", border: "none" }
        : { background: "transparent", color: "#FF4D1C", border: "1.5px solid #FF4D1C" }}
      className="w-full rounded-xl py-3 px-6 font-bold text-sm transition-all hover:opacity-80 disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Laden..." : children}
    </button>
  );
}

// ── Fade-in on scroll ────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

const BG = "#0D1117";
const CARD = "#161B22";
const BORDER = "#21262D";
const ORANGE = "#FF4D1C";
const MUTED = "#8B949E";

export default function VoorRecruitersPage() {
  return (
    <div style={{ background: BG, color: "#E6EDF3", fontFamily: "'DM Sans', sans-serif", minHeight: "100vh" }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
        html { scroll-behavior: smooth; }
        .syne { font-family: 'Syne', sans-serif; }
        .dm { font-family: 'DM Sans', sans-serif; }
        .card-hover { transition: border-color 0.2s, transform 0.2s; }
        .card-hover:hover { border-color: ${ORANGE} !important; transform: translateY(-2px); }
        .btn-glow:hover { box-shadow: 0 0 24px rgba(255,77,28,0.4); }
      `}</style>

      {/* ── STICKY NAV ──────────────────────────────────────────────────────── */}
      <header style={{ background: `${BG}E6`, borderBottom: `1px solid ${BORDER}`, backdropFilter: "blur(12px)" }}
        className="sticky top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span style={{ background: ORANGE }} className="rounded-lg px-2 py-1 text-sm font-black text-white">SR</span>
            <span className="syne text-lg font-bold" style={{ color: "#E6EDF3" }}>SalarisRadar<span style={{ color: ORANGE }}>.nl</span></span>
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {["#probleem", "#features", "#prijzen"].map((h, i) => (
              <a key={h} href={h} style={{ color: MUTED, fontSize: 14 }}
                className="hover:text-white transition-colors">
                {["Probleem", "Features", "Prijzen"][i]}
              </a>
            ))}
          </nav>
          <a href="#prijzen"
            style={{ background: ORANGE, color: "#fff" }}
            className="btn-glow rounded-xl px-5 py-2.5 text-sm font-bold transition-all hover:opacity-90">
            Start gratis →
          </a>
        </div>
      </header>

      <main>
        {/* ── HERO ────────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-28 text-center">
          {/* glow blobs */}
          <div style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 700, height: 400, background: `radial-gradient(ellipse, ${ORANGE}22 0%, transparent 70%)`, pointerEvents: "none" }} />

          <div className="relative mx-auto max-w-4xl px-4">
            <FadeIn>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: `${ORANGE}18`, border: `1px solid ${ORANGE}44`, color: ORANGE }}>
                <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: ORANGE }} />
                Real-time salarisdata voor recruiters
              </div>
            </FadeIn>

            <FadeIn delay={100}>
              <h1 className="syne mb-6 font-black leading-none" style={{ fontSize: "clamp(2.4rem, 6vw, 4.2rem)", color: "#E6EDF3" }}>
                Verhoog je plaatsingen<br />
                met <span style={{ color: ORANGE }}>15–25%</span> door het<br />
                juiste salaris te bieden
              </h1>
            </FadeIn>

            <FadeIn delay={200}>
              <p className="mx-auto mb-10 max-w-2xl text-lg" style={{ color: MUTED, lineHeight: 1.7 }}>
                Voorkom dat kandidaten afhaken door verkeerde salarisinschattingen.
                SalarisRadar geeft je real-time inzicht in wat kandidaten écht verwachten.
              </p>
            </FadeIn>

            <FadeIn delay={300}>
              <a href="#prijzen"
                style={{ background: ORANGE, color: "#fff", display: "inline-block" }}
                className="btn-glow rounded-xl px-8 py-4 text-lg font-bold transition-all hover:opacity-90">
                Start met betere salarissen →
              </a>
            </FadeIn>
          </div>
        </section>

        {/* ── STATS ROW ───────────────────────────────────────────────────────── */}
        <section className="py-12">
          <div className="mx-auto max-w-5xl px-4">
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { getal: "15–25%", label: "Meer plaatsingen", sub: "bij recruiters die marktdata gebruiken" },
                { getal: "€3k–€10k", label: "Kosten per gemiste hire", sub: "verloren fee + zoektijd" },
                { getal: "12.847+", label: "Profielen in de database", sub: "bijgewerkt april 2026" },
              ].map((s, i) => (
                <FadeIn key={s.label} delay={i * 100}>
                  <div className="card-hover rounded-2xl p-6 text-center"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <p className="syne mb-1 font-black" style={{ fontSize: "2.2rem", color: ORANGE }}>{s.getal}</p>
                    <p className="font-bold text-white">{s.label}</p>
                    <p className="mt-1 text-sm" style={{ color: MUTED }}>{s.sub}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROBLEEM ────────────────────────────────────────────────────────── */}
        <section id="probleem" className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="syne mb-4 font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#E6EDF3" }}>
                  Je verliest kandidaten<br />zonder dat je het doorhebt
                </h2>
                <p style={{ color: MUTED }}>Salarisinschattingen die niet kloppen kosten je meer dan je denkt</p>
              </div>
            </FadeIn>

            <div className="grid gap-4 md:grid-cols-3">
              {[
                { icon: "👻", titel: "Kandidaten haken af", tekst: "Ze ontvangen je offer en reageren niet meer. Geen uitleg, gewoon weg. Te laag salaris was de reden — maar je weet het nooit." },
                { icon: "📭", titel: "Aanbod gedaan, geen reactie", tekst: "Je hebt weken geïnvesteerd. De kandidaat was enthousiast. Dan het aanbod — stilte. Concurrent bood €5k meer." },
                { icon: "💸", titel: "Te veel betalen, marge weg", tekst: "Uit angst voor afwijzing bied je te hoog. De fee is veilig maar je klant is ontevreden. Zonder data gok je altijd." },
              ].map((p, i) => (
                <FadeIn key={p.titel} delay={i * 120}>
                  <div className="card-hover rounded-2xl p-6 h-full"
                    style={{ background: CARD, border: `1px solid #F8514922` }}>
                    <div className="mb-4 text-3xl">{p.icon}</div>
                    <h3 className="syne mb-2 font-bold text-white" style={{ fontSize: "1.1rem" }}>{p.titel}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{p.tekst}</p>
                  </div>
                </FadeIn>
              ))}
            </div>

            {/* Alert bar */}
            <FadeIn delay={400}>
              <div className="mt-8 rounded-2xl px-6 py-4 text-center font-semibold"
                style={{ background: `${ORANGE}15`, border: `1px solid ${ORANGE}44`, color: ORANGE }}>
                ⚠️ Één gemiste hire kost je gemiddeld <strong>€3.000 – €10.000</strong> aan verloren fee en zoektijd
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── OPLOSSING ───────────────────────────────────────────────────────── */}
        <section className="py-20" style={{ background: CARD }}>
          <div className="mx-auto max-w-4xl px-4 text-center">
            <FadeIn>
              <h2 className="syne mb-4 font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#E6EDF3" }}>
                Stop met gokken.<br /><span style={{ color: ORANGE }}>Werk met data.</span>
              </h2>
              <p className="mb-12 text-lg" style={{ color: MUTED }}>
                SalarisRadar toont je precies wat je nodig hebt om het juiste aanbod te doen
              </p>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { n: "01", titel: "Wat kandidaten verdienen", tekst: "Exacte salarissen per functie, sector, regio en ervaringsniveau — van echte Nederlandse professionals." },
                { n: "02", titel: "Wat de markt verwacht", tekst: "Zie of salarissen stijgen of dalen in jouw sector. Pas je advies aan voordat kandidaten afhaken." },
                { n: "03", titel: "Welk salaris zorgt voor acceptatie", tekst: "Onze acceptatiekans-indicator vertelt je of je bod realistisch is vóór je het presenteert." },
              ].map((s, i) => (
                <FadeIn key={s.n} delay={i * 100}>
                  <div className="rounded-2xl p-6 text-left"
                    style={{ background: BG, border: `1px solid ${BORDER}` }}>
                    <p className="syne mb-3 font-black" style={{ fontSize: "2rem", color: `${ORANGE}55` }}>{s.n}</p>
                    <h3 className="syne mb-2 font-bold text-white">{s.titel}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{s.tekst}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURES ────────────────────────────────────────────────────────── */}
        <section id="features" className="py-20">
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="syne mb-4 font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#E6EDF3" }}>
                  Alles wat je nodig hebt
                </h2>
                <p style={{ color: MUTED }}>Gebouwd voor recruitment professionals die sneller willen plaatsen</p>
              </div>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                { icon: "🎯", titel: "Salaris per functie, regio & ervaring", tekst: "Filter op exacte combinatie. Geen nationale gemiddelden die nergens op slaan — Nederlandse marktdata, verdeeld per provincie en ervaringsniveau." },
                { icon: "📈", titel: "Markttrend: stijgend of dalend", tekst: "Zie in één oogopslag of salarissen in jouw sector omhoog of omlaag bewegen. Altijd een stap voor op je concurrenten." },
                { icon: "⚖️", titel: "Onder/over markt indicator", tekst: "Direct zien of een vacature-salaris competitief is. Adviseer je klant nog vóór je begint met zoeken." },
                { icon: "✅", titel: "Acceptatiekans op basis van salaris", tekst: "Exclusieve berekening: hoe groot is de kans dat een kandidaat dit aanbod accepteert? Stuur bij voordat het te laat is." },
              ].map((f, i) => (
                <FadeIn key={f.titel} delay={i * 80}>
                  <div className="card-hover flex gap-4 rounded-2xl p-6 h-full"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <div className="text-3xl flex-shrink-0">{f.icon}</div>
                    <div>
                      <h3 className="syne mb-2 font-bold text-white">{f.titel}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{f.tekst}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── UNIEKE WAARDE ───────────────────────────────────────────────────── */}
        <section className="py-20" style={{ background: CARD }}>
          <div className="mx-auto max-w-3xl px-4 text-center">
            <FadeIn>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold"
                style={{ background: `${ORANGE}18`, border: `1px solid ${ORANGE}44`, color: ORANGE }}>
                🔒 Anonieme echte data
              </div>
              <h2 className="syne mb-6 font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", color: "#E6EDF3" }}>
                Gebaseerd op echte gebruikersdata
              </h2>
              <p className="mb-6 text-lg leading-relaxed" style={{ color: MUTED }}>
                Onze database is opgebouwd uit anonieme bijdragen van Nederlandse professionals.
                Geen internationale benchmarks die niet kloppen voor de Nederlandse markt.
                Geen verouderde cao-tabellen. Echte salarissen, van echte mensen, in jouw sector.
              </p>
              <div className="rounded-2xl px-6 py-4 inline-block"
                style={{ background: `${ORANGE}10`, border: `1px solid ${ORANGE}33` }}>
                <p className="font-semibold" style={{ color: ORANGE }}>
                  Gebaseerd op <strong>12.847+</strong> profielen — data bijgewerkt april 2026
                </p>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── RESULTAAT ───────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4">
            <FadeIn>
              <h2 className="syne mb-12 text-center font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#E6EDF3" }}>
                Wat je ermee bereikt
              </h2>
            </FadeIn>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Meer kandidaten accepteren je aanbod — minder no-shows op offers",
                "Snellere plaatsingen door minder onderhandelrondes",
                "Betere onderhandelpositie bij je klanten met harde data",
                "Minder gemiste hires door realistische salarisverwachtingen",
              ].map((r, i) => (
                <FadeIn key={r} delay={i * 80}>
                  <div className="card-hover flex items-start gap-3 rounded-2xl p-5"
                    style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
                      style={{ background: `${ORANGE}20`, color: ORANGE }}>✓</span>
                    <p className="text-sm leading-relaxed" style={{ color: "#C9D1D9" }}>{r}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING ─────────────────────────────────────────────────────────── */}
        <section id="prijzen" className="py-20" style={{ background: CARD }}>
          <div className="mx-auto max-w-5xl px-4">
            <FadeIn>
              <div className="mb-12 text-center">
                <h2 className="syne mb-4 font-black" style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#E6EDF3" }}>
                  Kies jouw plan
                </h2>
                <p style={{ color: MUTED }}>Geen jaarcontract · Opzegbaar per maand · Direct toegang</p>
              </div>
            </FadeIn>
            <div className="grid gap-6 md:grid-cols-3 items-start">
              {[
                {
                  naam: "Starter", prijs: "€49", plan: "starter" as const, featured: false,
                  voor: "Kleine bureaus & ZZP-recruiters",
                  features: ["Salarisbenchmarks per sector", "Regio-inzicht (12 provincies)", "Onbeperkt zoeken", "Salarisalert", "1 gebruiker"],
                },
                {
                  naam: "Pro", prijs: "€99", plan: "pro" as const, featured: true,
                  voor: "Groeiende bureaus & in-house HR",
                  features: ["Alles van Starter", "Salaristrends (6 mnd)", "Acceptatiekans per aanbod", "Marktanalyse per functiegroep", "3 gebruikers", "Priority support"],
                },
                {
                  naam: "Enterprise", prijs: "€199", plan: "recruiter" as const, featured: false,
                  voor: "Grote bureaus & corporate HR",
                  features: ["Alles van Pro", "Volledige database", "Hiring advies per vacature", "CSV & Excel export", "API toegang", "10 gebruikers", "Account manager"],
                },
              ].map((plan, i) => (
                <FadeIn key={plan.naam} delay={i * 100}>
                  <div className="relative rounded-2xl p-8"
                    style={{
                      background: plan.featured ? `linear-gradient(135deg, #161B22, #1C2128)` : BG,
                      border: plan.featured ? `2px solid ${ORANGE}` : `1px solid ${BORDER}`,
                      marginTop: plan.featured ? -8 : 0,
                    }}>
                    {plan.featured && (
                      <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-bold text-white whitespace-nowrap"
                        style={{ background: ORANGE }}>
                        ⭐ Meest gekozen
                      </div>
                    )}
                    <p className="syne mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: plan.featured ? ORANGE : MUTED }}>
                      {plan.naam}
                    </p>
                    <div className="mb-1 flex items-end gap-1">
                      <span className="syne font-black text-white" style={{ fontSize: "3rem" }}>{plan.prijs}</span>
                      <span className="mb-2 text-sm" style={{ color: MUTED }}>/maand</span>
                    </div>
                    <p className="mb-6 text-xs" style={{ color: MUTED }}>{plan.voor}</p>
                    <ul className="mb-8 space-y-2">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm" style={{ color: "#C9D1D9" }}>
                          <span style={{ color: ORANGE }} className="mt-0.5 flex-shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <CheckoutBtn plan={plan.plan} featured={plan.featured}>
                      Start met {plan.naam} →
                    </CheckoutBtn>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOCIAL PROOF ────────────────────────────────────────────────────── */}
        <section className="py-20">
          <div className="mx-auto max-w-3xl px-4">
            <FadeIn>
              <div className="rounded-2xl p-8 text-center"
                style={{ background: CARD, border: `1px solid ${BORDER}` }}>
                <div className="mb-6 text-4xl">&ldquo;</div>
                <p className="mb-6 text-xl leading-relaxed" style={{ color: "#C9D1D9" }}>
                  Sinds we SalarisRadar gebruiken, accepteren kandidaten sneller ons aanbod.
                  We verspillen geen tijd meer aan aanbiedingen die toch worden afgewezen.
                  Gewoon data gebruiken en plaatsen.
                </p>
                <div>
                  <p className="font-bold text-white">Marleen V.</p>
                  <p className="text-sm" style={{ color: MUTED }}>Senior Recruiter · Amsterdam</p>
                </div>
                <div className="mt-4" style={{ color: ORANGE }}>★★★★★</div>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FINAL CTA ───────────────────────────────────────────────────────── */}
        <section className="py-24 text-center" style={{ background: CARD }}>
          <div className="mx-auto max-w-2xl px-4">
            <FadeIn>
              <h2 className="syne mb-6 font-black" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#E6EDF3" }}>
                Stop met gokken.<br />
                <span style={{ color: ORANGE }}>Start met plaatsen.</span>
              </h2>
              <p className="mb-8 text-lg" style={{ color: MUTED }}>
                Elke dag zonder data is een dag dat je kandidaten verliest aan concurrenten die wél weten wat de markt betaalt.
              </p>
              <a href="#prijzen"
                style={{ background: ORANGE, color: "#fff", display: "inline-block" }}
                className="btn-glow rounded-xl px-10 py-4 text-lg font-bold transition-all hover:opacity-90">
                Probeer SalarisRadar vandaag →
              </a>
              <p className="mt-4 text-sm" style={{ color: MUTED }}>
                Data bijgewerkt april 2026 · Geen jaarcontract · Direct toegang
              </p>
            </FadeIn>
          </div>
        </section>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer style={{ borderTop: `1px solid ${BORDER}` }} className="py-8 text-center text-sm">
        <p style={{ color: MUTED }}>
          © {new Date().getFullYear()} SalarisRadar.nl ·{" "}
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          {" · "}
          <Link href="/prijzen" className="hover:text-white transition-colors">Prijzen</Link>
          {" · "}
          <Link href="/checken" className="hover:text-white transition-colors">Salaris checken</Link>
        </p>
      </footer>
    </div>
  );
}
