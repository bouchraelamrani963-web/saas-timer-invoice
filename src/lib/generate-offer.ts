import type { OfferteFormData, GeneratedOffer, OfferteRegel } from "./types";

function generateOfferteNummer(): string {
  const year = new Date().getFullYear();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `OFF-${year}-${random}`;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });
}

function parseAmount(str?: string): number {
  if (!str) return 0;
  return parseFloat(str.replace(",", ".").replace(/[^0-9.]/g, "")) || 0;
}

const PROJECT_TYPES: Record<string, { label: string; regels: (data: OfferteFormData) => OfferteRegel[] }> = {
  schilderwerk: {
    label: "Schilderwerk",
    regels: (data) => {
      const opp = parseFloat(data.oppervlakte || "50");
      const regels: OfferteRegel[] = [
        { omschrijving: "Voorbehandeling en schuren", hoeveelheid: opp, eenheid: "m²", prijs: 4.5, totaal: opp * 4.5 },
        { omschrijving: "Grondverf aanbrengen", hoeveelheid: opp, eenheid: "m²", prijs: 3.5, totaal: opp * 3.5 },
        { omschrijving: "Aflakken (2 lagen)", hoeveelheid: opp, eenheid: "m²", prijs: 8, totaal: opp * 8 },
        { omschrijving: "Materialen en verf", hoeveelheid: 1, eenheid: "set", prijs: opp * 2.5, totaal: opp * 2.5 },
        { omschrijving: "Opbouw en afbouw steiger / afdekken", hoeveelheid: 1, eenheid: "dag", prijs: 150, totaal: 150 },
      ];
      return overrideWithUserAmounts(regels, data);
    },
  },
  verbouwing: {
    label: "Verbouwing / Renovatie",
    regels: (data) => {
      const regels: OfferteRegel[] = [
        { omschrijving: "Sloopwerkzaamheden", hoeveelheid: 8, eenheid: "uur", prijs: 55, totaal: 440 },
        { omschrijving: "Constructiewerk en opbouw", hoeveelheid: 16, eenheid: "uur", prijs: 65, totaal: 1040 },
        { omschrijving: "Afwerking en stucwerk", hoeveelheid: 8, eenheid: "uur", prijs: 60, totaal: 480 },
        { omschrijving: "Materialen", hoeveelheid: 1, eenheid: "post", prijs: 800, totaal: 800 },
        { omschrijving: "Afvoer bouwafval", hoeveelheid: 1, eenheid: "post", prijs: 180, totaal: 180 },
      ];
      return overrideWithUserAmounts(regels, data);
    },
  },
  loodgieterswerk: {
    label: "Loodgieterswerk / Sanitair",
    regels: (data) => {
      const regels: OfferteRegel[] = [
        { omschrijving: "Inspectie en diagnose", hoeveelheid: 1, eenheid: "uur", prijs: 75, totaal: 75 },
        { omschrijving: "Leidingwerk (koper/PEX)", hoeveelheid: 10, eenheid: "m", prijs: 25, totaal: 250 },
        { omschrijving: "Installatie sanitair", hoeveelheid: 4, eenheid: "uur", prijs: 70, totaal: 280 },
        { omschrijving: "Materialen en aansluitingen", hoeveelheid: 1, eenheid: "post", prijs: 350, totaal: 350 },
      ];
      return overrideWithUserAmounts(regels, data);
    },
  },
  tuin: {
    label: "Tuinaanleg / Bestrating",
    regels: (data) => {
      const opp = parseFloat(data.oppervlakte || "40");
      const regels: OfferteRegel[] = [
        { omschrijving: "Grondwerk en egaliseren", hoeveelheid: opp, eenheid: "m²", prijs: 8, totaal: opp * 8 },
        { omschrijving: "Bestrating leggen", hoeveelheid: opp, eenheid: "m²", prijs: 22, totaal: opp * 22 },
        { omschrijving: "Materialen (tegels/klinkers)", hoeveelheid: opp, eenheid: "m²", prijs: 18, totaal: opp * 18 },
        { omschrijving: "Afvoer puin en grond", hoeveelheid: 1, eenheid: "post", prijs: 200, totaal: 200 },
      ];
      return overrideWithUserAmounts(regels, data);
    },
  },
  dakwerk: {
    label: "Dakwerk",
    regels: (data) => {
      const opp = parseFloat(data.oppervlakte || "60");
      const regels: OfferteRegel[] = [
        { omschrijving: "Verwijderen oude dakbedekking", hoeveelheid: opp, eenheid: "m²", prijs: 6, totaal: opp * 6 },
        { omschrijving: "Nieuwe dakbedekking aanbrengen", hoeveelheid: opp, eenheid: "m²", prijs: 28, totaal: opp * 28 },
        { omschrijving: "Materialen", hoeveelheid: 1, eenheid: "post", prijs: opp * 12, totaal: opp * 12 },
        { omschrijving: "Steigerkosten", hoeveelheid: 3, eenheid: "dag", prijs: 120, totaal: 360 },
      ];
      return overrideWithUserAmounts(regels, data);
    },
  },
  overig: {
    label: "Overig",
    regels: (data) => {
      const arbeids = parseAmount(data.arbeidskosten) || 500;
      const materiaal = parseAmount(data.materiaalkosten) || 200;
      const extra = parseAmount(data.extraKosten) || 0;
      return [
        { omschrijving: "Arbeidskosten", hoeveelheid: 1, eenheid: "post", prijs: arbeids, totaal: arbeids },
        { omschrijving: "Materiaalkosten", hoeveelheid: 1, eenheid: "post", prijs: materiaal, totaal: materiaal },
        ...(extra > 0 ? [{ omschrijving: "Extra kosten", hoeveelheid: 1, eenheid: "post", prijs: extra, totaal: extra }] : []),
      ];
    },
  },
};

