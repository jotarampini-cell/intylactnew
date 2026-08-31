"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Moves its children at a different rate to the page scroll, creating depth.
 *
 * Reads scroll position inside requestAnimationFrame and writes a transform
 * only — no layout properties — so it stays on the compositor. Elements are
 * only tracked while near the viewport, and the whole effect is skipped under
 * reduced-motion.
 *
 * `speed` is the fraction of scroll distance to offset by: negative values rise
 * as the page scrolls, positive values lag behind.
 */
export default function Parallax({
  children,
  speed = -0.12,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // Distance of the element's centre from the viewport's centre
      const fromCentre = rect.top + rect.height / 2 - window.innerHeight / 2;
      setOffset(fromCentre * speed);
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    // Only track while the element is anywhere near the viewport
    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) update();
      },
      { rootMargin: "200px 0px" },
    );

    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ transform: `translate3d(0, ${offset.toFixed(1)}px, 0)`, willChange: "transform" }}
    >
      {children}
    </div>
  );
}
