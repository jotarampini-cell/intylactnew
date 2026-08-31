import { products } from "@/lib/products";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/ui/ProductCard";

/**
 * Product line.
 *
 * On phones the featured products are a horizontal snap-scroller: stacking three
 * ~590px cards made the section 3.3 viewports tall and showed one product at a
 * time. Swiping keeps the whole line within reach. From `sm` up it becomes a
 * regular grid, where vertical space is no longer the constraint.
 */
export default function ProductGrid() {
  // Featured lead, then the rest fills the rail. Showing eight real cards beats
  // four cards plus a text-only list: the density is what makes the section
  // read as a shop rather than a brochure.
  const shown = [
    ...products.filter((p) => p.featured),
    ...products.filter((p) => !p.featured),
  ].slice(0, 4);

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
          gridClass="sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:pb-0 lg:grid-cols-4"
          itemClass="w-[68vw] max-w-[260px]"
        >
          {shown.map((p) => (
            <ProductCard key={p.slug} product={p} compact />
          ))}
        </Carousel>
      </div>

      {/* Swipe affordance — only meaningful while the list scrolls */}
      <p className="mt-1 text-center text-[13px] text-teal-900/45 sm:hidden">
        Desliza para ver más →
      </p>

      <Reveal>
        <div className="mt-8 text-center sm:mt-10">
          <Button href="/tienda" size="lg">
            Ver toda la tienda
          </Button>
        </div>
      </Reveal>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
