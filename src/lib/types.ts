export interface OfferteFormData {
  // Bedrijfsinfo
  bedrijfsnaam: string;
  contactpersoon: string;
  telefoon: string;
  email: string;
  adres: string;

  // Klantinfo
  klantNaam: string;
  klantAdres: string;
  klantEmail: string;

  // Projectinfo
  projectType: string;
  projectOmschrijving: string;
  werkzaamheden: string[];
  oppervlakte?: string;
  locatie: string;
  startdatum: string;
  doorlooptijd: string;

  // Financieel
  materiaalkosten?: string;
  arbeidskosten?: string;
  extraKosten?: string;
  btwPercentage: "21" | "9" | "0";
  betalingstermijn: string;

  // Geldigheid
  geldigTot: string;
}

export interface GeneratedOffer {
  offerteNummer: string;
  datum: string;
  geldigTot: string;
  bedrijf: {
    naam: string;
    contactpersoon: string;
    telefoon: string;
    email: string;
    adres: string;
  };
  klant: {
    naam: string;
    adres: string;
    email: string;
  };
  project: {
    type: string;
    omschrijving: string;
    locatie: string;
    startdatum: string;
    doorlooptijd: string;
  };
  regels: OfferteRegel[];
  subtotaal: number;
  btw: number;
  btwPercentage: number;
  totaal: number;
  betalingstermijn: string;
  voorwaarden: string[];
  toelichting: string;
}

export interface OfferteRegel {
  omschrijving: string;
  hoeveelheid: number;
  eenheid: string;
  prijs: number;
  totaal: number;
}
