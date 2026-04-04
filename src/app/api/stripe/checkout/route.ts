import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICES = {
  pro: "price_1TIZteFYqQfpXhHgNrUBq2PX",
  recruiter: "price_1TIZYkFYqQfpXhHgMnuZzpU4",
};

export async function POST(req: NextRequest) {
  const { plan } = await req.json();

  const priceId = PRICES[plan as keyof typeof PRICES];
  if (!priceId) {
    return NextResponse.json({ error: "Ongeldig plan" }, { status: 400 });
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.salarisradar.nl";

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/betaling-geslaagd?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${appUrl}/prijzen`,
    locale: "nl",
    allow_promotion_codes: true,
  });

  return NextResponse.json({ url: session.url });
}
