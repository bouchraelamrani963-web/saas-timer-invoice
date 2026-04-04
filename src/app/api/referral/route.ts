import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// GET /api/referral — haal referral code op voor ingelogde user
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    select: { referralCode: true, email: true },
  });

  if (!user) {
    return NextResponse.json({ error: "Gebruiker niet gevonden" }, { status: 404 });
  }

  if (!user.referralCode) {
    // Genereer code als die er nog niet is
    const code = generateCode(user.email);
    await prisma.user.update({
      where: { id: session.userId },
      data: { referralCode: code },
    });
    return NextResponse.json({ code });
  }

  const gebruikCount = await prisma.referral.count({
    where: { referrerCode: user.referralCode },
  });

  return NextResponse.json({ code: user.referralCode, gebruikCount });
}

// POST /api/referral — registreer gebruik van een referral code
export async function POST(req: NextRequest) {
  let code: string;
  let usedByEmail: string;
  try {
    const body = await req.json();
    code = (body.code ?? "").trim().toUpperCase();
    usedByEmail = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }

  if (!code || !usedByEmail) {
    return NextResponse.json({ error: "Code en e-mail zijn verplicht" }, { status: 400 });
  }

  // Check of code bestaat
  const referrer = await prisma.user.findFirst({
    where: { referralCode: code },
  });

  if (!referrer) {
    return NextResponse.json({ error: "Ongeldige referral code" }, { status: 400 });
  }

  // Sla gebruik op
  await prisma.referral.create({
    data: { referrerCode: code, usedByEmail },
  });

  return NextResponse.json({ ok: true, bericht: "Referral geregistreerd! Je krijgt 1 maand Pro gratis." });
}

function generateCode(email: string): string {
  const prefix = email.split("@")[0].replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 5);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${random}`;
}
