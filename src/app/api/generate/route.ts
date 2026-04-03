import { NextRequest, NextResponse } from "next/server";
import { generateOffer } from "@/lib/generate-offer";
import type { OfferteFormData } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const data: OfferteFormData = await req.json();

    if (!data.bedrijfsnaam || !data.klantNaam || !data.projectType) {
      return NextResponse.json(
        { error: "Verplichte velden ontbreken" },
        { status: 400 }
      );
    }

    const offer = generateOffer(data);
    return NextResponse.json(offer);
  } catch {
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het genereren van de offerte" },
      { status: 500 }
    );
  }
}
