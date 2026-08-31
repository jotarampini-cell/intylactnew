"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";
import ScallopDivider from "@/components/ui/ScallopDivider";

type Slide = {
  eyebrow?: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  gradient: string;
};

const slides: Slide[] = [
  {
    eyebrow: "Ellas nos necesitan",
    title: "En una catástrofe, la salud íntima es una urgencia",
    body: "Convierte un cono unitario en salud íntima. Con la compra de cada unidad, donamos directamente insumos y atención a quienes más lo necesitan.",
    cta: { label: "Comprar con propósito", href: "/ellas-nos-necesitan" },
    gradient: "var(--grad-hero-rich)",
  },
  {
    eyebrow: "Cuidado diario",
    title: "Equilibrio para tu zona V, todos los días",
    body: "Probióticos e inositol en una fórmula que respeta tu pH natural y acompaña a tu cuerpo en cada etapa.",
    cta: { label: "Ver productos", href: "/tienda" },
    gradient: "var(--grad-hero)",
  },
  {
    eyebrow: "IntyProb",
    title: "Bienestar íntimo que empieza desde adentro",
    body: "Cápsulas con probióticos e inositol para apoyar tu equilibrio hormonal y tu microbiota.",
    cta: { label: "Conocer IntyProb", href: "/tienda/intyprob" },
    gradient: "var(--grad-warm)",
  },
];

const INTERVAL = 6500;

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const regionRef = useRef<HTMLDivElement>(null);

  const go = useCallback((n: number) => {
    setIndex((n + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    // Respect reduced-motion by not auto-advancing at all.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, INTERVAL);
    return () => window.clearInterval(id);
  }, [paused, index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(index + 1);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(index - 1);
    }
  };

  const active = slides[index];

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Destacados de Intylact"
      className="relative isolate overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={onKeyDown}
      ref={regionRef}
      tabIndex={-1}
    >
      {/* Gradient backdrop crossfades between slides */}
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden="true"
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: s.gradient, opacity: i === index ? 1 : 0 }}
        />
      ))}

      <div className="relative mx-auto grid max-w-[1280px] items-center gap-10 px-[22px] pb-[clamp(5rem,10vw,9rem)] pt-[clamp(3rem,7vw,6rem)] lg:grid-cols-[1.05fr_1fr]">
        <div
          aria-live="polite"
          aria-atomic="true"
          className="max-w-[46ch]"
        >
          {active.eyebrow && (
            <p className="mb-3 inline-block rounded-full bg-white/85 px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.14em] text-teal-900">
              {active.eyebrow}
            </p>
          )}

          <h1 className="font-heading text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05] text-white drop-shadow-[0_2px_12px_rgba(0,48,60,0.25)]">
            {active.title}
          </h1>

          <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-white/95 sm:text-lg">
            {active.body}
          </p>

          <div className="mt-8">
            <Button href={active.cta.href} variant="white" size="lg">
              {active.cta.label}
            </Button>
          </div>
        </div>

        {/* Product stage — placeholder until real transparent PNGs land in /public/products */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[420px] place-items-center lg:grid">
          <div className="absolute inset-6 rounded-[46%_54%_50%_50%/52%_48%_52%_48%] bg-white/30 backdrop-blur-sm" />
          <div className="relative grid h-[62%] w-[62%] place-items-center rounded-3xl bg-white/70 text-center">
            <span className="px-4 font-heading text-sm font-medium text-teal-900/70">
              Imagen de producto
            </span>
          </div>
        </div>
      </div>

      {/* Slide controls */}
      <div className="relative z-10 mx-auto flex max-w-[1280px] items-center gap-3 px-[22px] pb-14">
        <button
          type="button"
          onClick={() => go(index - 1)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-teal-900 transition-colors hover:bg-white"
        >
          <span className="sr-only">Anterior</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button
          type="button"
          onClick={() => go(index + 1)}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-teal-900 transition-colors hover:bg-white"
        >
          <span className="sr-only">Siguiente</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ul className="ml-2 flex items-center gap-2">
          {slides.map((s, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-current={i === index}
                className={`block h-2.5 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2.5 bg-white/55 hover:bg-white/80"
                }`}
              >
                <span className="sr-only">Ir a la diapositiva {i + 1}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <ScallopDivider color="text-cream" position="bottom" />
    </section>
  );
}
