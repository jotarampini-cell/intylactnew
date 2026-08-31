import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionShell from "@/components/ui/SectionShell";
import ProductCard from "@/components/ui/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { products, categories, type CategoryId } from "@/lib/products";

export const metadata = {
  title: "Tienda",
  description:
    "Toda la línea Intylact: suplementos, higiene íntima, toallitas, hidratación y packs con ahorro.",
};

/**
 * Shop catalogue.
 *
 * Filtering is done with links rather than client state, so each category is a
 * real, shareable URL that can be prerendered and indexed. `Categories.tsx` on
 * the home page already links here with ?categoria=…, which nothing consumed
 * until now.
 */
export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  const active = categories.find((c) => c.id === categoria)?.id as
    | CategoryId
    | undefined;

  const shown = active ? products.filter((p) => p.category === active) : products;
  const activeLabel = categories.find((c) => c.id === active)?.label;

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <SectionShell background="bg-cream" aria-labelledby="tienda-titulo">
          <Reveal>
            <div className="text-center">
              <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
                Nuestra línea completa
              </p>
              <h1
                id="tienda-titulo"
                className="mt-3 font-heading text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[1.05] tracking-[-0.02em]"
              >
                {activeLabel ?? "Tienda"}
              </h1>
              <p className="mx-auto mt-4 max-w-[52ch] text-[15px] leading-relaxed text-teal-900/70 sm:text-lg">
                Cuidado íntimo formulado con probióticos, prebióticos e
                ingredientes que respetan tu equilibrio natural.
              </p>
            </div>
          </Reveal>

          {/* Category chips */}
          <Reveal delay={80}>
            <ul className="mt-9 flex flex-wrap justify-center gap-2">
              <li>
                <Link
                  href="/tienda"
                  aria-current={!active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full px-5 font-heading text-sm font-semibold transition-colors duration-300 ease-[var(--ease-brand)] ${
                    !active
                      ? "bg-teal-900 text-white"
                      : "bg-white text-teal-900 hover:bg-teal-900/8"
                  }`}
                >
                  Todo
                </Link>
              </li>
              {categories.map((c) => {
                const on = active === c.id;
                return (
                  <li key={c.id}>
                    <Link
                      href={`/tienda?categoria=${c.id}`}
                      aria-current={on ? "page" : undefined}
                      className={`inline-flex min-h-11 items-center rounded-full px-5 font-heading text-sm font-semibold transition-colors duration-300 ease-[var(--ease-brand)] ${
                        on
                          ? "bg-teal-900 text-white"
                          : "bg-white text-teal-900 hover:bg-teal-900/8"
                      }`}
                    >
                      {c.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <p className="mt-6 text-center text-[13px] text-teal-900/55">
            {shown.length} {shown.length === 1 ? "producto" : "productos"}
          </p>

          {shown.length > 0 ? (
            <ul className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {shown.map((p, i) => (
                <li key={p.slug}>
                  <Reveal delay={(i % 4) * 80} className="h-full">
                    <ProductCard product={p} compact />
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-10 rounded-[1.5rem] bg-white p-10 text-center">
              <p className="font-heading text-lg font-semibold">
                Aún no hay productos en esta categoría
              </p>
              <p className="mt-2 text-[15px] text-teal-900/65">
                Muy pronto sumaremos más. Mientras tanto, explora el resto de la
                línea.
              </p>
              <Link
                href="/tienda"
                className="mt-6 inline-flex min-h-12 items-center rounded-full bg-teal-900 px-7 font-heading text-[15px] font-semibold text-white transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-coral-500"
              >
                Ver todo
              </Link>
            </div>
          )}
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}
