/**
 * Lulu Print API client
 * Docs: https://developers.lulu.com/
 *
 * To get credentials:
 *  1. Log in at lulu.com → Account → API Keys
 *  2. Create a new API key — copy Client Key + Client Secret
 *  3. Add them to .env.local (see .env.local.example)
 *
 * To get pod_package_id values:
 *  Log in to lulu.com, go to Create → Interior & Cover files must be
 *  uploaded before you can grab the package ID from the Print API catalog:
 *  GET https://api.lulu.com/print-jobs/costs/?pod_package_id=...
 *  Or browse: https://developers.lulu.com/reference#tag/Print-Jobs
 */

const LULU_API = "https://api.lulu.com";
const TOKEN_URL =
  "https://api.lulu.com/auth/realms/glasstree/protocol/openid-connect/token";

// ── Book file URLs ────────────────────────────────────────────────────────────
// Upload your interior PDF and cover PDF to a public URL (e.g. Cloudflare R2,
// S3, or any CDN) and paste them here.
export const BOOK_FILES = {
  interior_url: process.env.LULU_INTERIOR_URL ?? "",  // your interior PDF URL
  cover_url: process.env.LULU_COVER_URL ?? "",        // your cover PDF URL
};

// ── POD Package IDs ───────────────────────────────────────────────────────────
// These identify the exact print spec (trim size, paper, binding, colour).
// Find yours at: https://developers.lulu.com/reference#tag/Print-Jobs
// Examples for a 6"×9" B&W book:
export const POD_PACKAGES = {
  hardcover: process.env.LULU_POD_HARDCOVER ?? "0600X0900BWSTDCW060UW444MXX",
  softcover: process.env.LULU_POD_SOFTCOVER ?? "0600X0900BWSTDPB060UW444MXX",
};

// ── Types ─────────────────────────────────────────────────────────────────────

export type LuluShippingAddress = {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state_code: string;
  country_code: string;
  postcode: string;
  phone_number?: string;
};

export type LuluOrderPayload = {
  format: "hardcover" | "softcover";
  quantity: number;
  shipping_address: LuluShippingAddress;
  customer_email: string;
  external_id: string; // Stripe session ID — lets you trace orders
};

// ── Auth ──────────────────────────────────────────────────────────────────────

async function getLuluToken(): Promise<string> {
  const clientKey = process.env.LULU_CLIENT_KEY;
  const clientSecret = process.env.LULU_CLIENT_SECRET;

  if (!clientKey || !clientSecret) {
    throw new Error("Missing LULU_CLIENT_KEY or LULU_CLIENT_SECRET in env");
  }

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientKey,
      client_secret: clientSecret,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lulu auth failed: ${res.status} ${text}`);
  }

  const data = await res.json();
  return data.access_token as string;
}

// ── Create Print Job ──────────────────────────────────────────────────────────

export async function createLuluPrintJob(order: LuluOrderPayload) {
  const token = await getLuluToken();

  const body = {
    external_id: order.external_id,
    contact_email: order.customer_email,
    shipping_address: order.shipping_address,
    shipping_level: "MAIL",
    line_items: [
      {
        external_id: `${order.external_id}-1`,
        title: "The Bear's Aggression",
        quantity: order.quantity,
        pod_package_id: POD_PACKAGES[order.format],
        printable_normalization: {
          interior: { source_url: BOOK_FILES.interior_url },
          cover: { source_url: BOOK_FILES.cover_url },
        },
      },
    ],
  };

  const res = await fetch(`${LULU_API}/print-jobs/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Cache-Control": "no-cache",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lulu print job failed: ${res.status} ${text}`);
  }

  return res.json();
}
