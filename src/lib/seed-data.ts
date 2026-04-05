export interface SalaryEntry {
  functie: string;
  sector: string;
  ervaringsjaren: number;
  regio: string;
  brutoSalaris: number;
  bedrijfsGrootte: string;
  opleidingsniveau: string;
  extraVoordelen: string;
}

export const seedData: SalaryEntry[] = [
  // IT sector
  { functie: "Software Engineer", sector: "IT", ervaringsjaren: 3, regio: "Noord-Holland", brutoSalaris: 65000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },
  { functie: "Software Engineer", sector: "IT", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 78000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto" },
  { functie: "Software Engineer", sector: "IT", ervaringsjaren: 8, regio: "Utrecht", brutoSalaris: 90000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,thuiswerken" },
  { functie: "Software Engineer", sector: "IT", ervaringsjaren: 2, regio: "Zuid-Holland", brutoSalaris: 55000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Software Engineer", sector: "IT", ervaringsjaren: 10, regio: "Noord-Holland", brutoSalaris: 105000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto,aandelenoptie" },
  { functie: "Frontend Developer", sector: "IT", ervaringsjaren: 4, regio: "Utrecht", brutoSalaris: 68000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,thuiswerken" },
  { functie: "Frontend Developer", sector: "IT", ervaringsjaren: 2, regio: "Zuid-Holland", brutoSalaris: 52000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Backend Developer", sector: "IT", ervaringsjaren: 6, regio: "Noord-Holland", brutoSalaris: 82000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,thuiswerken" },
  { functie: "DevOps Engineer", sector: "IT", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 80000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },
  { functie: "Data Scientist", sector: "IT", ervaringsjaren: 4, regio: "Noord-Holland", brutoSalaris: 75000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus" },
  { functie: "Product Manager", sector: "IT", ervaringsjaren: 7, regio: "Noord-Holland", brutoSalaris: 95000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto" },

  // Finance
  { functie: "Financieel Analist", sector: "Finance", ervaringsjaren: 3, regio: "Noord-Holland", brutoSalaris: 58000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus" },
  { functie: "Financieel Analist", sector: "Finance", ervaringsjaren: 6, regio: "Noord-Holland", brutoSalaris: 75000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto" },
  { functie: "Accountant", sector: "Finance", ervaringsjaren: 5, regio: "Zuid-Holland", brutoSalaris: 62000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Controller", sector: "Finance", ervaringsjaren: 8, regio: "Noord-Brabant", brutoSalaris: 85000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto" },
  { functie: "Risicomanager", sector: "Finance", ervaringsjaren: 10, regio: "Noord-Holland", brutoSalaris: 110000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto,aandelenoptie" },

  // Marketing
  { functie: "Marketing Manager", sector: "Marketing", ervaringsjaren: 6, regio: "Noord-Holland", brutoSalaris: 72000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus,auto" },
  { functie: "Content Marketeer", sector: "Marketing", ervaringsjaren: 3, regio: "Zuid-Holland", brutoSalaris: 45000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "SEO Specialist", sector: "Marketing", ervaringsjaren: 4, regio: "Utrecht", brutoSalaris: 52000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,thuiswerken" },
  { functie: "Performance Marketeer", sector: "Marketing", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 65000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },

  // HR
  { functie: "HR Manager", sector: "HR", ervaringsjaren: 7, regio: "Noord-Holland", brutoSalaris: 75000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,auto" },
  { functie: "Recruiter", sector: "HR", ervaringsjaren: 3, regio: "Zuid-Holland", brutoSalaris: 48000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },
  { functie: "HR Business Partner", sector: "HR", ervaringsjaren: 8, regio: "Utrecht", brutoSalaris: 85000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,auto" },

  // Sales
  { functie: "Account Manager", sector: "Sales", ervaringsjaren: 4, regio: "Noord-Holland", brutoSalaris: 58000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "auto,bonus,pensioen" },
  { functie: "Sales Manager", sector: "Sales", ervaringsjaren: 8, regio: "Noord-Brabant", brutoSalaris: 85000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "auto,bonus,pensioen" },
  { functie: "Sales Engineer", sector: "Sales", ervaringsjaren: 5, regio: "Zuid-Holland", brutoSalaris: 72000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "auto,bonus,pensioen" },

  // Zorg
  { functie: "Verpleegkundige", sector: "Zorg", ervaringsjaren: 1, regio: "Noord-Holland", brutoSalaris: 36000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Verpleegkundige", sector: "Zorg", ervaringsjaren: 3, regio: "Zuid-Holland", brutoSalaris: 40000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Verpleegkundige", sector: "Zorg", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 44000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Verpleegkundige", sector: "Zorg", ervaringsjaren: 8, regio: "Utrecht", brutoSalaris: 50000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },
  { functie: "Zorgmanager", sector: "Zorg", ervaringsjaren: 10, regio: "Noord-Holland", brutoSalaris: 78000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,auto" },
  { functie: "Huisarts", sector: "Zorg", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 95000, bedrijfsGrootte: "1-10", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Huisarts", sector: "Zorg", ervaringsjaren: 10, regio: "Zuid-Holland", brutoSalaris: 120000, bedrijfsGrootte: "1-10", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Fysiotherapeut", sector: "Zorg", ervaringsjaren: 2, regio: "Noord-Brabant", brutoSalaris: 40000, bedrijfsGrootte: "1-10", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Fysiotherapeut", sector: "Zorg", ervaringsjaren: 6, regio: "Utrecht", brutoSalaris: 52000, bedrijfsGrootte: "1-10", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Apotheker", sector: "Zorg", ervaringsjaren: 4, regio: "Zuid-Holland", brutoSalaris: 68000, bedrijfsGrootte: "11-50", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Psycholoog", sector: "Zorg", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 62000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen" },

  // Onderwijs
  { functie: "Leraar Basisonderwijs", sector: "Onderwijs", ervaringsjaren: 1, regio: "Zuid-Holland", brutoSalaris: 34000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Leraar Basisonderwijs", sector: "Onderwijs", ervaringsjaren: 3, regio: "Noord-Holland", brutoSalaris: 38000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Leraar Basisonderwijs", sector: "Onderwijs", ervaringsjaren: 5, regio: "Utrecht", brutoSalaris: 41000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Leraar Voortgezet Onderwijs", sector: "Onderwijs", ervaringsjaren: 2, regio: "Noord-Holland", brutoSalaris: 40000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Leraar Voortgezet Onderwijs", sector: "Onderwijs", ervaringsjaren: 4, regio: "Zuid-Holland", brutoSalaris: 45000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Leraar Voortgezet Onderwijs", sector: "Onderwijs", ervaringsjaren: 8, regio: "Zuid-Holland", brutoSalaris: 55000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Docent MBO", sector: "Onderwijs", ervaringsjaren: 1, regio: "Noord-Brabant", brutoSalaris: 38000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Docent MBO", sector: "Onderwijs", ervaringsjaren: 3, regio: "Zuid-Holland", brutoSalaris: 43000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Docent MBO", sector: "Onderwijs", ervaringsjaren: 5, regio: "Gelderland", brutoSalaris: 47000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Docent HBO", sector: "Onderwijs", ervaringsjaren: 2, regio: "Noord-Holland", brutoSalaris: 46000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Docent HBO", sector: "Onderwijs", ervaringsjaren: 5, regio: "Utrecht", brutoSalaris: 54000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Docent HBO", sector: "Onderwijs", ervaringsjaren: 9, regio: "Zuid-Holland", brutoSalaris: 62000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Universitair Docent", sector: "Onderwijs", ervaringsjaren: 3, regio: "Noord-Holland", brutoSalaris: 54000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Universitair Docent", sector: "Onderwijs", ervaringsjaren: 10, regio: "Noord-Holland", brutoSalaris: 72000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Schooldirecteur", sector: "Onderwijs", ervaringsjaren: 12, regio: "Zuid-Holland", brutoSalaris: 85000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen,auto" },
  { functie: "Intern Begeleider", sector: "Onderwijs", ervaringsjaren: 5, regio: "Noord-Brabant", brutoSalaris: 48000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },
  { functie: "Onderwijsassistent", sector: "Onderwijs", ervaringsjaren: 2, regio: "Utrecht", brutoSalaris: 28000, bedrijfsGrootte: "11-50", opleidingsniveau: "mbo", extraVoordelen: "pensioen" },

  // Juridisch
  { functie: "Advocaat", sector: "Juridisch", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 85000, bedrijfsGrootte: "11-50", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus" },
  { functie: "Jurist", sector: "Juridisch", ervaringsjaren: 4, regio: "Utrecht", brutoSalaris: 65000, bedrijfsGrootte: "51-200", opleidingsniveau: "wo", extraVoordelen: "pensioen" },

  // Bouw
  { functie: "Projectleider Bouw", sector: "Bouw", ervaringsjaren: 8, regio: "Noord-Brabant", brutoSalaris: 75000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "auto,pensioen" },
  { functie: "Bouwkundige", sector: "Bouw", ervaringsjaren: 5, regio: "Gelderland", brutoSalaris: 58000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "auto,pensioen" },
  { functie: "Architect", sector: "Bouw", ervaringsjaren: 7, regio: "Noord-Holland", brutoSalaris: 68000, bedrijfsGrootte: "11-50", opleidingsniveau: "wo", extraVoordelen: "pensioen" },

  // Logistiek
  { functie: "Logistiek Manager", sector: "Logistiek", ervaringsjaren: 8, regio: "Noord-Brabant", brutoSalaris: 72000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "auto,pensioen,bonus" },
  { functie: "Supply Chain Analist", sector: "Logistiek", ervaringsjaren: 4, regio: "Zuid-Holland", brutoSalaris: 55000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },

  // Overheid
  { functie: "Beleidsmedewerker", sector: "Overheid", ervaringsjaren: 6, regio: "Zuid-Holland", brutoSalaris: 62000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen" },
  { functie: "Gemeenteambtenaar", sector: "Overheid", ervaringsjaren: 10, regio: "Noord-Holland", brutoSalaris: 70000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },

  // Creatief
  { functie: "UX Designer", sector: "Creatief", ervaringsjaren: 5, regio: "Noord-Holland", brutoSalaris: 65000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,thuiswerken" },
  { functie: "Grafisch Designer", sector: "Creatief", ervaringsjaren: 3, regio: "Utrecht", brutoSalaris: 45000, bedrijfsGrootte: "11-50", opleidingsniveau: "hbo", extraVoordelen: "pensioen" },

  // Techniek
  { functie: "Werktuigbouwkundige", sector: "Techniek", ervaringsjaren: 6, regio: "Noord-Brabant", brutoSalaris: 68000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "auto,pensioen,bonus" },
  { functie: "Elektrotechnisch Ingenieur", sector: "Techniek", ervaringsjaren: 8, regio: "Gelderland", brutoSalaris: 78000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "auto,pensioen,bonus" },
  { functie: "Technisch Projectleider", sector: "Techniek", ervaringsjaren: 10, regio: "Noord-Brabant", brutoSalaris: 88000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "auto,pensioen,bonus" },

  // Retail
  { functie: "Retail Manager", sector: "Retail", ervaringsjaren: 7, regio: "Zuid-Holland", brutoSalaris: 58000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus" },

  // Extra IT entries for diversity
  { functie: "Cybersecurity Specialist", sector: "IT", ervaringsjaren: 6, regio: "Noord-Holland", brutoSalaris: 88000, bedrijfsGrootte: "200+", opleidingsniveau: "hbo", extraVoordelen: "pensioen,bonus,thuiswerken" },
  { functie: "Cloud Architect", sector: "IT", ervaringsjaren: 9, regio: "Noord-Holland", brutoSalaris: 115000, bedrijfsGrootte: "200+", opleidingsniveau: "wo", extraVoordelen: "pensioen,bonus,auto,thuiswerken" },
  { functie: "Scrum Master", sector: "IT", ervaringsjaren: 5, regio: "Utrecht", brutoSalaris: 72000, bedrijfsGrootte: "51-200", opleidingsniveau: "hbo", extraVoordelen: "pensioen,thuiswerken" },
];

export function getSalaryStats(entries: SalaryEntry[]) {
  if (entries.length === 0) return null;

  const salaries = entries.map((e) => e.brutoSalaris).sort((a, b) => a - b);
  const n = salaries.length;
  const sum = salaries.reduce((acc, s) => acc + s, 0);
  const gemiddeld = Math.round(sum / n);
  const mediaan = n % 2 === 0 ? Math.round((salaries[n / 2 - 1] + salaries[n / 2]) / 2) : salaries[Math.floor(n / 2)];
  const p25 = salaries[Math.floor(n * 0.25)];
  const p75 = salaries[Math.floor(n * 0.75)];

  return { gemiddeld, mediaan, p25, p75, count: n };
}
