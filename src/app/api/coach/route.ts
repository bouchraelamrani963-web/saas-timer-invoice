import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { huidigSalaris, gewenstSalaris, functie, sector, argumenten } = body;

    if (!huidigSalaris || !gewenstSalaris || !functie || !sector) {
      return Response.json({ error: "Vul alle verplichte velden in" }, { status: 400 });
    }

    const huidig = Number(huidigSalaris);
    const gewenst = Number(gewenstSalaris);
    const verschil = gewenst - huidig;
    const percentage = Math.round((verschil / huidig) * 100);

    if (verschil <= 0) {
      return Response.json({ error: "Gewenst salaris moet hoger zijn dan huidig salaris" }, { status: 400 });
    }

    const script = generateScript({ huidig, gewenst, verschil, percentage, functie, sector, argumenten });

    return Response.json({ script });
  } catch (error) {
    console.error("Coach error:", error);
    return Response.json({ error: "Er is een fout opgetreden" }, { status: 500 });
  }
}

function generateScript({
  huidig,
  gewenst,
  verschil,
  percentage,
  functie,
  sector,
  argumenten,
}: {
  huidig: number;
  gewenst: number;
  verschil: number;
  percentage: number;
  functie: string;
  sector: string;
  argumenten?: string;
}) {
  const formatEuro = (n: number) =>
    new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const huidigStr = formatEuro(huidig);
  const gewenstStr = formatEuro(gewenst);
  const verschilStr = formatEuro(verschil);

  return `SALARISONDERHANDELINGSGIDS — ${functie.toUpperCase()}
${"=".repeat(60)}

JOUW SITUATIE
─────────────
Huidig salaris:   ${huidigStr}
Gewenst salaris:  ${gewenstStr}
Verhoging:        ${verschilStr} (+${percentage}%)
Sector:           ${sector}

${"─".repeat(60)}

STAP 1: DE OPENING
──────────────────
Begin het gesprek positief en professioneel. Vraag zelf om het gesprek — wacht niet tot je werkgever het initiatief neemt.

Voorbeeldtekst voor e-mail of gesprek:

"Beste [naam manager],

Ik waardeer de samenwerking enorm en ben trots op wat we samen hebben bereikt.
Ik zou graag een gesprek inplannen om mijn ontwikkeling en beloning te bespreken.
Zou volgende week passen?

Met vriendelijke groet,
[Jouw naam]"

${"─".repeat(60)}

STAP 2: HET HOOFDARGUMENT
──────────────────────────
Onderbouw jouw verzoek met feiten. Presenteer dit rustig en zelfverzekerd.

"Ik wil graag mijn salaris bespreken. Op basis van marktonderzoek —
waaronder data van CheckMijnLoon.nl — zie ik dat ${functie}s in de
${sector}-sector momenteel gemiddeld ${gewenstStr} verdienen.
Mijn huidige salaris van ${huidigStr} ligt ${percentage}% onder dit marktgemiddelde.

Gezien mijn bijdragen aan het team en mijn groeiende verantwoordelijkheden,
verzoek ik om mijn salaris aan te passen naar ${gewenstStr}."
${
  argumenten
    ? `
JOUW SPECIFIEKE ARGUMENTEN
───────────────────────────
Gebruik deze punten die je zelf hebt aangedragen:

"${argumenten}

Dit toont aan dat ik structureel meer waarde lever dan waarvoor ik
momenteel word beloond."
`
    : ""
}
${"─".repeat(60)}

STAP 3: OMGAAN MET WEERSTAND
──────────────────────────────

Als ze zeggen: "We hebben nu geen budget"
→ "Ik begrijp dat timing soms lastig is. Kunnen we dan afspreken dat
   we dit in [specifieke maand] opnieuw bespreken, met een schriftelijke
   bevestiging van die afspraak?"

Als ze zeggen: "Je salaris is al marktconform"
→ "Ik heb ook zelf marktonderzoek gedaan via CheckMijnLoon.nl, en die
   data laat een ander beeld zien. Mogen we onze bronnen vergelijken?"

Als ze zeggen: "We moeten dit intern bespreken"
→ "Zeker, ik begrijp dat. Wanneer kan ik een terugkoppeling verwachten?
   Ik zou graag binnen twee weken uitsluitsel hebben."

${"─".repeat(60)}

STAP 4: DE AFSLUITING
──────────────────────
Sluit altijd positief af, ongeacht de uitkomst.

Als het JA is:
"Fantastisch, ik ben blij dat we dit hebben kunnen bespreken.
Kun je de aanpassing schriftelijk bevestigen?"

Als het NEE of MISSCHIEN is:
"Ik waardeer jouw eerlijkheid. Ik zou graag samen een concreet plan maken
met duidelijke mijlpalen, zodat ik weet wat ik moet bereiken om dit
salaris te rechtvaardigen. Kunnen we dat vastleggen?"

${"─".repeat(60)}

TIPS VOOR SUCCES
────────────────
✓  Plan het gesprek op een rustig moment, niet vlak voor een deadline
✓  Bereid 3 concrete voorbeelden voor van jouw toegevoegde waarde
✓  Noem een specifiek getal — niet een range
✓  Oefen het gesprek hardop, bijv. met een vriend of voor de spiegel
✓  Stuur na het gesprek altijd een korte e-mail ter bevestiging
✓  Wees bereid om te wachten — gemiddeld duurt het 2-4 weken

Succes met jouw onderhandeling! Je verdient dit. 💪
`;
}
