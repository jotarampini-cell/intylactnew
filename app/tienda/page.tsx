import PageShell from "@/components/layout/PageShell";
import { products } from "@/lib/products";
import Link from "next/link";

export const metadata = { title: "Tienda" };

export default function TiendaPage() {
  return (
    <PageShell
      title="Tienda"
      intro="Nuestra línea completa de cuidado íntimo con probióticos e inositol."
    >
      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {products.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/tienda/${p.slug}`}
              className="block rounded-2xl bg-white p-5 shadow-[0_2px_14px_rgba(0,48,60,0.07)] transition-shadow hover:shadow-[0_8px_26px_rgba(0,48,60,0.12)]"
            >
              <h2 className="font-heading text-base font-semibold">{p.name}</h2>
              <p className="mt-1.5 text-sm text-teal-900/70">{p.tagline}</p>
            </Link>
          </li>
        ))}
      </ul>
    </PageShell>
  );
}
