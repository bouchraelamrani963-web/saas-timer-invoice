import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, signToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, wachtwoord } = body;

    if (!email || !wachtwoord) {
      return Response.json({ error: "E-mail en wachtwoord zijn verplicht" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return Response.json({ error: "Onjuist e-mailadres of wachtwoord" }, { status: 401 });
    }

    const valid = await verifyPassword(wachtwoord, user.passwordHash);
    if (!valid) {
      return Response.json({ error: "Onjuist e-mailadres of wachtwoord" }, { status: 401 });
    }

    const token = signToken({ userId: user.id, email: user.email });
    const cookieStore = await cookies();
    cookieStore.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Login error:", error);
    return Response.json({ error: "Er is een fout opgetreden" }, { status: 500 });
  }
}
