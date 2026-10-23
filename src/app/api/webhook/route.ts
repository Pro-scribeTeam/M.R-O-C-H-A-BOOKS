/**
 * Stripe webhook — fires after a successful payment.
 * Automatically creates a Lulu print job with the customer's shipping address.
 *
 * Setup:
 *  1. Install Stripe CLI: https://stripe.com/docs/stripe-cli
 *  2. Run: stripe listen --forward-to localhost:3000/api/webhook
 *  3. Copy the webhook signing secret into STRIPE_WEBHOOK_SECRET in .env.local
 *
 * In production (Vercel / deployed):
 *  → Add your deployed URL as a webhook endpoint in the Stripe dashboard
 *  → Events to listen for: checkout.session.completed
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createLuluPrintJob, type LuluShippingAddress } from "@/lib/lulu";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-03-31.basil",
});

// Required so Next.js doesn't parse the body — Stripe needs the raw bytes
export const config = { api: { bodyParser: false } };

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  const rawBody = await req.text();

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Only process paid orders
    if (session.payment_status !== "paid") {
      return NextResponse.json({ received: true });
    }

    const format = session.metadata?.format as "hardcover" | "softcover";
    const shipping = session.shipping_details;
    const customerEmail = session.customer_details?.email ?? "";

    if (!shipping?.address || !format) {
      console.error("Missing shipping address or format in session", session.id);
      return NextResponse.json({ error: "Missing data" }, { status: 400 });
    }

    const addr = shipping.address;
    const luluAddress: LuluShippingAddress = {
      name: shipping.name ?? customerEmail,
      street1: addr.line1 ?? "",
      street2: addr.line2 ?? undefined,
      city: addr.city ?? "",
      state_code: addr.state ?? "",
      country_code: addr.country ?? "US",
      postcode: addr.postal_code ?? "",
    };

    try {
      const job = await createLuluPrintJob({
        format,
        quantity: 1,
        shipping_address: luluAddress,
        customer_email: customerEmail,
        external_id: session.id,
      });

      console.log(`Lulu print job created for session ${session.id}:`, job.id);
    } catch (err) {
      // Log the error but return 200 so Stripe doesn't retry endlessly.
      // You'll want to set up alerting here in production.
      console.error("Failed to create Lulu print job:", err);
    }
  }

  return NextResponse.json({ received: true });
}
