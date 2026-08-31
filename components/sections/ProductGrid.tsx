import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

/**
 * Product line.
 *
 * On phones the featured products are a horizontal snap-scroller: stacking three
 * ~590px cards made the section 3.3 viewports tall and showed one product at a
 * time. Swiping keeps the whole line within reach. From `sm` up it becomes a
 * regular grid, where vertical space is no longer the constraint.
 */
export default function ProductGrid() {
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <SectionShell
      id="tienda"
      background="bg-cream"
      aria-labelledby="tienda-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
            Nuestra línea
          </p>
          <h2
            id="tienda-titulo"
            className="mt-3 font-heading text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]"
          >
            Todo lo que tu zona V necesita
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-teal-900/70 sm:text-lg">
            Fórmulas desarrolladas con prebióticos, ácido hialurónico y ácido
            láctico para acompañarte en cada etapa.
          </p>
        </div>
      </Reveal>

      {/* Featured — swipeable on phones, grid from sm up.
          Negative margins let cards bleed to the screen edge while the section
          keeps its 22px gutter. */}
      <ul
        className="
          mt-10 -mx-[22px] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[22px] pb-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0
          lg:grid-cols-3
        "
      >
        {featured.map((p, i) => (
          <li
            key={p.slug}
            className="w-[78vw] max-w-[310px] shrink-0 snap-center sm:w-auto sm:max-w-none"
          >
            <Reveal delay={i * 110} className="h-full">
              <Link
                href={`/tienda/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_4px_24px_rgba(0,48,60,.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,48,60,.16)] sm:rounded-[2rem]"
              >
                <div
                  className={`relative grid aspect-square place-items-center bg-gradient-to-br ${p.accent} sm:aspect-[5/4]`}
                >
                  <span className="absolute left-3.5 top-3.5 rounded-full bg-white/90 px-3 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-wider text-teal-900">
                    {p.size}
                  </span>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={460}
                      height={460}
                      sizes="(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 33vw"
                      className="h-[80%] w-auto object-contain drop-shadow-[0_14px_26px_rgba(0,48,60,.18)] transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-7">
                  <h3 className="font-heading text-lg font-semibold leading-snug sm:text-xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-teal-900/70 sm:mt-2.5 sm:text-sm">
                    {p.tagline}
                  </p>
                  {/* Long-form detail is noise on a phone card; show from sm up */}
                  <p className="mt-3 hidden flex-1 text-sm leading-relaxed text-teal-900/55 sm:block">
                    {p.detail}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-coral-500 transition-colors group-hover:text-teal-900 sm:mt-6">
                    Ver producto
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      {/* Swipe affordance — only meaningful while the list scrolls */}
      <p className="mt-1 text-center text-[13px] text-teal-900/45 sm:hidden">
        Desliza para ver más →
      </p>

      {/* Remaining line */}
      <ul className="mt-8 grid gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-6">
        {rest.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 90} className="h-full">
              <Link
                href={`/tienda/${p.slug}`}
                className={`group flex h-full items-center gap-4 rounded-[1.25rem] bg-gradient-to-br ${p.accent} p-4 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,48,60,.12)] sm:rounded-[1.5rem] sm:p-5`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/70 sm:h-14 sm:w-14">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
                    <path d="M12 3.5s6 6.2 6 10.1A6 6 0 016 13.6C6 9.7 12 3.5 12 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[15px] font-semibold leading-snug sm:text-base">
                    {p.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-teal-900/70">
                    {p.tagline}
                  </span>
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className="shrink-0 text-teal-900/40 transition-transform duration-300 group-hover:translate-x-1 sm:hidden"
                >
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <div className="mt-10 text-center sm:mt-14">
          <Button href="/tienda" size="lg">
            Ver toda la tienda
          </Button>
        </div>
      </Reveal>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
