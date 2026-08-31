"use client";

import { useEffect, useRef, useState } from "react";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * Instagram reels rail.
 *
 * DROP-IN: fill `reels` with real posts. Each entry takes the permalink and,
 * ideally, a poster image and a local video file:
 *
 *   { url: "https://instagram.com/reel/XXXX", poster: "/reels/01.jpg",
 *     video: "/reels/01.mp4", caption: "…" }
 *
 * Videos play inline, muted, on hover/tap; entries without a `video` stay as a
 * poster tile that links out to Instagram. Instagram's own embed script is
 * deliberately avoided — it pulls in several hundred KB and sets third-party
 * cookies, which would undo the performance and privacy work here.
 */
type Reel = {
  url: string;
  poster?: string;
  video?: string;
  caption: string;
  /** Gradient placeholder while there is no poster yet */
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

function ReelCard({ reel }: { reel: Reel }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [playing, setPlaying] = useState(false);

  /* The <source> is only attached once the card is near the viewport. These
     files are several MB each; mounting them with the page would download
     ~18MB before the visitor ever scrolls this far. */
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || nearViewport) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [nearViewport]);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <a
      ref={cardRef}
      href={reel.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={play}
      onMouseLeave={stop}
      onFocus={play}
      onBlur={stop}
      className={`group relative block aspect-[9/16] overflow-hidden rounded-[16px] bg-gradient-to-br ${reel.accent} transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-1.5`}
    >
      {reel.video ? (
        <video
          ref={videoRef}
          src={nearViewport ? reel.video : undefined}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : reel.poster ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={reel.poster} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <span className="absolute inset-0 grid place-items-center">
          <Icon name="play" size={34} className="text-white/70" />
        </span>
      )}

      {/* Legibility scrim under the caption */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-teal-900/80 to-transparent"
      />

      <span className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-teal-900">
          <path d="M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6a.9.9 0 100 1.8.9.9 0 000-1.8zM7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" />
        </svg>
      </span>

      {!playing && reel.video && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-white/90 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:scale-110">
            <Icon name="play" size={20} className="ml-0.5 text-teal-900" />
          </span>
        </span>
      )}

      <span className="absolute inset-x-0 bottom-0 p-3.5">
        <span className="block text-[13px] font-medium leading-snug text-white">
          {reel.caption}
        </span>
      </span>
    </a>
  );
}

export default function InstagramReels() {
  return (
    <SectionShell background="bg-cream" aria-labelledby="reels-titulo" className="overflow-hidden">
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

      {/* Three columns from sm up — the rail is capped at the number of real
          reels, so a wider grid would leave gaps. */}
      <ul className="mt-8 -mx-[22px] flex snap-x snap-mandatory gap-3 overflow-x-auto px-[22px] pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0">
        {reels.map((r, i) => (
          <li key={i} className="w-[58vw] max-w-[230px] shrink-0 snap-center sm:w-auto sm:max-w-none">
            <Reveal delay={i * 70}>
              <ReelCard reel={r} />
            </Reveal>
          </li>
        ))}
      </ul>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
