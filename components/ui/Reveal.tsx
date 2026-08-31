"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Fades and lifts its children into view on first scroll.
 *
 * Uses IntersectionObserver and unobserves after firing, so it costs nothing
 * once revealed. Reduced-motion users get the content immediately with no
 * transition, rather than an element that animates faster.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  /** Stagger in milliseconds, for sequencing siblings */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  /* Reduced-motion is resolved lazily in the initial state rather than via
     setState inside the effect: that avoided a second render, and starting
     `shown` at true means the content is never briefly hidden. The initialiser
     only runs on the client, so it is safe to touch matchMedia here. */
  const [shown, setShown] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${
        shown ? "translate-y-0 opacity-100" : "translate-y-7 opacity-0"
      } ${className}`}
      style={{ transitionDelay: shown ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
