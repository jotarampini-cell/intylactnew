import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";

export default function EducationBlock() {
  return (
    <SectionShell
      background="bg-butter-100"
      aria-labelledby="educacion-titulo"
      className="overflow-hidden"
    >
      <div className="grid items-center gap-6 sm:gap-10 lg:grid-cols-2">
        <div className="rounded-[1.5rem] bg-mint-300 p-6 sm:rounded-[2rem] sm:p-10">
          <h2
            id="educacion-titulo"
            className="font-heading text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-tight"
          >
            ¿Ya conocías los probióticos y el inositol?
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-teal-900/80 sm:text-base">
            Son dos aliados del equilibrio íntimo. Los probióticos ayudan a
            mantener una microbiota vaginal sana, y el inositol acompaña el
            equilibrio hormonal de tu cuerpo. Juntos sostienen el bienestar de tu
            zona V día con día.
          </p>
          <div className="mt-7">
            <Button href="/blog" variant="outline">
              Ver más
            </Button>
          </div>
        </div>

        {/* SWAP-IN POINT: replace with <Image src="/education/probioticos.jpg" …> */}
        <div className="relative">
          <div className="grid aspect-[16/10] place-items-center rounded-[1.5rem] bg-coral-200 sm:aspect-[4/3] sm:rounded-[2rem]">
            <span className="font-heading text-sm font-medium text-teal-900/55">
              Imagen editorial
            </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute -left-4 -top-4 hidden rounded-full bg-white px-5 py-2 font-heading text-sm font-semibold text-teal-900 shadow-md sm:block"
          >
            intylact
          </span>
        </div>
      </div>

      <ScallopDivider color="text-cream" position="bottom" />
    </SectionShell>
  );
}
