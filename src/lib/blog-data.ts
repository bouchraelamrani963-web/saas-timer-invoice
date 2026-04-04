export type BlogArtikel = {
  slug: string;
  titel: string;
  beschrijving: string;
  categorie: string;
  leestijd: string;
  datum: string;
  inhoud: string;
};

export const artikelen: BlogArtikel[] = [
  {
    slug: "wat-verdient-een-software-developer-2025",
    titel: "Wat verdient een software developer in Nederland in 2025?",
    beschrijving:
      "Alles over salarissen in de IT-sector: van junior developer tot tech lead. Met regionale verschillen en tips om meer te verdienen.",
    categorie: "IT & Tech",
    leestijd: "6 min",
    datum: "2025-01-15",
    inhoud: `
<h2>Het gemiddelde salaris van een software developer in 2025</h2>
<p>Software developers zijn momenteel een van de best betaalde beroepsgroepen in Nederland. De vraag naar technisch talent blijft hoog, terwijl het aanbod achterblijft — wat de onderhandelingspositie van developers sterk maakt.</p>
<p>Op basis van data uit de SalarisRadar-database zien we de volgende gemiddelde jaarsalarissen (bruto, exclusief bonus):</p>
<ul>
  <li><strong>Junior developer (0-2 jaar):</strong> €38.000 – €52.000</li>
  <li><strong>Medior developer (2-5 jaar):</strong> €55.000 – €72.000</li>
  <li><strong>Senior developer (5+ jaar):</strong> €72.000 – €95.000</li>
  <li><strong>Tech Lead / Principal:</strong> €90.000 – €130.000</li>
</ul>

<h2>Welke skills leveren het meeste op?</h2>
<p>Niet alle developers verdienen hetzelfde. Je specialisatie heeft grote invloed op je salaris. De best betaalde specialismen in 2025:</p>
<ul>
  <li><strong>Cloud / DevOps (AWS, Azure, GCP):</strong> +15-25% boven gemiddeld</li>
  <li><strong>Machine Learning / AI engineering:</strong> +20-35%</li>
  <li><strong>Cybersecurity:</strong> +10-20%</li>
  <li><strong>Backend (Java, Golang, Rust):</strong> +5-15%</li>
  <li><strong>Frontend (React, Vue):</strong> marktgemiddelde</li>
</ul>

<h2>Regionale verschillen</h2>
<p>Amsterdam en omgeving betaalt gemiddeld 12-18% meer dan de rest van Nederland. In Utrecht en Rotterdam liggen salarissen zo'n 5-10% boven het landelijk gemiddelde. Buiten de Randstad zijn salarissen lager, maar de woonkosten ook.</p>

<h2>Hoe onderhandel je een hoger salaris als developer?</h2>
<p>Met de huidige krapte op de arbeidsmarkt heb je als developer een sterke positie. Onze tips:</p>
<ul>
  <li>Vergelijk jouw salaris via SalarisRadar voor je het gesprek ingaat</li>
  <li>Noem meerdere alternatieven (andere aanbiedingen) als je die hebt</li>
  <li>Focus op toegevoegde waarde, niet op persoonlijke omstandigheden</li>
  <li>Vergeet niet om te onderhandelen over extraatjes: thuiswerkvergoeding, opleidingsbudget, aandelenopties</li>
</ul>

<p>Wil je weten of jij marktconform verdient? Vergelijk jouw salaris gratis via SalarisRadar.</p>
    `,
  },
  {
    slug: "gemiddeld-salaris-nederland-2025",
    titel: "Gemiddeld salaris Nederland 2025: sector per sector",
    beschrijving:
      "Wat verdient de gemiddelde Nederlander in 2025? Een compleet overzicht van salarissen per sector, regio en opleidingsniveau.",
    categorie: "Salaris & Markt",
    leestijd: "8 min",
    datum: "2025-01-10",
    inhoud: `
<h2>Het gemiddelde salaris in Nederland in 2025</h2>
<p>Het gemiddelde bruto jaarsalaris in Nederland bedraagt in 2025 ongeveer <strong>€47.500</strong>. Dit is het CBS-gemiddelde inclusief deeltijdwerkers. Voor voltijdse werknemers ligt dit hoger: rond de <strong>€54.000 bruto per jaar</strong>.</p>
<p>Het modaal salaris — het meest voorkomende salaris — ligt een stuk lager, namelijk op circa <strong>€38.000 bruto per jaar</strong>.</p>

<h2>Salarissen per sector (2025)</h2>
<p>Er zijn grote verschillen tussen sectoren. Hieronder een overzicht van de gemiddelde bruto jaarsalarissen per sector:</p>
<ul>
  <li><strong>IT & Technologie:</strong> €72.000</li>
  <li><strong>Finance & Banking:</strong> €68.000</li>
  <li><strong>Juridisch:</strong> €65.000</li>
  <li><strong>Consulting:</strong> €64.000</li>
  <li><strong>Marketing & Communicatie:</strong> €52.000</li>
  <li><strong>HR & Recruitment:</strong> €50.000</li>
  <li><strong>Logistiek:</strong> €44.000</li>
  <li><strong>Detailhandel:</strong> €36.000</li>
  <li><strong>Zorg & Welzijn:</strong> €42.000</li>
  <li><strong>Onderwijs:</strong> €48.000</li>
</ul>

<h2>Invloed van opleidingsniveau</h2>
<p>Opleiding blijft een van de sterkste voorspellers van inkomen:</p>
<ul>
  <li><strong>MBO:</strong> gemiddeld €35.000 – €42.000</li>
  <li><strong>HBO:</strong> gemiddeld €42.000 – €55.000</li>
  <li><strong>WO Bachelor:</strong> gemiddeld €48.000 – €62.000</li>
  <li><strong>WO Master / PhD:</strong> gemiddeld €58.000 – €85.000</li>
</ul>

<h2>Regionale verschillen</h2>
<p>Noord-Holland (Amsterdam) heeft de hoogste gemiddelde salarissen in Nederland. Gevolgd door Utrecht en Zuid-Holland. Groningen, Zeeland en Friesland hebben de laagste gemiddelde salarissen, maar ook lagere woonlasten.</p>

<h2>Verdien jij genoeg?</h2>
<p>Weet je niet of jouw salaris marktconform is? Gebruik SalarisRadar om anoniem te vergelijken met professionals in jouw sector, regio en ervaringsniveau.</p>
    `,
  },
  {
    slug: "salaris-onderhandelen-7-tips",
    titel: "Salaris onderhandelen: 7 bewezen tips voor je volgende gesprek",
    beschrijving:
      "Praktische tips om meer salaris te vragen en te krijgen. Van voorbereiding tot het moment zelf — zo onderhandel je succesvol.",
    categorie: "Onderhandelen",
    leestijd: "7 min",
    datum: "2025-01-05",
    inhoud: `
<h2>Waarom de meeste mensen te weinig vragen</h2>
<p>Onderzoek toont aan dat slechts 37% van de Nederlanders actief onderhandelt over salaris bij een nieuw dienstverband. Toch accepteert de werkgever in meer dan 70% van de gevallen een hoger tegenbod. Het loonverschil over een heel carrière tussen mensen die wél en niet onderhandelen kan oplopen tot honderdduizenden euro's.</p>

<h2>Tip 1: Ken je marktwaarde</h2>
<p>Ga nooit een salarisdiscussie in zonder data. Gebruik tools zoals SalarisRadar om te zien wat vergelijkbare functies in jouw sector en regio verdienen. Met concrete cijfers sta je veel sterker dan met een onderbuikgevoel.</p>

<h2>Tip 2: Noem als eerste een getal</h2>
<p>Economisch onderzoek laat zien dat wie het eerste getal noemt, het 'anker' bepaalt voor de rest van het gesprek. Wacht niet op de werkgever — noem jouw gewenste salaris (iets hoger dan je doel, zodat er ruimte is om te zakken).</p>

<h2>Tip 3: Gebruik een bereik, niet één getal</h2>
<p>Zeg: "Ik denk aan een salaris tussen €65.000 en €72.000" in plaats van "Ik wil €65.000". Het bovenste getal blijft hangen, en je onderste limiet is al je minimum.</p>

<h2>Tip 4: Wacht na het noemen van je getal</h2>
<p>Stilte voelt ongemakkelijk, maar heeft kracht. Noem je gewenste salaris en zeg dan niets. De eerste die daarna spreekt, geeft concessies. Oefen dit vooraf.</p>

<h2>Tip 5: Onderhandel over het totale pakket</h2>
<p>Als het basissalaris niet verder kan, zijn er alternatieven: bonusstructuur, thuiswerkvergoeding, opleidingsbudget, extra vakantiedagen, pensioenregeling of aandelenopties. Elk van deze heeft financiële waarde.</p>

<h2>Tip 6: Gebruik andere aanbiedingen als hefboom</h2>
<p>Als je meerdere aanbiedingen hebt, mag je dat zeggen — ook als je eigenlijk al weet waar je naartoe wil. "Ik heb ook een aanbieding van X" werkt als krachtige onderhandelingshefboom.</p>

<h2>Tip 7: Schrijf de onderhandelstrategie vooraf uit</h2>
<p>Gebruik de SalarisRadar onderhandelcoach om een persoonlijk onderhandelscript te genereren, gebaseerd op jouw functie, sector en gewenst salaris. Zo ga je goed voorbereid het gesprek in.</p>
    `,
  },
  {
    slug: "wat-verdient-een-verpleegkundige-2025",
    titel: "Wat verdient een verpleegkundige in Nederland in 2025?",
    beschrijving:
      "Salarissen in de zorg: van niveau 3 tot IC-verpleegkundige en verpleegkundig specialist. Inclusief toeslagen en cao-schalen.",
    categorie: "Zorg & Welzijn",
    leestijd: "5 min",
    datum: "2024-12-20",
    inhoud: `
<h2>Verpleegkundige salaris in 2025</h2>
<p>Verpleegkundigen vallen onder de Cao Ziekenhuizen of Cao VVT (Verpleging, Verzorging en Thuiszorg), afhankelijk van de werkgever. De salarissen zijn de afgelopen jaren flink gestegen door de krapte in de zorg en cao-onderhandelingen.</p>

<h2>Salarissen per niveau</h2>
<ul>
  <li><strong>Verzorgende IG (niveau 3):</strong> €2.350 – €3.100 bruto per maand</li>
  <li><strong>Verpleegkundige (niveau 4):</strong> €2.700 – €3.600 bruto per maand</li>
  <li><strong>HBO-Verpleegkundige (niveau 5):</strong> €3.000 – €4.100 bruto per maand</li>
  <li><strong>IC / SEH verpleegkundige:</strong> €3.400 – €4.800 bruto per maand</li>
  <li><strong>Verpleegkundig Specialist (MANP):</strong> €4.500 – €6.500 bruto per maand</li>
</ul>

<h2>Toeslagen en vergoedingen</h2>
<p>Zorgprofessionals ontvangen bovenop hun basissalaris vaak toeslagen voor:</p>
<ul>
  <li>Onregelmatige diensten (avond, nacht, weekend): 25-50% toeslag</li>
  <li>Feestdagentoeslag: tot 100%</li>
  <li>Bereikbaarheidsdienst</li>
  <li>Reiskostenvergoeding</li>
</ul>
<p>Door onregelmatigheidstoeslag (ORT) kan het feitelijke inkomen van IC-verpleegkundigen oplopen tot €65.000+ bruto per jaar.</p>

<h2>Hoe verhoog je je salaris als verpleegkundige?</h2>
<ul>
  <li><strong>Specialiseer je:</strong> IC, SEH, operatieassistent of oncologie betalen aanzienlijk meer</li>
  <li><strong>Doe een Master:</strong> HBO+ of MANP opent deuren naar verpleegkundig specialist</li>
  <li><strong>Wissel van werkgever:</strong> veel zorgorganisaties bieden bij instroom een hoger loonschaal aan</li>
  <li><strong>ZZP:</strong> als zzp-verpleegkundige verdien je €40-€65 per uur, maar draag je zelf premies af</li>
</ul>

<p>Verdien jij wat de markt betaalt? Check jouw salaris anoniem op SalarisRadar.</p>
    `,
  },
  {
    slug: "salaris-vergelijken-hoe-weet-je-of-je-genoeg-verdient",
    titel: "Salaris vergelijken: hoe weet je of je eerlijk betaald wordt?",
    beschrijving:
      "Stap-voor-stap uitleg hoe je jouw salaris correct vergelijkt met de markt. Met concrete tools en criteria.",
    categorie: "Salaris & Markt",
    leestijd: "5 min",
    datum: "2024-12-10",
    inhoud: `
<h2>Waarom salarisvergelijking zo lastig is</h2>
<p>Salaris vergelijken klinkt eenvoudig, maar is dat niet. Dezelfde functietitel bij twee bedrijven kan een verschil van €30.000 per jaar betekenen. Sector, bedrijfsgrootte, regio, ervaringsjaren en opleidingsniveau zijn allemaal van invloed. Wie alleen kijkt naar gemiddelden, mist het echte beeld.</p>

<h2>Stap 1: Definieer jouw referentiegroep</h2>
<p>Vergelijk alleen met mensen die écht vergelijkbaar zijn:</p>
<ul>
  <li>Zelfde sector (bijv. IT bij een bank vs. IT bij een startup kan €20k+ schelen)</li>
  <li>Vergelijkbaar ervaringsniveau (2-5 jaar, 5-10 jaar, etc.)</li>
  <li>Zelfde of vergelijkbare regio</li>
  <li>Vergelijkbaar opleidingsniveau</li>
  <li>Vergelijkbare bedrijfsgrootte (MKB vs. multinational)</li>
</ul>

<h2>Stap 2: Gebruik meerdere bronnen</h2>
<p>Eén databron is nooit genoeg. Combineer:</p>
<ul>
  <li>SalarisRadar — anonieme data van Nederlandse professionals</li>
  <li>Cao-schalen van jouw sector</li>
  <li>Vacatureteksten (steeds meer werkgevers vermelden salarisrange)</li>
  <li>Gesprekken met collega's of oud-collega's</li>
  <li>Recruiters — die weten precies wat de markt betaalt</li>
</ul>

<h2>Stap 3: Kijk naar het totale pakket</h2>
<p>Salaris is meer dan bruto maandsalaris. Reken ook mee:</p>
<ul>
  <li>Vakantiegeld (8% = bijna een extra maandsalaris)</li>
  <li>13e maand of bonus</li>
  <li>Pensioenopbouw (verschil van 5-15% van salaris!)</li>
  <li>Reiskostenvergoeding</li>
  <li>Thuiswerkvergoeding</li>
  <li>Opleidingsbudget</li>
  <li>Aandelenopties of winstdeling</li>
</ul>

<h2>Stap 4: Handel als je te weinig verdient</h2>
<p>Als je vaststelt dat je onder de marktwaarde verdient, zijn er drie opties:</p>
<ol>
  <li><strong>Vraag om loonsverhoging</strong> bij je huidige werkgever met marktdata als onderbouwing</li>
  <li><strong>Zoek actief elders</strong> — een nieuwe baan levert gemiddeld 15-25% meer op dan een interne verhoging</li>
  <li><strong>Bouw aan je profiel</strong> — extra certificeringen of een specialisatie verhogen je marktwaarde</li>
</ol>

<p>Start met stap 1: check gratis en anoniem jouw salaris op SalarisRadar en weet exact hoe jij scoort ten opzichte van de markt.</p>
    `,
  },
];

export function getArtikel(slug: string): BlogArtikel | undefined {
  return artikelen.find((a) => a.slug === slug);
}
