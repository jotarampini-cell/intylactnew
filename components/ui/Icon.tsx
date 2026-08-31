/**
 * Icon system.
 *
 * Before this, 17 files each drew their own inline SVG with nine different
 * stroke widths (1.4 → 3.2). Icons that don't share a grid, a weight and a
 * terminal style never read as one family, and that inconsistency is what makes
 * an interface feel unfinished.
 *
 * Rules, applied to every path below:
 *   · 24×24 grid
 *   · 1.6 stroke, round caps and joins
 *   · no fills, so a single path set works on any background
 *   · currentColor throughout
 *
 * Filled marks (star, play) are the deliberate exception and are declared with
 * `filled: true`, since an outlined star reads as "empty rating".
 */

export type IconName =
  // navigation & chrome
  | "arrow-right"
  | "arrow-left"
  | "chevron-right"
  | "chevron-left"
  | "chevron-down"
  | "menu"
  | "close"
  | "plus"
  | "check"
  | "search"
  // categories
  | "drop"
  | "soap"
  | "wipes"
  | "capsule"
  | "cup"
  | "pack"
  // claims
  | "rabbit"
  | "wheat"
  | "leaf"
  | "apple"
  | "no-alcohol"
  | "shield"
  // commerce & trust
  | "bag"
  | "truck"
  | "star"
  | "play"
  | "heart"
  | "sparkle";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M4.5 12h14M12.5 5.5L19 12l-6.5 6.5" />,
  "arrow-left": <path d="M19.5 12h-14M11.5 5.5L5 12l6.5 6.5" />,
  "chevron-right": <path d="M9.5 5.5L16 12l-6.5 6.5" />,
  "chevron-left": <path d="M14.5 5.5L8 12l6.5 6.5" />,
  "chevron-down": <path d="M5.5 9.5L12 16l6.5-6.5" />,
  menu: <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />,
  close: <path d="M6 6l12 12M18 6L6 18" />,
  plus: <path d="M12 5v14M5 12h14" />,
  check: <path d="M4.5 12.5l5 5 10-11" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l4.5 4.5" />
    </>
  ),

  drop: (
    <>
      <path d="M12 3.2s6.2 6.4 6.2 10.4A6.2 6.2 0 015.8 13.6C5.8 9.6 12 3.2 12 3.2z" />
      <path d="M9.4 14.6a2.7 2.7 0 002.6 2.3" />
    </>
  ),
  soap: (
    <>
      <rect x="4" y="9.5" width="16" height="10.5" rx="3" />
      <path d="M8.2 9.5V7.8a3.8 3.8 0 017.6 0v1.7" />
      <path d="M12 13.5v3" />
    </>
  ),
  wipes: (
    <>
      <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
      <path d="M8 10.5h8M8 14h5" />
    </>
  ),
  capsule: (
    <>
      <rect x="3.2" y="8.2" width="17.6" height="7.6" rx="3.8" transform="rotate(-32 12 12)" />
      <path d="M9.2 14.8l5.6-5.6" />
    </>
  ),
  cup: (
    <>
      <path d="M6 5h12l-1.4 9.2a4.7 4.7 0 01-9.2 0z" />
      <path d="M12 18.2V21M8.6 21h6.8" />
    </>
  ),
  pack: (
    <>
      <path d="M12 3.4l8 4v9.2l-8 4-8-4V7.4z" />
      <path d="M4 7.4l8 4 8-4M12 11.4v9.2" />
    </>
  ),

  rabbit: (
    <>
      <path d="M9 11.2c0-3.6-1-7.2-2.6-7.2S4 6.4 5 11.2" />
      <path d="M15 11.2c0-3.6 1-7.2 2.6-7.2S20 6.4 19 11.2" />
      <path d="M6 14.4a6 6 0 0112 0v2.8a3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      <path d="M10.2 15.4h.01M13.8 15.4h.01" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 20.8V9.2" />
      <path d="M12 9.2c0-2.6 1.7-4.7 3.7-5.2 0 2.6-1.6 4.8-3.7 5.2z" />
      <path d="M12 9.2C12 6.6 10.3 4.5 8.3 4c0 2.6 1.6 4.8 3.7 5.2z" />
      <path d="M12 14.4c0-2.3 1.6-4.2 3.4-4.6 0 2.3-1.5 4.1-3.4 4.6z" />
      <path d="M12 14.4c0-2.3-1.6-4.2-3.4-4.6 0 2.3 1.5 4.1 3.4 4.6z" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19.2c0-8.4 5.2-13.6 14.6-13.6 0 9.4-5.2 14.6-13.6 14.6H5z" />
      <path d="M5.4 19c3.1-4.2 6.2-6.3 10.4-7.8" />
    </>
  ),
  apple: (
    <>
      <path d="M12 8.2c-3.6-2.1-7.2 0-7.2 4.6 0 4.6 3.6 8.8 7.2 8.8s7.2-4.2 7.2-8.8c0-4.6-3.6-6.7-7.2-4.6z" />
      <path d="M12 8.2c0-2.1 1-3.8 3.1-4.6" />
    </>
  ),
  "no-alcohol": (
    <>
      <path d="M8 3.2h8l-1 6.2a3.1 3.1 0 01-6 0z" />
      <path d="M12 12.4v7.4M9 19.8h6" />
      <path d="M4 4l16 16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.2l7.2 3v5.6c0 4.5-3 8.4-7.2 9.8-4.2-1.4-7.2-5.3-7.2-9.8V6.2z" />
      <path d="M9.2 12.2l2 2 3.6-3.9" />
    </>
  ),

  bag: (
    <>
      <path d="M6 8.2h12l-1 11.2a2.1 2.1 0 01-2.1 1.9H9.1A2.1 2.1 0 017 19.4z" />
      <path d="M9.4 8.2V6.6a2.6 2.6 0 015.2 0v1.6" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3zM14 10.5h3.8L21 13.6V16h-7z" />
      <circle cx="7" cy="18.4" r="1.7" />
      <circle cx="17.4" cy="18.4" r="1.7" />
    </>
  ),
  heart: (
    <path d="M12 20.4l-1.4-1.3C6 15 3.2 12.4 3.2 9.2A4.6 4.6 0 017.8 4.6c1.6 0 3.1.8 4.2 2 1.1-1.2 2.6-2 4.2-2a4.6 4.6 0 014.6 4.6c0 3.2-2.8 5.8-7.4 9.9z" />
  ),
  sparkle: (
    <path d="M12 3.2l1.9 5.7 5.7 1.9-5.7 1.9-1.9 5.7-1.9-5.7-5.7-1.9 5.7-1.9z" />
  ),

  // Filled marks
  star: <path d="M12 2.6l2.9 6.2 6.8.8-5 4.7 1.3 6.7L12 17.6l-6 3.4 1.3-6.7-5-4.7 6.8-.8z" />,
  play: <path d="M8 5.2v13.6L19 12z" />,
};

const filled: Partial<Record<IconName, boolean>> = {
  star: true,
  play: true,
  heart: false,
};

export default function Icon({
  name,
  size,
  className = "",
  strokeWidth = 1.6,
}: {
  name: IconName;
  /** Omit when sizing via Tailwind classes, which then win cleanly. */
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  const isFilled = filled[name];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFilled ? "currentColor" : "none"}
      stroke={isFilled ? "none" : "currentColor"}
      strokeWidth={isFilled ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {paths[name]}
    </svg>
  );
}
