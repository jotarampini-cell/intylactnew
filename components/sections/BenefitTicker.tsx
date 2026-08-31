import { benefits } from "@/lib/products";
import BenefitIcon from "@/components/ui/BenefitIcon";

/**
 * Infinite marquee of product claims.
 *
 * The track holds two identical copies of the list and translates by -50%, so
 * the loop is seamless. The duplicate is aria-hidden to keep it out of the
 * accessibility tree, and reduced-motion users get a static wrapped row instead
 * (the animation is neutralised globally in globals.css).
 */
export default function BenefitTicker() {
  return (
    <section
      aria-label="Características de nuestros productos"
      className="overflow-hidden bg-butter-200 py-6"
    >
      {/* Static, wrapped layout for reduced-motion and narrow screens */}
      <ul className="mx-auto flex max-w-[1280px] flex-wrap items-start justify-center gap-x-8 gap-y-5 px-[22px] motion-safe:hidden">
        {benefits.map((b) => (
          <li key={b.label} className="flex w-[92px] flex-col items-center gap-2 text-center">
            <BenefitIcon name={b.icon} className="h-8 w-8 text-teal-900" />
            <span className="font-heading text-[12px] font-medium leading-tight text-teal-900">
              {b.label}
            </span>
          </li>
        ))}
      </ul>

      {/* Animated marquee */}
      <div className="hidden motion-safe:block">
        <div className="flex w-max animate-[var(--animate-marquee)] hover:[animation-play-state:paused]">
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1}
              className="flex shrink-0 items-center"
            >
              {benefits.map((b) => (
                <li
                  key={`${copy}-${b.label}`}
                  className="flex w-[168px] shrink-0 flex-col items-center gap-2 px-4 text-center"
                >
                  <BenefitIcon name={b.icon} className="h-9 w-9 text-teal-900" />
                  <span className="font-heading text-xs font-medium leading-tight text-teal-900">
                    {b.label}
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
