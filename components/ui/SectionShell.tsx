import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  /** Tailwind background utility, e.g. "bg-coral-200" */
  background?: string;
  /** Inline style background, for gradients from CSS custom props */
  gradient?: string;
  id?: string;
  className?: string;
  /** Narrower inner column for text-heavy sections */
  width?: "default" | "narrow" | "full";
  as?: "section" | "div";
  "aria-labelledby"?: string;
};

const widths = {
  default: "max-w-[1280px]",
  narrow: "max-w-[860px]",
  full: "max-w-none",
};

/**
 * Full-bleed section with the site's shared vertical rhythm (~112px desktop,
 * scaling down on small screens) and a centred content column.
 */
export default function SectionShell({
  children,
  background = "",
  gradient,
  id,
  className = "",
  width = "default",
  as: Tag = "section",
  ...rest
}: Props) {
  return (
    <Tag
      id={id}
      className={`relative w-full ${background} ${className}`}
      style={gradient ? { background: gradient } : undefined}
      {...rest}
    >
      <div
        className={`mx-auto ${widths[width]} px-[22px] py-[clamp(3.5rem,8vw,7rem)]`}
      >
        {children}
      </div>
    </Tag>
  );
}
