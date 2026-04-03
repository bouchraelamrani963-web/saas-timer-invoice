import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { functie, sector, ervaringsjaren, regio, brutoSalaris, bedrijfsGrootte, opleidingsniveau, extraVoordelen } = body;

    if (!functie || !sector || ervaringsjaren === undefined || !regio || !brutoSalaris || !bedrijfsGrootte || !opleidingsniveau) {
      return Response.json({ error: "Alle velden zijn verplicht" }, { status: 400 });
    }

    if (brutoSalaris < 10000 || brutoSalaris > 500000) {
      return Response.json({ error: "Salaris moet tussen €10.000 en €500.000 liggen" }, { status: 400 });
    }

    const bijdrage = await prisma.salarisBijdrage.create({
      data: {
        functie: String(functie),
        sector: String(sector),
        ervaringsjaren: Number(ervaringsjaren),
        regio: String(regio),
        brutoSalaris: Number(brutoSalaris),
        bedrijfsGrootte: String(bedrijfsGrootte),
        opleidingsniveau: String(opleidingsniveau),
        extraVoordelen: Array.isArray(extraVoordelen) ? extraVoordelen.join(",") : String(extraVoordelen ?? ""),
      },
    });

    return Response.json({ success: true, id: bijdrage.id }, { status: 201 });
  } catch (error) {
    console.error("Error saving salary:", error);
    return Response.json({ error: "Er is een fout opgetreden" }, { status: 500 });
  }
}
