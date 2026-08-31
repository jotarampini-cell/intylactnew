import Image from "next/image";

/**
 * Intylact wordmark — the real brand asset from /public/brand/logo.png.
 *
 * The source file is a dark teal wordmark on transparency, which disappears on
 * dark grounds. `variant="light"` inverts it to near-white via a CSS filter so
 * the same file works on the violet footer without needing a second asset.
 *
 * If a vector version ever arrives, drop it at /public/brand/logo.svg and change
 * LOGO_SRC — nothing else needs to change, since Header and Footer both render
 * this component.
 */
const LOGO_SRC = "/brand/logo.png";
const LOGO_WIDTH = 248;
const LOGO_HEIGHT = 58;

type Props = {
  className?: string;
  /** "dark" keeps the brand teal; "light" inverts for dark backgrounds */
  variant?: "dark" | "light";
  priority?: boolean;
};

export default function Logo({
  className = "",
  variant = "dark",
  priority = false,
}: Props) {
  return (
    <Image
      src={LOGO_SRC}
      alt="Intylact"
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={priority}
      className={`w-auto ${
        variant === "light" ? "brightness-0 invert" : ""
      } ${className}`}
    />
  );
}
