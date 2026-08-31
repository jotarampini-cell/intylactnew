import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";
import Carousel from "@/components/ui/Carousel";
import ProductCard from "@/components/ui/ProductCard";
import ScallopDivider from "@/components/ui/ScallopDivider";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfo from "@/components/product/ProductInfo";
import Breadcrumbs from "@/components/product/Breadcrumbs";
import Icon from "@/components/ui/Icon";
import { products, getProduct, getRelated, getCategory } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return { title: "Producto no encontrado" };

  return {
    title: p.name,
    description: p.detail,
    openGraph: {
      title: `${p.name} — Intylact`,
      description: p.detail,
      images: p.image ? [{ url: p.image }] : undefined,
    },
  };
}

const trust = [
  { label: "Fórmulas veganas", icon: "leaf" as const },
  { label: "pH balanceado", icon: "drop" as const },
  { label: "Sin parabenos", icon: "shield" as const },
  { label: "Libre de crueldad", icon: "rabbit" as const },
];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelated(product, 3);
  const images = [product.image, ...(product.gallery ?? [])].filter(
    (x): x is string => Boolean(x),
  );

  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        {/* Main block */}
        <section className="relative bg-cream" aria-label={product.name}>
          <div className="mx-auto max-w-[1280px] px-[22px] pb-14 pt-6 sm:pt-8">
            <Breadcrumbs
              items={[
                { label: "Inicio", href: "/" },
                { label: "Tienda", href: "/tienda" },
                ...(category
                  ? [{ label: category.label, href: `/tienda?categoria=${category.id}` }]
                  : []),
                { label: product.name },
              ]}
            />

            <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:gap-14">
              <Reveal>
                <ProductGallery
                  images={images}
                  name={product.name}
                  accent={product.accent}
                />
              </Reveal>
              <Reveal delay={90}>
                <ProductInfo product={product} />
              </Reveal>
            </div>
          </div>
          <ScallopDivider color="text-white" position="bottom" />
        </section>

        {/* Trust strip */}
        <section aria-label="Nuestros compromisos" className="bg-white">
          <ul className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-7 gap-y-3 px-[22px] py-7">
            {trust.map((t) => (
              <li key={t.label} className="flex items-center gap-2">
                <Icon name={t.icon} size={19} className="shrink-0 text-coral-500" />
                <span className="text-[13px] font-medium text-teal-900/80">
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Ingredients + how to use */}
        {(product.ingredients?.length || product.howToUse?.length) && (
          <SectionShell background="bg-white" aria-labelledby="detalle-titulo">
            <h2 id="detalle-titulo" className="sr-only">
              Detalles del producto
            </h2>
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-14">
              {product.ingredients?.length ? (
                <Reveal>
                  <div className="h-full rounded-[1.5rem] bg-mint-100 p-7 sm:rounded-[2rem] sm:p-9">
                    <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                      Qué lleva
                    </h3>
                    <ul className="mt-5 space-y-3">
                      {product.ingredients.map((ing) => (
                        <li key={ing} className="flex items-start gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-teal-900/40"
                          />
                          <span className="text-[15px] leading-relaxed text-teal-900/85">
                            {ing}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ) : null}

              {product.howToUse?.length ? (
                <Reveal delay={90}>
                  <div className="h-full rounded-[1.5rem] bg-butter-100 p-7 sm:rounded-[2rem] sm:p-9">
                    <h3 className="font-heading text-xl font-semibold sm:text-2xl">
                      Cómo se usa
                    </h3>
                    <ol className="mt-5 space-y-4">
                      {product.howToUse.map((step, i) => (
                        <li key={step} className="flex items-start gap-3.5">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white font-heading text-[13px] font-bold text-teal-900">
                            {i + 1}
                          </span>
                          <span className="text-[15px] leading-relaxed text-teal-900/85">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              ) : null}
            </div>
          </SectionShell>
        )}

        {/* Related */}
        {related.length > 0 && (
          <SectionShell background="bg-cream" aria-labelledby="relacionados-titulo">
            <Reveal>
              <h2
                id="relacionados-titulo"
                className="font-heading text-[clamp(1.6rem,3.6vw,2.4rem)] font-bold tracking-[-0.02em]"
              >
                También te puede gustar
              </h2>
            </Reveal>
            <div className="mt-8">
              <Carousel
                label="Productos relacionados"
                gridClass="sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 lg:grid-cols-3"
                itemClass="w-[76vw] max-w-[300px]"
              >
                {related.map((r) => (
                  <ProductCard key={r.slug} product={r} compact />
                ))}
              </Carousel>
            </div>
          </SectionShell>
        )}
      </main>
      <Footer />
    </>
  );
}
