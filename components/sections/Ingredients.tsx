import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

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

      {/* Swipeable on phones (four stacked cards ran 1.7 viewports tall),
          grid from sm up. */}
      <ul
        className="
          mt-10 -mx-[22px] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[22px] pb-4
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          sm:mx-0 sm:mt-14 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0
          lg:grid-cols-4
        "
      >
        {actives.map((a, i) => (
          <li
            key={a.name}
            className="w-[72vw] max-w-[280px] shrink-0 snap-center sm:w-auto sm:max-w-none"
          >
            <Reveal delay={i * 100} className="h-full">
              <article
                className={`flex h-full flex-col rounded-[1.5rem] bg-gradient-to-br ${a.tint} p-6 transition-transform duration-500 hover:-translate-y-1.5 sm:rounded-[1.75rem] sm:p-7`}
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/75 sm:h-12 sm:w-12">
                  <Icon name="leaf" size={22} className="text-teal-900" />
                </span>
                <h3 className="mt-4 font-heading text-lg font-semibold sm:mt-5">{a.name}</h3>
                <p className="mt-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-teal-900/55 sm:text-xs">
                  {a.role}
                </p>
                <p className="mt-3 text-[13px] leading-relaxed text-teal-900/75 sm:text-sm">{a.body}</p>
              </article>
            </Reveal>
          </li>
        ))}
      </ul>

      <p className="mt-1 text-center text-[13px] text-teal-900/45 sm:hidden">
        Desliza para ver más →
      </p>

      <ScallopDivider color="text-cream" position="bottom" />
    </SectionShell>
  );
}
