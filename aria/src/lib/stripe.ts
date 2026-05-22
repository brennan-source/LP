import Stripe from "stripe";

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
  return new Stripe(key, { apiVersion: "2026-04-22.dahlia" as "2026-04-22.dahlia" });
}

let _stripe: Stripe | null = null;
export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_t, prop) {
    if (!_stripe) _stripe = getStripe();
    return (_stripe as unknown as Record<string | symbol, unknown>)[prop];
  },
});

export const ASSESSMENT_PRICE_CENTS = parseInt(process.env.ASSESSMENT_PRICE_CENTS || "1900");
