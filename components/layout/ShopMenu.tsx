"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { categories, products } from "@/lib/products";
import { formatPrice } from "@/lib/commerce";

const icons: Record<string, React.ReactNode> = {
  suplemento: <><rect x="3.5" y="8" width="17" height="8" rx="4" transform="rotate(-30 12 12)" /><path d="M9 15l6-6" /></>,
  jabon: <><rect x="4" y="9" width="16" height="11" rx="3" /><path d="M8 9V7.5a4 4 0 018 0V9" /></>,
  toallitas: <><rect x="4" y="6" width="16" height="12" rx="2.5" /><path d="M8 10h8M8 14h5" /></>,
  gel: <><path d="M12 3.5s6 6.2 6 10.1A6 6 0 016 13.6C6 9.7 12 3.5 12 3.5z" /><path d="M9.5 14.5a2.6 2.6 0 002.5 2.2" /></>,
  copa: <><path d="M6 5h12l-1.4 9a4.7 4.7 0 01-9.2 0z" /><path d="M12 18v3M8.5 21h7" /></>,
  pack: <><path d="M4 8l8-4 8 4v8l-8 4-8-4z" /><path d="M4 8l8 4 8-4M12 12v8" /></>,
};

/**
 * Desktop mega-menu for "Tienda".
 *
 * Opens on hover and on focus, so it works for pointer and keyboard alike, and
 * closes on Escape or when focus leaves the wrapper. A short close delay keeps
 * it from vanishing while the pointer crosses the gap to the panel.
 */
export default function ShopMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  const show = () => {
    window.clearTimeout(timer.current);
    setOpen(true);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(false), 140);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const picks = products.filter((p) => p.featured).slice(0, 3);

  return (
    <div
      ref={wrap}
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocusCapture={show}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href="/tienda"
        aria-expanded={open}
        className="inline-flex items-center gap-1 font-heading text-[11px] font-medium uppercase tracking-[0.08em] text-teal-900 transition-colors duration-300 ease-[var(--ease-brand)] hover:text-coral-500"
      >
        Tienda
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
          className={`transition-transform duration-300 ease-[var(--ease-brand)] ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>

      <div
        /* Anchored to the trigger's left edge rather than centred: at 880px
           wide, centring pushed the panel past the viewport's left edge. */
        className={`absolute left-0 top-full z-50 w-[min(880px,calc(100vw-44px))] pt-5 transition-all duration-300 ease-[var(--ease-brand)] ${
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="grid grid-cols-[1.1fr_1fr] gap-7 rounded-[1.5rem] bg-white p-7 shadow-[0_24px_60px_rgba(0,48,60,.18)]">
          <div>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-900/45">
              Por categoría
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-1.5">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link
                    href={`/tienda?categoria=${c.id}`}
                    onClick={() => setOpen(false)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-cream"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-mint-100 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-110">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="text-teal-900">
                        {icons[c.id]}
                      </svg>
                    </span>
                    <span className="min-w-0">
                      <span className="block font-heading text-[13px] font-semibold leading-tight text-teal-900">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block truncate text-[11px] text-teal-900/55">
                        {c.blurb}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/tienda"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-coral-500 transition-colors duration-300 ease-[var(--ease-brand)] hover:text-teal-900"
            >
              Ver todos los productos
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div>
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-900/45">
              Destacados
            </p>
            <ul className="mt-4 space-y-1.5">
              {picks.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/tienda/${p.slug}`}
                    onClick={() => setOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl p-2 transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-cream`}
                  >
                    <span className={`grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg bg-gradient-to-br ${p.accent}`}>
                      {p.image && (
                        <Image
                          src={p.image}
                          alt=""
                          width={112}
                          height={112}
                          sizes="56px"
                          className="h-full w-full object-contain p-1.5 transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-110"
                        />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-heading text-[13px] font-semibold text-teal-900">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block font-heading text-[13px] font-bold text-coral-500">
                        {formatPrice(p.price)}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
