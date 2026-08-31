"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { CAMPAIGN, isOnSale, pad, timeLeftUntil, type TimeLeft } from "@/lib/commerce";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/ui/ProductCard";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Campaign rail with a live countdown.
 *
 * The target is a fixed date in lib/commerce.ts — it does not restart per
 * visitor. Once it passes, the whole section unmounts rather than showing a
 * dead timer or silently rolling over.
 *
 * The clock starts null and fills in after mount: rendering a server-computed
 * time would hydrate mismatched, and every visitor's remaining time differs.
 */
export default function OfferCountdown() {
  const [left, setLeft] = useState<TimeLeft | null>(null);
  const onSale = products.filter(isOnSale);

  useEffect(() => {
    const tick = () => setLeft(timeLeftUntil(CAMPAIGN.endsAt));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  if (onSale.length === 0) return null;
  if (left?.expired) return null;

  const units = left
    ? [
        { v: left.days, l: "días" },
        { v: left.hours, l: "hrs" },
        { v: left.minutes, l: "min" },
        { v: left.seconds, l: "seg" },
      ]
    : null;

  return (
    <SectionShell
      background="bg-teal-900"
      aria-labelledby="oferta-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              <span className="relative grid h-2 w-2 place-items-center">
                <span className="absolute h-2 w-2 rounded-full bg-coral-400 motion-safe:animate-[var(--animate-pulse-ring)]" />
                <span className="h-2 w-2 rounded-full bg-coral-400" />
              </span>
              {CAMPAIGN.label}
            </p>
            <h2
              id="oferta-titulo"
              className="mt-3 font-heading text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
            >
              {CAMPAIGN.headline}
            </h2>
          </div>

          {/* Countdown. Reserves its footprint before mount so nothing shifts. */}
          <div className="flex items-center gap-2.5" aria-live="off">
            {(units ?? [{ l: "días" }, { l: "hrs" }, { l: "min" }, { l: "seg" }]).map(
              (u, i) => (
                <div
                  key={i}
                  className="grid h-[68px] w-[62px] place-items-center rounded-2xl bg-white/10 backdrop-blur-sm"
                >
                  <span className="font-heading text-2xl font-bold tabular-nums text-white">
                    {"v" in u && typeof u.v === "number" ? pad(u.v) : "--"}
                  </span>
                  <span className="font-heading text-[10px] font-medium uppercase tracking-wider text-white/65">
                    {u.l}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>
      </Reveal>

      <div className="mt-10">
        <Carousel
          label="Productos en oferta"
          gridClass="sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          itemClass="w-[76vw] max-w-[300px]"
        >
          {onSale.map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </Carousel>
      </div>

      <p className="mt-4 text-center text-[13px] text-white/55 sm:hidden">
        Desliza para ver más →
      </p>
    </SectionShell>
  );
}
