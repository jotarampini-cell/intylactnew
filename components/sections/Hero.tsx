"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import Aurora from "@/components/ui/Aurora";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Icon from "@/components/ui/Icon";

type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  cta: { label: string; href: string };
  secondary?: { label: string; href: string };
  image: string;
  imageAlt: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Cuidado íntimo con ciencia",
    title: "El equilibrio de tu",
    highlight: "zona V",
    body: "Prebióticos, ácido hialurónico y ácido láctico en fórmulas que respetan tu pH natural. Porque cuidarte ahí es cuidarte entera.",
    cta: { label: "Ver productos", href: "/tienda" },
    secondary: { label: "Calcular mi ciclo", href: "#calculadora" },
    image: "/products/group-54.webp",
    imageAlt: "Gel Hidratante Íntimo Intylact de 50 ml con su empaque",
  },
  {
    eyebrow: "IntyProb · 60 cápsulas",
    title: "Tu bienestar empieza",
    highlight: "por dentro",
    body: "Probióticos e inositol que restauran tu flora vaginal, equilibran el pH y fortalecen tu sistema inmunológico.",
    cta: { label: "Conocer IntyProb", href: "/tienda/intyprob" },
    secondary: { label: "Ver toda la línea", href: "/tienda" },
    image: "/products/intyprob.webp",
    imageAlt: "Frasco de IntyProb con 60 cápsulas",
  },
  {
    eyebrow: "Ellas nos necesitan",
    title: "La salud íntima",
    highlight: "no espera",
    body: "En una catástrofe, la higiene íntima es una urgencia. Con cada compra donamos insumos directamente a quienes más lo necesitan.",
    cta: { label: "Comprar con propósito", href: "/ellas-nos-necesitan" },
    image: "/products/group-52.webp",
    imageAlt: "Copas urinarias desechables Intylact",
  },
];

const INTERVAL = 7000;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((n: number) => {
    setIndex((n + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, index]);

  const active = slides[index];

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Destacados de Intylact"
      className="relative isolate min-h-[clamp(520px,78vh,880px)] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") { e.preventDefault(); go(index + 1); }
        if (e.key === "ArrowLeft") { e.preventDefault(); go(index - 1); }
      }}
    >
      <Aurora intensity="vivid" />

      {/* Floating botanical accent from the brand kit */}
      <Image
        src="/brand/floral.png"
        alt=""
        aria-hidden="true"
        width={397}
        height={706}
        sizes="(max-width: 640px) 55vw, 400px"
        className="pointer-events-none absolute -right-16 top-0 h-full w-auto opacity-25 mix-blend-soft-light lg:opacity-40"
      />

      <div className="relative mx-auto grid min-h-[clamp(520px,78vh,880px)] max-w-[1280px] items-center gap-5 px-[22px] pb-20 pt-8 sm:gap-8 sm:pb-24 sm:pt-12 lg:grid-cols-[1.02fr_.98fr] lg:gap-4">
        {/* Copy */}
        <div className="max-w-[52ch]" aria-live="polite" aria-atomic="true">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-teal-900 shadow-sm backdrop-blur">
            <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-coral-500" />
            {active.eyebrow}
          </p>

          <h1 className="mt-5 font-heading text-[clamp(2.4rem,6.4vw,4.6rem)] font-bold leading-[0.98] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgba(0,48,60,.28)]">
            {active.title}{" "}
            <span className="relative inline-block">
              <span className="relative z-10">{active.highlight}</span>
              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[.12em] z-0 h-[.34em] -rotate-1 rounded-full bg-butter-200/85"
              />
            </span>
          </h1>

          <p className="mt-4 max-w-[46ch] text-[clamp(1rem,1.6vw,1.2rem)] leading-relaxed text-white/95 [text-shadow:0_1px_12px_rgba(0,48,60,.25)] sm:mt-6">
            {active.body}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9">
            <Button href={active.cta.href} variant="white" size="lg" className="shadow-lg">
              {active.cta.label}
            </Button>
            {active.secondary && (
              <a
                href={active.secondary.href}
                className="rounded-full border-2 border-white bg-white/15 px-7 py-3.5 font-heading text-base font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-teal-900"
              >
                {active.secondary.label}
              </a>
            )}
          </div>

          {/* Trust strip */}
          <ul className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-1.5 sm:mt-10 sm:gap-x-6">
            {["pH balanceado", "Vegano", "Sin alcohol", "Dermatológicamente probado"].map((t) => (
              <li key={t} className="flex items-center gap-1.5 text-[13px] font-medium text-white/95">
                <Icon name="check" size={15} strokeWidth={2.4} />
                {t}
              </li>
            ))}
          </ul>
        </div>

        {/* Product stage */}
        <div className="relative mx-auto grid w-full max-w-[520px] place-items-center">
          <div
            aria-hidden="true"
            className="absolute inset-4 rounded-[46%_54%_52%_48%/50%_46%_54%_50%] bg-white/25 backdrop-blur-[2px]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-10 rounded-[52%_48%_46%_54%/48%_52%_48%_52%] bg-white/20"
          />
          {slides.map((s, i) => (
            <Image
              key={s.image}
              src={s.image}
              alt={i === index ? s.imageAlt : ""}
              width={620}
              height={620}
              priority={i === 0}
              className={`relative col-start-1 row-start-1 h-auto w-[78%] max-w-[420px] object-contain drop-shadow-[0_28px_50px_rgba(0,48,60,.32)] transition-all duration-700 ${
                i === index ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-x-0 bottom-12 z-10">
        <div className="mx-auto flex max-w-[1280px] items-center gap-3 px-[22px]">
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/85 text-teal-900 backdrop-blur transition-colors hover:bg-white"
          >
            <span className="sr-only">Anterior</span>
            <Icon name="chevron-left" size={18} />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white/85 text-teal-900 backdrop-blur transition-colors hover:bg-white"
          >
            <span className="sr-only">Siguiente</span>
            <Icon name="chevron-right" size={18} />
          </button>

          <ul className="ml-1 flex items-center">
            {slides.map((s, i) => (
              <li key={s.image}>
                {/* 44×44 hit area with a smaller visual dot inside, so the
                    target is thumb-friendly without a chunky indicator. */}
                <button
                  type="button"
                  onClick={() => go(i)}
                  aria-current={i === index}
                  className="grid h-11 w-11 place-items-center"
                >
                  <span className="sr-only">Ir a la diapositiva {i + 1}</span>
                  <span
                    aria-hidden="true"
                    className={`block h-2.5 rounded-full transition-all duration-[var(--dur-fast)] ease-[var(--ease-brand)] ${
                      i === index ? "w-8 bg-white" : "w-2.5 bg-white/60"
                    }`}
                  />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ScallopDivider color="text-cream" position="bottom" />
    </section>
  );
}
