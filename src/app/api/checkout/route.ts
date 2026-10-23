import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

// ── Prices ────────────────────────────────────────────────────────────────────
// Set your retail prices here (in cents).
// Make sure they cover Lulu's print cost + your desired margin.
// Lulu approximate print costs (6"×9" B&W, ~300 pages):
//   Hardcover: ~$20–22   Softcover: ~$6–8
const PRICES = {
  hardcover: {
    name: "The Bear's Aggression — Hardcover",
    description: "Case-laminate hardback edition by M.R. Ocha",
    amount: 2999, // $29.99
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/book-cover-hardback.jpg`,
  },
  softcover: {
    name: "The Bear's Aggression — Softcover",
    description: "Perfect-bound paperback edition by M.R. Ocha",
    amount: 1999, // $19.99
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/book-cover-hardback.jpg`,
  },
};

export async function POST(req: NextRequest) {
  const { format } = await req.json() as { format: "hardcover" | "softcover" };

  if (!PRICES[format]) {
    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  }

  const price = PRICES[format];
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? req.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: price.amount,
          product_data: {
            name: price.name,
            description: price.description,
            images: [price.image],
          },
        },
      },
    ],
    // Collect shipping address — Lulu ships worldwide
    shipping_address_collection: {
      allowed_countries: [
        "US", "CA", "GB", "AU", "DE", "FR", "IT", "ES", "NL",
        "BE", "AT", "CH", "SE", "NO", "DK", "FI", "PL", "PT",
        "IE", "NZ", "JP", "SG", "HK", "MX", "BR", "IN",
      ],
    },
    // Pass format through so the webhook knows which book to print
    metadata: { format },
    success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/order`,
  });

  return NextResponse.json({ url: session.url });
}
