type Props = {
  /** Tailwind text-* colour class; the SVG fills with currentColor */
  color?: string;
  /** "top" sits at a section's top edge, "bottom" at its lower edge */
  position?: "top" | "bottom";
  variant?: "scallop" | "wave";
  className?: string;
};

/**
 * Decorative edge between stacked sections. Rendered as inline SVG (rather than
 * an image) so it inherits currentColor and can be recoloured per section.
 *
 * The parent section needs `relative`; this positions itself against that.
 */
export default function ScallopDivider({
  color = "text-cream",
  position = "bottom",
  variant = "scallop",
  className = "",
}: Props) {
  const flip = position === "top" ? "top-0 -translate-y-[1px]" : "bottom-0 translate-y-[1px] rotate-180";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 ${flip} ${color} ${className} leading-[0]`}
    >
      <svg
        viewBox="0 0 1440 48"
        preserveAspectRatio="none"
        className="block h-[clamp(24px,4vw,48px)] w-full"
        focusable="false"
      >
        {variant === "scallop" ? (
          /* Repeating semicircles — 20 arcs of 72px across a 1440 viewBox */
          <path
            fill="currentColor"
            d="M0,48 L0,24 C36,-8 108,-8 144,24 C180,-8 252,-8 288,24 C324,-8 396,-8 432,24 C468,-8 540,-8 576,24 C612,-8 684,-8 720,24 C756,-8 828,-8 864,24 C900,-8 972,-8 1008,24 C1044,-8 1116,-8 1152,24 C1188,-8 1260,-8 1296,24 C1332,-8 1404,-8 1440,24 L1440,48 Z"
          />
        ) : (
          <path
            fill="currentColor"
            d="M0,48 L0,20 C240,44 480,-4 720,16 C960,36 1200,4 1440,20 L1440,48 Z"
          />
        )}
      </svg>
    </div>
  );
}