function overrideWithUserAmounts(defaultRegels: OfferteRegel[], data: OfferteFormData): OfferteRegel[] {
  const userArbeids = parseAmount(data.arbeidskosten);
  const userMateriaal = parseAmount(data.materiaalkosten);

  if (!userArbeids && !userMateriaal) return defaultRegels;

  const totaalDefault = defaultRegels.reduce((s, r) => s + r.totaal, 0);
  const factor = totaalDefault > 0 ? (userArbeids + userMateriaal) / totaalDefault : 1;
  return defaultRegels.map((r) => ({
    ...r,
    prijs: Math.round(r.prijs * factor * 100) / 100,
    totaal: Math.round(r.totaal * factor * 100) / 100,
  }));
}

const ALGEMENE_VOORWAARDEN = [
  "Prijzen zijn exclusief BTW tenzij anders vermeld.",
  "Meerwerk wordt vooraf schriftelijk overeengekomen.",
  "Betaling binnen de overeengekomen termijn na factuurdatum.",
  "Bij te late betaling is wettelijke rente verschuldigd.",
  "Alle werkzaamheden worden uitgevoerd conform geldende bouw- en veiligheidsnormen.",
  "Garantie op uitgevoerd werk: 2 jaar op arbeidsuren, materiaalgarantie conform fabrikant.",
  "Aansprakelijkheid beperkt tot het factuurbedrag van de betreffende opdracht.",
];

export function generateOffer(data: OfferteFormData): GeneratedOffer {
  const projectConfig = PROJECT_TYPES[data.projectType] || PROJECT_TYPES.overig;
  const regels = projectConfig.regels(data);

  const extraKosten = parseAmount(data.extraKosten);
  if (extraKosten > 0 && data.projectType !== "overig") {
    regels.push({
      omschrijving: "Overige kosten / reiskosten",
      hoeveelheid: 1,
      eenheid: "post",
      prijs: extraKosten,
      totaal: extraKosten,
    });
  }

  const subtotaal = Math.round(regels.reduce((sum, r) => sum + r.totaal, 0) * 100) / 100;
  const btwPct = parseInt(data.btwPercentage);
  const btw = Math.round(subtotaal * (btwPct / 100) * 100) / 100;
  const totaal = Math.round((subtotaal + btw) * 100) / 100;

  const omschrijvingZinnen = [
    `Wij bieden u graag onze offerte aan voor de gevraagde ${projectConfig.label.toLowerCase()}werkzaamheden aan ${data.locatie}.`,
    data.projectOmschrijving
      ? `Specificatie: ${data.projectOmschrijving}.`
      : "",
    `De werkzaamheden worden vakkundig en conform afspraak uitgevoerd.`,
    data.doorlooptijd
      ? `De verwachte doorlooptijd bedraagt ${data.doorlooptijd}.`
      : "",
  ].filter(Boolean).join(" ");

  return {
    offerteNummer: generateOfferteNummer(),
    datum: new Date().toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" }),
    geldigTot: formatDate(data.geldigTot),
    bedrijf: {
      naam: data.bedrijfsnaam,
      contactpersoon: data.contactpersoon,
      telefoon: data.telefoon,
      email: data.email,
      adres: data.adres,
    },
    klant: {
      naam: data.klantNaam,
      adres: data.klantAdres,
      email: data.klantEmail,
    },
    project: {
      type: projectConfig.label,
      omschrijving: data.projectOmschrijving,
      locatie: data.locatie,
      startdatum: formatDate(data.startdatum),
      doorlooptijd: data.doorlooptijd,
    },
    regels,
    subtotaal,
    btw,
    btwPercentage: btwPct,
    totaal,
    betalingstermijn: data.betalingstermijn,
    voorwaarden: ALGEMENE_VOORWAARDEN,
    toelichting: omschrijvingZinnen,
  };
}
