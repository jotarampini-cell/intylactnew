import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

const actives = [
  {
    name: "Prebióticos",
    role: "Alimentan tu flora",
    body: "Nutren las bacterias buenas que ya viven en tu microbiota para que se mantengan fuertes y en equilibrio.",
    tint: "from-mint-100 to-mint-300/45",
  },
  {
    name: "Ácido hialurónico",
    role: "Hidratación profunda",
    body: "Retiene hasta mil veces su peso en agua, devolviendo comodidad y elasticidad a la piel de la zona íntima.",
    tint: "from-coral-100 to-coral-200/70",
  },
  {
    name: "Ácido láctico",
    role: "Equilibra tu pH",
    body: "Ayuda a sostener el pH ácido natural de la zona íntima, el ambiente donde tu flora se defiende sola.",
    tint: "from-butter-100 to-butter-200/70",
  },
  {
    name: "Inositol",
    role: "Apoyo hormonal",
    body: "Acompaña el equilibrio hormonal y metabólico de tu cuerpo, desde adentro hacia afuera.",
    tint: "from-violet-500/15 to-pink-500/20",
  },
];

export default function Ingredients() {
  return (
    <SectionShell
      background="bg-white"
      aria-labelledby="ingredientes-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="mx-auto max-w-[46ch] text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
            Qué lleva adentro
          </p>
          <h2
            id="ingredientes-titulo"
            className="mt-3 font-heading text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em]"
          >
            Ingredientes que sí hacen algo
          </h2>
          <p className="mt-4 text-base leading-relaxed text-teal-900/70 sm:text-lg">
            Sin parabenos, sin alcohol y sin promesas vacías. Esto es lo que
            realmente trabaja por ti.
          </p>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {actives.map((a, i) => (
          <li key={a.name}>
            <Reveal delay={i * 100}>
              <article
                className={`flex h-full flex-col rounded-[1.75rem] bg-gradient-to-br ${a.tint} p-7 transition-transform duration-500 hover:-translate-y-1.5`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/75">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
                    <path d="M5 19c0-8 5-13 14-13 0 9-5 14-13 14H5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <path d="M5 19c3-4 6-6 10-7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold">{a.name}</h3>
                <p className="mt-1 font-heading text-xs font-semibold uppercase tracking-wider text-teal-900/55">
                  {a.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-teal-900/75">{a.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <ScallopDivider color="text-cream" position="bottom" />
    </SectionShell>
  );
}
