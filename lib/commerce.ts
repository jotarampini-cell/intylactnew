/**
 * Commerce helpers: price formatting, discounts, and campaign timing.
 *
 * Kept apart from React so the arithmetic can be reasoned about on its own.
 */

import type { Product } from "./products";

const mxn = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return mxn.format(value);
}

/** Whole-percent discount, or null when the product isn't on sale. */
export function discountPercent(p: Product): number | null {
  if (!p.compareAt || p.compareAt <= p.price) return null;
  return Math.round((1 - p.price / p.compareAt) * 100);
}

export function isOnSale(p: Product): boolean {
  return discountPercent(p) !== null;
}

export const BADGE_LABELS: Record<NonNullable<Product["badge"]>, string> = {
  nuevo: "Nuevo",
  "mas-vendido": "Más vendido",
  agotandose: "Últimas piezas",
};

/* ---------------------------------------------------------------------------
   Campaign window

   SET THIS PER CAMPAIGN. The countdown targets a fixed date, so it counts down
   honestly and the section disappears once the offer is genuinely over. It does
   NOT restart per visitor — a timer that resets on every visit is fabricated
   urgency, which is deceptive advertising and actionable under PROFECO rules
   in Mexico.
   --------------------------------------------------------------------------- */
export const CAMPAIGN = {
  label: "Oferta de temporada",
  headline: "Hasta 20% en tus esenciales",
  /** Local time. Change this when the campaign changes. */
  endsAt: new Date("2026-09-30T23:59:59-06:00"),
} as const;

export type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

export function timeLeftUntil(target: Date, now: Date = new Date()): TimeLeft {
  const ms = target.getTime() - now.getTime();
  if (ms <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    expired: false,
  };
}

export function pad(n: number): string {
  return n.toString().padStart(2, "0");
}
