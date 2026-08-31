import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";

export default function ProductGrid() {
  return (
    <SectionShell
      id="tienda"
      background="bg-cream"
      aria-labelledby="tienda-titulo"
      className="overflow-hidden"
    >
      <div className="text-center">
        <h2
          id="tienda-titulo"
          className="font-heading text-[clamp(2.5rem,8vw,5.5rem)] font-bold leading-none tracking-tight text-teal-900/15"
        >
          TIENDA
        </h2>
        <p className="mx-auto -mt-2 max-w-[46ch] text-base text-teal-900/75 sm:text-lg">
          Fórmulas con probióticos e inositol para acompañar tu cuidado íntimo
          todos los días.
        </p>
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/tienda/${p.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_18px_rgba(0,48,60,0.07)] transition-shadow duration-300 hover:shadow-[0_10px_34px_rgba(0,48,60,0.14)]"
            >
              <div
                className={`relative grid aspect-[4/3] place-items-center ${p.accent}`}
              >
                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                ) : (
                  <span className="font-heading text-sm font-medium text-teal-900/45">
                    Imagen de producto
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-heading text-lg font-semibold text-teal-900">
                  {p.name}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-teal-900/70">
                  {p.tagline}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 font-heading text-sm font-medium text-coral-500 transition-colors group-hover:text-teal-900">
                  Ver producto
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M5 12h13M13 6l6 6-6 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 text-center">
        <Button href="/tienda" size="lg">
          Lo quiero
        </Button>
      </div>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
