"use client";

import { useState } from "react";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

/**
 * Brand video.
 *
 * DROP-IN: set VIDEO to a YouTube id (`{ type: "youtube", id: "..." }`) or a
 * file in /public/video (`{ type: "file", src: "/video/marca.mp4" }`). Until
 * then the poster panel renders on its own and the play button is hidden, so
 * the section never promises a video that isn't there.
 *
 * The embed only mounts after the click — an iframe on load would pull ~1MB of
 * player code into the initial page weight.
 */
const VIDEO: { type: "youtube"; id: string } | { type: "file"; src: string } | null =
  null;

const points = [
  "Formulado con prebióticos e inositol",
  "Respeta el pH natural de tu zona íntima",
  "Dermatológicamente probado",
];

export default function VideoFeature() {
  const [playing, setPlaying] = useState(false);

  return (
    <SectionShell
      background="bg-cream"
      aria-labelledby="video-titulo"
      className="overflow-hidden"
    >
      <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
        <Reveal>
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
              Conoce Intylact
            </p>
            <h2
              id="video-titulo"
              className="mt-3 font-heading text-[clamp(1.9rem,4.6vw,3rem)] font-bold leading-[1.06] tracking-[-0.02em]"
            >
              La ciencia detrás de tu cuidado íntimo
            </h2>
            <p className="mt-4 max-w-[48ch] text-[15px] leading-relaxed text-teal-900/70 sm:text-base">
              Cada fórmula nace de una idea simple: tu zona íntima merece el
              mismo cuidado que el resto de tu cuerpo, con ingredientes que
              trabajan a favor de tu equilibrio natural.
            </p>

            <ul className="mt-6 space-y-2.5 sm:mt-7 sm:space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className="text-[15px] leading-relaxed text-teal-900/85">{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="relative aspect-video overflow-hidden rounded-[1.5rem] sm:rounded-[2rem]">
            {playing && VIDEO ? (
              VIDEO.type === "youtube" ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO.id}?autoplay=1`}
                  title="Video de Intylact"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <video
                  src={VIDEO.src}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )
            ) : (
              <>
                {/* Poster: brand gradient with soft blooms, no image request */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{ background: "var(--grad-hero-rich)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -left-10 top-1/4 h-56 w-56 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(101,212,220,.7), transparent 70%)" }}
                />
                <div
                  aria-hidden="true"
                  className="absolute -right-8 bottom-0 h-64 w-64 rounded-full blur-3xl"
                  style={{ background: "radial-gradient(circle, rgba(224,86,127,.55), transparent 70%)" }}
                />

                {VIDEO ? (
                  <button
                    type="button"
                    onClick={() => setPlaying(true)}
                    className="group absolute inset-0 grid place-items-center"
                  >
                    <span className="sr-only">Reproducir video</span>
                    <span className="relative grid h-16 w-16 place-items-center rounded-full bg-white/95 shadow-[0_10px_40px_rgba(0,48,60,.3)] transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-110 sm:h-20 sm:w-20">
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full bg-white/60 motion-safe:animate-[var(--animate-pulse-ring)]"
                      />
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="relative ml-1 text-teal-900">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </span>
                  </button>
                ) : (
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="rounded-full bg-white/85 px-5 py-2.5 font-heading text-[13px] font-semibold text-teal-900/70">
                      Video próximamente
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </Reveal>
      </div>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
