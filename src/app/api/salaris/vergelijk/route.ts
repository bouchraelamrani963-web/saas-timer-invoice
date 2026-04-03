import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { seedData, getSalaryStats } from "@/lib/seed-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const sector = searchParams.get("sector");
    const regio = searchParams.get("regio");
    const ervaringMin = searchParams.get("ervaringMin");
    const ervaringMax = searchParams.get("ervaringMax");
    const functie = searchParams.get("functie");

    // Try DB first
    let dbEntries: Array<{ brutoSalaris: number; functie: string; sector: string; ervaringsjaren: number; regio: string; bedrijfsGrootte: string; opleidingsniveau: string; extraVoordelen: string }> = [];

    try {
      const where: Record<string, unknown> = {};
      if (sector) where.sector = sector;
      if (regio) where.regio = regio;
      if (functie) where.functie = { contains: functie };
      if (ervaringMin || ervaringMax) {
        where.ervaringsjaren = {};
        if (ervaringMin) (where.ervaringsjaren as Record<string, number>).gte = Number(ervaringMin);
        if (ervaringMax) (where.ervaringsjaren as Record<string, number>).lte = Number(ervaringMax);
      }

      dbEntries = await prisma.salarisBijdrage.findMany({ where });
    } catch {
      // DB not ready yet, use seed data
    }

    // Combine DB entries with seed data filtered the same way
    let seedFiltered = seedData;
    if (sector) seedFiltered = seedFiltered.filter((e) => e.sector === sector);
    if (regio) seedFiltered = seedFiltered.filter((e) => e.regio === regio);
    if (functie) seedFiltered = seedFiltered.filter((e) => e.functie.toLowerCase().includes(functie.toLowerCase()));
    if (ervaringMin) seedFiltered = seedFiltered.filter((e) => e.ervaringsjaren >= Number(ervaringMin));
    if (ervaringMax) seedFiltered = seedFiltered.filter((e) => e.ervaringsjaren <= Number(ervaringMax));

    const allEntries = [
      ...dbEntries.map((e) => ({ ...e, extraVoordelen: e.extraVoordelen })),
      ...seedFiltered,
    ];

    const stats = getSalaryStats(allEntries);

    if (!stats) {
      return Response.json({ error: "Geen gegevens gevonden voor deze criteria" }, { status: 404 });
    }

    return Response.json({
      ...stats,
      filters: { sector, regio, functie, ervaringMin, ervaringMax },
    });
  } catch (error) {
    console.error("Error fetching salary comparison:", error);
    return Response.json({ error: "Er is een fout opgetreden" }, { status: 500 });
  }
}
