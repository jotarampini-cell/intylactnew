"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Instagram reels — full-bleed showcase.
 *
 * The section sits on deep teal and runs edge to edge, so the rail reads as a
 * feature rather than another card grid on cream. Each reel is a 9:16 video at
 * the size it was shot for: ~76vh on phones, a three-across grid from lg.
 *
 * Playback:
 *  · Videos preload and autoplay muted once near the viewport — the request was
 *    for them to load directly, so `preload="auto"` is deliberate here. Sources
 *    are still gated on proximity so a visitor who never scrolls this far pays
 *    nothing.
 *  · Posters (~30KB each) render instantly, so the tiles are never blank while
 *    the video arrives.
 *  · One shared audio slot: unmuting a reel mutes any other.
 *
 * DROP-IN: `url` should be each reel's own permalink; they currently point at
 * the profile.
 */
type Reel = {
  url: string;
  video: string;
  poster: string;
  caption: string;
  topic: string;
};

const reels: Reel[] = [
  {
    url: "https://instagram.com/intylact",
    video: "/reels/red-flags-higiene.mp4",
    poster: "/reels/posters/red-flags-higiene.jpg",
    caption: "Red flags de higiene íntima",
    topic: "Educación",
  },
  {
    url: "https://instagram.com/intylact",
    video: "/reels/detergente-irritacion.mp4",
    poster: "/reels/posters/detergente-irritacion.jpg",
    caption: "¿Tu detergente te está irritando?",
    topic: "Con especialista",
  },
  {
    url: "https://instagram.com/intylact",
    video: "/reels/jabon-ropa-intima.mp4",
    poster: "/reels/posters/jabon-ropa-intima.jpg",
    caption: "Tu ropa íntima merece su propio jabón",
    topic: "Producto",
  },
];

function ReelCard({
  reel,
  index,
  soundOn,
  onToggleSound,
}: {
  reel: Reel;
  index: number;
  soundOn: boolean;
  onToggleSound: (index: number) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const loader = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          loader.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    /* A coarse threshold list (0 / 0.5 / 1) missed cards that were already
       fully visible when the observer mounted: no boundary was ever crossed, so
       the callback never fired with a usable ratio and the video sat paused.
       Sampling every 10% guarantees an initial callback in every case. */
    const steps = Array.from({ length: 11 }, (_, i) => i / 10);
    const player = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio >= 0.45),
      { threshold: steps },
    );

    loader.observe(el);
    player.observe(el);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  /* Derived so the effect depends on one boolean: re-running it on unrelated
     state changes could pause a video whose play() was still settling.
     Note: browsers also pause playback whenever the tab is backgrounded, so a
     paused video in a hidden tab is expected, not a fault here. */
  const shouldPlay = near && inView;
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (shouldPlay) v.play().catch(() => {});
    else v.pause();
  }, [shouldPlay]);

  /* Muting is kept out of the playback effect: changing the audio slot must not
     re-enter the play/pause logic. */
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = !soundOn;
  }, [soundOn]);

  return (
    <div
      ref={cardRef}
      className="group relative h-full w-full overflow-hidden rounded-[20px] bg-teal-700/40 shadow-[0_18px_50px_rgba(0,0,0,.35)] transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] lg:hover:-translate-y-2"
    >
      {/* Poster shows immediately; the video fades over it once it can play */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={reel.poster}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <video
        ref={videoRef}
        src={near ? reel.video : undefined}
        poster={reel.poster}
        muted={!soundOn}
        loop
        playsInline
        preload="auto"
        onCanPlay={() => setReady(true)}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
      />

      <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-white/15 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-white backdrop-blur">
        {reel.topic}
      </span>

      <button
        type="button"
        onClick={() => onToggleSound(index)}
        aria-pressed={soundOn}
        className="absolute right-3.5 top-3.5 z-20 grid h-11 w-11 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition-[transform,background-color] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:scale-105 hover:bg-black/70"
      >
        <span className="sr-only">
          {soundOn ? `Silenciar: ${reel.caption}` : `Activar sonido: ${reel.caption}`}
        </span>
        <Icon name={soundOn ? "sound-on" : "sound-off"} size={19} />
      </button>

      <a
        href={reel.url}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-x-0 bottom-0 z-10 block p-4 sm:p-5"
      >
        <span className="block font-heading text-[15px] font-semibold leading-snug text-white sm:text-base">
          {reel.caption}
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-medium text-white/85">
          Ver en Instagram
          <Icon
            name="arrow-right"
            size={14}
            className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:translate-x-1"
          />
        </span>
      </a>
    </div>
  );
}

export default function InstagramReels() {
  const [audioIndex, setAudioIndex] = useState<number | null>(null);
  const toggle = useCallback((i: number) => {
    setAudioIndex((cur) => (cur === i ? null : i));
  }, []);

  return (
    <section
      aria-labelledby="reels-titulo"
      className="relative isolate overflow-hidden bg-teal-900 py-[clamp(3rem,6vw,5.5rem)]"
    >
      {/* Colour blooms give the dark band depth without an image request */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(224,86,127,.4), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(101,212,220,.35), transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-[1280px] px-[22px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur">
                <span className="relative grid h-2 w-2 place-items-center">
                  <span className="absolute h-2 w-2 rounded-full bg-coral-400 motion-safe:animate-[var(--animate-pulse-ring)]" />
                  <span className="h-2 w-2 rounded-full bg-coral-400" />
                </span>
                @intylact
              </p>
              <h2
                id="reels-titulo"
                className="mt-4 max-w-[16ch] font-heading text-[clamp(1.9rem,4.6vw,3rem)] font-bold leading-[1.04] tracking-[-0.02em] text-white"
              >
                Hablemos de lo que nadie habla
              </h2>
              <p className="mt-3 max-w-[46ch] text-[15px] leading-relaxed text-white/70">
                Salud íntima sin rodeos ni vergüenza, con especialistas y con
                nuestra comunidad.
              </p>
            </div>

            <a
              href="https://instagram.com/intylact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-white px-6 font-heading text-[15px] font-semibold text-teal-900 transition-[transform,background-color] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-mint-300"
            >
              Seguir a @intylact
              <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </Reveal>
      </div>

      <ul
        aria-label="Reels de Intylact"
        className="
          relative mt-8 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-[22px] pb-3
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          lg:mx-auto lg:mt-11 lg:grid lg:max-w-[1280px] lg:grid-cols-3 lg:gap-5
          lg:overflow-visible lg:pb-0
        "
      >
        {reels.map((r, i) => (
          <li
            key={r.video}
            className="
              h-[76vh] max-h-[700px] w-[78vw] max-w-[400px] shrink-0 snap-center
              lg:h-auto lg:aspect-[9/16] lg:w-auto lg:max-h-none lg:max-w-none
            "
          >
            <Reveal delay={i * 90} className="h-full">
              <ReelCard
                reel={r}
                index={i}
                soundOn={audioIndex === i}
                onToggleSound={toggle}
              />
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="relative mt-3 text-center text-[13px] text-white/45 lg:hidden">
        Desliza para ver más →
      </p>
    </section>
  );
}
