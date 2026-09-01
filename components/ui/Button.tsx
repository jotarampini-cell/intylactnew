import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type Variant = "primary" | "outline" | "mint" | "white" | "white-outline";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center rounded-full font-heading font-medium " +
  "transition-transform transition-colors duration-200 hover:-translate-y-0.5 " +
  "active:translate-y-0 disabled:pointer-events-none disabled:opacity-50";

/*
 * Note on colour: the brand coral #FF8E80 against white text measures ~2.1:1,
 * which fails WCAG AA. `primary` therefore uses the darkened coral-500 fill so
 * white text clears 4.5:1. The lighter brand coral is still used for large
 * decorative fills where it carries no text.
 */
const variants: Record<Variant, string> = {
  primary: "bg-coral-500 text-white hover:bg-coral-400 hover:text-teal-900",
  outline:
    "ring-2 ring-inset ring-teal-900 text-teal-900 bg-transparent hover:bg-teal-900 hover:text-white",
  mint: "bg-mint-300 text-teal-900 hover:bg-mint-100",
  white: "bg-white text-teal-900 hover:bg-cream",
  "white-outline": "ring-2 ring-inset ring-white bg-white/15 text-white backdrop-blur-sm hover:bg-white hover:text-teal-900",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

type Props = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className">;

export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
