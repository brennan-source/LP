import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2026-04-22.dahlia" as "2026-04-22.dahlia",
});

export const ASSESSMENT_PRICE_CENTS = parseInt(process.env.ASSESSMENT_PRICE_CENTS || "1900");
