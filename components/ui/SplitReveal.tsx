"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reveals a heading word by word as it enters the viewport.
 *
 * Each word gets its own clipped track and slides up with a small stagger,
 * which reads as intentional typography rather than a generic fade. Words keep
 * their spacing because each is an inline-block inside normal text flow, so the
 * heading still wraps naturally at any width.
 *
 * The full string stays in the DOM as one accessible label; the animated pieces
 * are hidden from assistive tech so a screen reader hears the sentence once.
 */
export default function SplitReveal({
  text,
  as: Tag = "span",
  className = "",
  delay = 0,
}: {
  text: string;
  as?: "span" | "h1" | "h2" | "h3";
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [shown]);

  const words = text.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {/* Screen readers get the sentence once, from this label alone. */}
      <span className="sr-only">{text}</span>

      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          {/* Clipped track: the word slides up from below its own bounds. */}
          <span className="inline-block overflow-hidden align-bottom">
            <span
              className="inline-block will-change-transform"
              style={{
                transform: shown ? "translateY(0)" : "translateY(105%)",
                opacity: shown ? 1 : 0,
                transition:
                  "transform 700ms cubic-bezier(.16,1,.3,1), opacity 500ms ease",
                transitionDelay: `${delay + i * 55}ms`,
              }}
            >
              {word}
            </span>
          </span>
          {/* Space kept in normal flow, outside the clip, so words never merge */}
          {i < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
