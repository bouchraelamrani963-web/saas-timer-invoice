import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword, signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { naam, email, wachtwoord } = body;

    if (!naam || !email || !wachtwoord) {
      return Response.json({ error: "Alle velden zijn verplicht" }, { status: 400 });
    }

    if (wachtwoord.length < 8) {
      return Response.json({ error: "Wachtwoord moet minimaal 8 tekens zijn" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return Response.json({ error: "Dit e-mailadres is al in gebruik" }, { status: 409 });
    }

    const passwordHash = await hashPassword(wachtwoord);
    const user = await prisma.user.create({
      data: { naam, email, passwordHash },
    });

    const token = signToken({ userId: user.id, email: user.email });
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Registreer error:", error);
    return Response.json({ error: "Er is een fout opgetreden" }, { status: 500 });
  }
}
