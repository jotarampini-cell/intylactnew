import Link from "next/link";
import { categories, products } from "@/lib/products";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

import Icon, { type IconName } from "@/components/ui/Icon";

/** Category id → icon in the shared set. */
const icons: Record<string, IconName> = {
  gel: "drop",
  jabon: "soap",
  toallitas: "wipes",
  suplemento: "capsule",
  copa: "cup",
  pack: "pack",
};

export default function Categories() {
  return (
    <SectionShell
      background="bg-white"
      aria-labelledby="categorias-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="mx-auto max-w-[46ch] text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
            Explora por necesidad
          </p>
          <h2
            id="categorias-titulo"
            className="mt-3 font-heading text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em]"
          >
            ¿Qué estás buscando hoy?
          </h2>
        </div>
      </Reveal>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:grid-cols-4">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <li key={c.id}>
              <Reveal delay={i * 90} className="h-full">
                <Link
                  href={`/tienda?categoria=${c.id}`}
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[14px] bg-gradient-to-br ${c.accent} p-5 transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,48,60,.14)] sm:rounded-[18px] sm:p-7`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <Icon name={icons[c.id]} size={24} className="text-teal-900" />
                  </span>

                  <h3 className="mt-3.5 font-heading text-[15px] font-semibold leading-snug sm:mt-5 sm:text-lg">
                    {c.label}
                  </h3>
                  <p className="mt-1 flex-1 text-[13px] leading-relaxed text-teal-900/70">
                    {c.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-teal-900">
                    {count} {count === 1 ? "producto" : "productos"}
                    <Icon
                      name="arrow-right"
                      size={15}
                      className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </Reveal>
            </li>
          );
        })}
      </ul>

      <ScallopDivider color="text-cream" position="bottom" />
    </SectionShell>
  );
}
