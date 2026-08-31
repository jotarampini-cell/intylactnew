"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navLinks, categories } from "@/lib/products";
import Logo from "@/components/ui/Logo";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ShopMenu from "@/components/layout/ShopMenu";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on Escape, and lock body scroll while it's open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ease-[var(--ease-brand)] ${
        scrolled
          ? "bg-cream/95 shadow-[0_2px_20px_rgba(0,48,60,0.08)] backdrop-blur"
          : "bg-transparent"
      }`}
    >
      {/* Reading progress — only once the hero is behind us */}
      {scrolled && <ScrollProgress />}
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-4 px-[22px] py-4">
        <Link href="/" aria-label="Intylact — Inicio" className="shrink-0">
          <Logo className="h-8 w-auto" priority />
        </Link>

        {/* Desktop navigation — "Tienda" expands into the mega-menu */}
        <nav aria-label="Principal" className="hidden xl:block">
          <ul className="flex items-center gap-6">
            {navLinks.map((link) =>
              link.href === "/tienda" ? (
                <li key={link.href}>
                  <ShopMenu />
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-heading text-[11px] font-medium uppercase tracking-[0.08em] text-teal-900 transition-colors duration-300 ease-[var(--ease-brand)] hover:text-coral-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/tienda"
            className="hidden rounded-full bg-coral-500 px-5 py-2.5 font-heading text-sm font-medium text-white transition-colors hover:bg-coral-400 hover:text-teal-900 sm:inline-flex"
          >
            Comprar
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-movil"
            className="-mr-1.5 inline-flex h-12 w-12 items-center justify-center rounded-full text-teal-900 transition-colors hover:bg-teal-900/5 xl:hidden"
          >
            <span className="sr-only">{open ? "Cerrar menú" : "Abrir menú"}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h18M3 12h18M3 18h18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="menu-movil"
        hidden={!open}
        className="max-h-[calc(100dvh-72px)] overflow-y-auto border-t border-teal-900/10 bg-cream xl:hidden"
      >
        <nav aria-label="Principal móvil" className="px-[22px] pb-6 pt-4">
          {/* Category shortcuts, so the catalogue is one tap away */}
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-900/45">
            Comprar por categoría
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {categories.map((c, i) => (
              <li
                key={c.id}
                className="motion-safe:animate-[var(--animate-fade-up)]"
                style={{ animationDelay: `${i * 45}ms` }}
              >
                <Link
                  href={`/tienda?categoria=${c.id}`}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-14 items-center rounded-xl bg-gradient-to-br ${c.accent} px-4 font-heading text-[13px] font-semibold leading-tight text-teal-900`}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="mt-5 flex flex-col gap-1 border-t border-teal-900/10 pt-4">
            {navLinks.map((link, i) => (
              <li
                key={link.href}
                className="motion-safe:animate-[var(--animate-fade-up)]"
                style={{ animationDelay: `${(categories.length + i) * 40}ms` }}
              >
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center justify-between rounded-xl px-3 font-heading text-base font-medium text-teal-900 transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-teal-900/5 active:bg-teal-900/10"
                >
                  {link.label}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900/30">
                    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
