import Link from "next/link";
import { products } from "@/lib/products";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/ui/ProductCard";
import Icon from "@/components/ui/Icon";

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

      <div className="mt-10">
        <Carousel
          label="Productos destacados"
          gridClass="sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
          itemClass="w-[78vw] max-w-[310px]"
        >
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </Carousel>
      </div>

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
                  <Icon name="drop" size={24} className="text-teal-900" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-heading text-[15px] font-semibold leading-snug sm:text-base">
                    {p.name}
                  </span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-teal-900/70">
                    {p.tagline}
                  </span>
                </span>
                <Icon
                  name="chevron-right"
                  size={18}
                  className="shrink-0 text-teal-900/40 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1 sm:hidden"
                />
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
