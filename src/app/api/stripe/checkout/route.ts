import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const PRICES = {
  starter: process.env.STRIPE_STARTER_PRICE_ID ?? "",
  pro: process.env.STRIPE_PRO_PRICE_ID ?? "",
  recruiter: process.env.STRIPE_RECRUITER_PRICE_ID ?? "",
};

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json({ error: "Stripe niet geconfigureerd" }, { status: 500 });
  }

  let plan: string;
  try {
    const body = await req.json();
    plan = body.plan;
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek" }, { status: 400 });
  }

  const priceId = PRICES[plan as keyof typeof PRICES];
  if (!priceId) {
    return NextResponse.json({ error: "Ongeldig plan" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.salarisradar.nl";

  try {
    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/betaling-geslaagd?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/prijzen`,
      locale: "nl",
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Onbekende fout";
    console.error("Stripe checkout error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
