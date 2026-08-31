"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts from zero to `value` when scrolled into view.
 *
 * Driven by requestAnimationFrame with an ease-out curve, so the number decel-
 * erates into place rather than ticking linearly. Reduced-motion users get the
 * final value immediately.
 *
 * `tabular-nums` keeps the digits from jittering as the width changes.
 */
export default function CountUp({
  value,
  duration = 1400,
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [display, setDisplay] = useState(reduced ? value : 0);
  const [done, setDone] = useState(reduced);

  useEffect(() => {
    const el = ref.current;
    if (!el || done) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setDone(true);

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // easeOutCubic
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [value, duration, done]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {display}
      {suffix}
    </span>
  );
}
