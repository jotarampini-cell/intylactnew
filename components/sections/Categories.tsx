import Link from "next/link";
import { categories, products } from "@/lib/products";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

/** Line icon per category, drawn inline so it inherits currentColor. */
const icons: Record<string, React.ReactNode> = {
  gel: (
    <>
      <path d="M12 3.5s6 6.2 6 10.1A6 6 0 016 13.6C6 9.7 12 3.5 12 3.5z" />
      <path d="M9.5 14.5a2.6 2.6 0 002.5 2.2" />
    </>
  ),
  jabon: (
    <>
      <rect x="4" y="9" width="16" height="11" rx="3" />
      <path d="M8 9V7.5a4 4 0 018 0V9" />
      <path d="M12 13v3" />
    </>
  ),
  suplemento: (
    <>
      <rect x="3.5" y="8" width="17" height="8" rx="4" transform="rotate(-30 12 12)" />
      <path d="M9 15l6-6" />
    </>
  ),
  copa: (
    <>
      <path d="M6 5h12l-1.4 9a4.7 4.7 0 01-9.2 0z" />
      <path d="M12 18v3" />
      <path d="M8.5 21h7" />
    </>
  ),
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
                  className={`group relative flex h-full flex-col overflow-hidden rounded-[1.25rem] bg-gradient-to-br ${c.accent} p-5 transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,48,60,.14)] sm:rounded-[1.75rem] sm:p-7`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/70 transition-transform duration-300 ease-[var(--ease-brand)] group-hover:scale-110 sm:h-14 sm:w-14 sm:rounded-2xl">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="text-teal-900"
                    >
                      {icons[c.id]}
                    </svg>
                  </span>

                  <h3 className="mt-3.5 font-heading text-[15px] font-semibold leading-snug sm:mt-5 sm:text-lg">
                    {c.label}
                  </h3>
                  <p className="mt-1 flex-1 text-[13px] leading-relaxed text-teal-900/70">
                    {c.blurb}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 font-heading text-[13px] font-semibold text-teal-900">
                    {count} {count === 1 ? "producto" : "productos"}
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="transition-transform duration-300 ease-[var(--ease-brand)] group-hover:translate-x-1"
                    >
                      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
