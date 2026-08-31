"use client";

import { useEffect, useState } from "react";

/**
 * Brief branded veil on first paint.
 *
 * Runs once per page load, not on client-side navigation — a curtain on every
 * link click makes a site feel slower, not more polished. It sits above the
 * page, fades out on mount, and is removed from the DOM once done so it can
 * never trap clicks.
 *
 * Skipped entirely under reduced-motion.
 */
export default function PageTransition() {
  /* Reduced-motion is resolved in the initial state rather than with setState
     inside the effect, which would cause a second render just to undo the
     first. The initialiser only runs on the client. */
  const [phase, setPhase] = useState<"in" | "out" | "gone">(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "gone"
      : "in",
  );

  /* Runs once. Depending on `phase` here would reschedule both timers each time
     the phase advanced, restarting the fade instead of finishing it. */
  const skipped = phase === "gone";
  useEffect(() => {
    if (skipped) return;
    const fade = window.setTimeout(() => setPhase("out"), 260);
    const remove = window.setTimeout(() => setPhase("gone"), 1000);
    return () => {
      window.clearTimeout(fade);
      window.clearTimeout(remove);
    };
  }, [skipped]);

  if (phase === "gone") return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] grid place-items-center transition-opacity duration-[650ms] ease-[var(--ease-brand)] ${
        phase === "out" ? "opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--grad-hero-rich)" }}
    >
      <span className="font-heading text-2xl font-semibold tracking-tight text-white/95">
        intylact
        <span className="ml-0.5 align-super text-[0.5em] font-normal">®</span>
      </span>
    </div>
  );
}
