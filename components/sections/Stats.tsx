import { products, categories } from "@/lib/products";
import CountUp from "@/components/ui/CountUp";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/ui/Parallax";
import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * Numbers strip.
 *
 * Every figure is derived from real data (the catalogue) or from claims already
 * printed on the packaging — nothing invented. Customer counts and review
 * totals are deliberately absent: there is no source for those yet, and made-up
 * social proof is the fastest way to lose the trust this page is building.
 */
const stats: { value: number; suffix: string; label: string; icon: IconName }[] = [
  {
    value: products.length,
    suffix: "",
    label: "Productos en nuestra línea",
    icon: "sparkle",
  },
  {
    value: categories.length,
    suffix: "",
    label: "Categorías de cuidado",
    icon: "pack",
  },
  {
    value: 95,
    suffix: "%",
    label: "Libre de bacterias",
    icon: "shield",
  },
  {
    value: 100,
    suffix: "%",
    label: "Fórmulas veganas",
    icon: "leaf",
  },
];

export default function Stats() {
  return (
    <section
      aria-labelledby="cifras-titulo"
      className="relative isolate overflow-hidden bg-teal-900 py-[clamp(2.75rem,6vw,5rem)]"
    >
      {/* Slow-drifting colour blooms give the band depth without an image */}
      <Parallax speed={0.05} className="pointer-events-none absolute inset-0">
        <div
          aria-hidden="true"
          className="absolute -left-20 top-0 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(101,212,220,.5), transparent 70%)" }}
        />
        <div
          aria-hidden="true"
          className="absolute -right-16 bottom-0 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(224,86,127,.45), transparent 70%)" }}
        />
      </Parallax>

      <h2 id="cifras-titulo" className="sr-only">
        Intylact en cifras
      </h2>

      <ul className="relative mx-auto grid max-w-[1280px] grid-cols-2 gap-x-6 gap-y-9 px-[22px] lg:grid-cols-4">
        {stats.map((s, i) => (
          <li key={s.label}>
            <Reveal delay={i * 90}>
              <div className="text-center">
                <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-white/10">
                  <Icon name={s.icon} size={22} className="text-mint-300" />
                </span>
                <p className="mt-3 font-heading text-[clamp(2rem,4.5vw,3rem)] font-bold leading-none text-white">
                  <CountUp value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-white/65 sm:text-sm">
                  {s.label}
                </p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
