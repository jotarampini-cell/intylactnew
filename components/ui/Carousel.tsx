"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

/**
 * Horizontal snap-scroller shared by every product rail.
 *
 * On phones it is the layout; from `sm` up the caller can pass grid classes via
 * `gridClass` and the rail collapses into a normal grid. Arrows appear only when
 * the content actually overflows, and are hidden from assistive tech because the
 * list itself is already keyboard-scrollable.
 */
export default function Carousel({
  children,
  gridClass = "",
  itemClass = "w-[76vw] max-w-[310px]",
  label,
  showArrows = true,
}: {
  children: ReactNode[];
  /** Classes applied from `sm` up, e.g. "sm:grid sm:grid-cols-3" */
  gridClass?: string;
  /** Width of each item while in scroller mode */
  itemClass?: string;
  label: string;
  showArrows?: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const overflowing = el.scrollWidth > el.clientWidth + 2;
    setCanPrev(overflowing && el.scrollLeft > 4);
    setCanNext(
      overflowing && el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    );
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.querySelector("li");
    const step = first ? first.getBoundingClientRect().width + 16 : 320;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {showArrows && (
        <>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => scrollBy(-1)}
            className={`absolute -left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-teal-900 shadow-[0_4px_18px_rgba(0,48,60,.16)] transition-all duration-300 hover:scale-105 lg:grid ${
              canPrev ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-hidden="true"
            tabIndex={-1}
            onClick={() => scrollBy(1)}
            className={`absolute -right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-teal-900 shadow-[0_4px_18px_rgba(0,48,60,.16)] transition-all duration-300 hover:scale-105 lg:grid ${
              canNext ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      <ul
        ref={ref}
        aria-label={label}
        className={`-mx-[22px] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[22px] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 ${gridClass}`}
      >
        {children.map((child, i) => (
          <li
            key={i}
            className={`${itemClass} shrink-0 snap-center sm:w-auto sm:max-w-none`}
          >
            {child}
          </li>
        ))}
      </ul>
    </div>
  );
}
