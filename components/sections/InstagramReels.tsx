"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Instagram reels rail.
 *
 * On phones this is a near-full-screen snap carousel: each reel fills ~78vh so
 * the video reads at the size it was shot for, rather than as a thumbnail. From
 * `lg` up it becomes a three-across grid.
 *
 * Playback rules:
 *  · Muted autoplay on the reel currently in view — browsers block autoplay with
 *    sound, and a video that starts loud is hostile anyway.
 *  · One shared audio state across the rail: unmuting a reel mutes any other, so
 *    two tracks can never overlap.
 *  · Nothing downloads until the card is near the viewport; these files are
 *    several MB each.
 *
 * DROP-IN: `url` should be the reel's own permalink. Right now they point at the
 * profile, so every card opens the same place.
 */
type Reel = {
  url: string;
  video: string;
  poster?: string;
  caption: string;
  accent: string;
};

const reels: Reel[] = [
  {
    url: "https://instagram.com/intylact",
    video: "/reels/red-flags-higiene.mp4",
    caption: "Red flags de higiene íntima",
    accent: "from-coral-100 to-coral-200",
  },
  {
    url: "https://instagram.com/intylact",
    video: "/reels/detergente-irritacion.mp4",
    caption: "¿Tu detergente te está irritando?",
    accent: "from-mint-100 to-mint-300/50",
  },
  {
    url: "https://instagram.com/intylact",
    video: "/reels/jabon-ropa-intima.mp4",
    caption: "Tu ropa íntima merece su propio jabón",
    accent: "from-violet-500/20 to-pink-500/20",
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

  // Attach the source only once the card is close, then autoplay while visible.
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
      { rootMargin: "400px 0px" },
    );

    const player = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting && e.intersectionRatio > 0.55),
      { threshold: [0, 0.55, 1] },
    );

    loader.observe(el);
    player.observe(el);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !near) return;
    if (inView) {
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inView, near]);

  // Keep the element's muted property in sync with the rail's audio state.
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.muted = !soundOn;
  }, [soundOn]);

  return (
    <div
      ref={cardRef}
      className={`group relative h-full w-full overflow-hidden rounded-[18px] bg-gradient-to-br ${reel.accent}`}
    >
      <video
        ref={videoRef}
        src={near ? reel.video : undefined}
        poster={reel.poster}
        muted={!soundOn}
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Scrim keeps the caption legible over any frame */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-teal-900/85 via-teal-900/35 to-transparent"
      />

      {/* Sound toggle — a real button, not part of the outbound link */}
      <button
        type="button"
        onClick={() => onToggleSound(index)}
        aria-pressed={soundOn}
        className="absolute right-3 top-3 z-20 grid h-11 w-11 place-items-center rounded-full bg-teal-900/55 text-white backdrop-blur transition-[transform,background-color] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:scale-105 hover:bg-teal-900/80"
      >
        <span className="sr-only">
          {soundOn ? "Silenciar video" : "Activar sonido"}
        </span>
        <Icon name={soundOn ? "sound-on" : "sound-off"} size={19} />
      </button>

      <span className="absolute left-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full bg-white/90">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-teal-900">
          <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6a.9.9 0 100 1.8.9.9 0 000-1.8zM7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
        </svg>
      </span>

      {/* Caption + link sit above the scrim */}
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
          <Icon name="arrow-right" size={14} />
        </span>
      </a>
    </div>
  );
}

export default function InstagramReels() {
  // One reel may have sound at a time; null means the whole rail is muted.
  const [audioIndex, setAudioIndex] = useState<number | null>(null);

  const toggle = useCallback((i: number) => {
    setAudioIndex((current) => (current === i ? null : i));
  }, []);

  return (
    <section
      aria-labelledby="reels-titulo"
      className="relative overflow-hidden bg-cream py-[clamp(2.75rem,6vw,5rem)]"
    >
      <div className="mx-auto max-w-[1280px] px-[22px]">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
                @intylact
              </p>
              <h2
                id="reels-titulo"
                className="mt-2.5 font-heading text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em]"
              >
                Síguenos en Instagram
              </h2>
            </div>
            <a
              href="https://instagram.com/intylact"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-teal-900 px-5 font-heading text-sm font-semibold text-white transition-colors duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:bg-coral-500"
            >
              Ver perfil
              <Icon name="arrow-right" size={15} />
            </a>
          </div>
        </Reveal>
      </div>

      {/* Phone: near-full-height snap carousel. lg: three-across grid. */}
      <ul
        aria-label="Reels de Intylact"
        className="
          mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[22px] pb-3
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          lg:mx-auto lg:mt-9 lg:grid lg:max-w-[1280px] lg:grid-cols-3 lg:gap-5
          lg:overflow-visible lg:pb-0
        "
      >
        {reels.map((r, i) => (
          <li
            key={r.video}
            /* 78vw leaves ~55px of the next reel visible, which is what tells
               the reader the rail scrolls. At 84vw the peek shrank to 26px and
               read as a cropped edge instead of an affordance. */
            className="
              h-[76vh] max-h-[700px] w-[78vw] max-w-[400px] shrink-0 snap-center
              lg:h-auto lg:aspect-[9/16] lg:w-auto lg:max-h-none lg:max-w-none
            "
          >
            <Reveal delay={i * 80} className="h-full">
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

      <p className="mt-3 text-center text-[13px] text-teal-900/45 lg:hidden">
        Desliza para ver más →
      </p>

      <ScallopDivider color="text-white" position="bottom" />
    </section>
  );
}
