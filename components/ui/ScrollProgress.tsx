"use client";

import { useEffect, useState } from "react";

/**
 * Reading-progress bar pinned under the header.
 *
 * Updates inside requestAnimationFrame so scroll events never trigger a layout
 * read/write per frame, and only writes state when the rounded value actually
 * changes.
 */
export default function ScrollProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(100, Math.round((window.scrollY / max) * 100)) : 0;
      setPct((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] bg-teal-900/8"
    >
      <div
        className="h-full origin-left bg-gradient-to-r from-mint-300 via-coral-400 to-pink-500 transition-[width] duration-150 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
