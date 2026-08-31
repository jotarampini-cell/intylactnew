type Props = { name: string; className?: string };

/**
 * Line icons for the benefit ticker, drawn as simple strokes so they read
 * cleanly at ~32px and inherit currentColor.
 */
const paths: Record<string, React.ReactNode> = {
  rabbit: (
    <>
      <path d="M9 11c0-3.5-1-7-2.5-7S4 6 5 11" />
      <path d="M15 11c0-3.5 1-7 2.5-7S20 6 19 11" />
      <path d="M6 14a6 6 0 0112 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3z" />
      <circle cx="10" cy="15" r=".6" fill="currentColor" />
      <circle cx="14" cy="15" r=".6" fill="currentColor" />
    </>
  ),
  wheat: (
    <>
      <path d="M12 21V9" />
      <path d="M12 9c0-2.5 1.6-4.5 3.5-5C15.5 6.5 14 8.6 12 9z" />
      <path d="M12 9C12 6.5 10.4 4.5 8.5 4 8.5 6.5 10 8.6 12 9z" />
      <path d="M12 14c0-2.2 1.5-4 3.2-4.4C15.2 11.8 13.8 13.5 12 14z" />
      <path d="M12 14c0-2.2-1.5-4-3.2-4.4C8.8 11.8 10.2 13.5 12 14z" />
      <path d="M4 21h16" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14H5z" />
      <path d="M5 19c3-4 6-6 10-7.5" />
    </>
  ),
  drop: (
    <>
      <path d="M12 3.5s6 6.2 6 10.1A6 6 0 016 13.6C6 9.7 12 3.5 12 3.5z" />
      <path d="M9 17.5h6" />
    </>
  ),
  apple: (
    <>
      <path d="M12 8c-3.5-2-7 0-7 4.5C5 17 8.5 21 12 21s7-4 7-8.5C19 8 15.5 6 12 8z" />
      <path d="M12 8c0-2 1-3.6 3-4.4" />
    </>
  ),
  "no-alcohol": (
    <>
      <path d="M8 3h8l-1 6a3 3 0 01-3 2.6A3 3 0 019 9z" />
      <path d="M12 12v7" />
      <path d="M9 21h6" />
      <path d="M4 4l16 16" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3l7 3v5.5c0 4.4-2.9 8.2-7 9.5-4.1-1.3-7-5.1-7-9.5V6z" />
      <path d="M9.2 12.2l2 2 3.6-3.9" />
    </>
  ),
};

export default function BenefitIcon({ name, className = "" }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {paths[name] ?? paths.leaf}
    </svg>
  );
}
