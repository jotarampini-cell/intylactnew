import Image from "next/image";
import Link from "next/link";
import { products } from "@/lib/products";
import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

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
          <p className="mx-auto mt-4 max-w-[52ch] text-base leading-relaxed text-teal-900/70 sm:text-lg">
            Fórmulas desarrolladas con prebióticos, ácido hialurónico y ácido
            láctico para acompañarte en cada etapa.
          </p>
        </div>
      </Reveal>

      {/* Featured — larger cards with real photography */}
      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {featured.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 110}>
              <Link
                href={`/tienda/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_4px_24px_rgba(0,48,60,.08)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,48,60,.16)]"
              >
                <div
                  className={`relative grid aspect-[5/4] place-items-center bg-gradient-to-br ${p.accent}`}
                >
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 font-heading text-[11px] font-semibold uppercase tracking-wider text-teal-900">
                    {p.size}
                  </span>
                  {p.image && (
                    <Image
                      src={p.image}
                      alt={p.name}
                      width={460}
                      height={460}
                      className="h-[78%] w-auto object-contain drop-shadow-[0_14px_26px_rgba(0,48,60,.18)] transition-transform duration-700 group-hover:scale-[1.07]"
                    />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="font-heading text-xl font-semibold leading-snug">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-teal-900/70">
                    {p.tagline}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-teal-900/55">
                    {p.detail}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-coral-500 transition-colors group-hover:text-teal-900">
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

      {/* Remaining line — compact cards */}
      <ul className="mt-6 grid gap-6 sm:grid-cols-3">
        {rest.map((p, i) => (
          <li key={p.slug}>
            <Reveal delay={i * 90}>
              <Link
                href={`/tienda/${p.slug}`}
                className={`group flex h-full items-center gap-4 rounded-[1.5rem] bg-gradient-to-br ${p.accent} p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,48,60,.12)]`}
              >
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white/70">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
                    <path d="M12 3.5s6 6.2 6 10.1A6 6 0 016 13.6C6 9.7 12 3.5 12 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="min-w-0">
                  <span className="block font-heading text-base font-semibold leading-snug">
                    {p.name}
                  </span>
                  <span className="mt-1 block text-[13px] leading-relaxed text-teal-900/70">
                    {p.tagline}
                  </span>
                </span>
              </Link>
            </Reveal>
          </li>
        ))}
      </ul>

      <Reveal>
        <div className="mt-14 text-center">
          <Button href="/tienda" size="lg">
            Ver toda la tienda
          </Button>
        </div>
      </Reveal>

      <ScallopDivider color="text-white" position="bottom" />
    </SectionShell>
  );
}
