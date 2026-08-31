import Button from "@/components/ui/Button";
import SectionShell from "@/components/ui/SectionShell";

export default function DoctorBlock() {
  return (
    <SectionShell background="bg-coral-200" aria-labelledby="doctor-titulo">
      {/* Teal, not white: white on coral-200 measures 1.7:1 and fails WCAG AA
          even at large sizes (which need 3.0). Teal on this ground clears it
          comfortably. */}
      <p className="mx-auto max-w-[40ch] text-center font-heading text-[clamp(1.25rem,2.6vw,1.75rem)] leading-snug text-teal-900">
        Para el bienestar y la salud de tu zona V, nada mejor que el cuidado con{" "}
        <strong className="font-bold">Intylact</strong>
      </p>

      <div className="mt-8 grid items-center gap-8 sm:mt-12 sm:gap-10 lg:grid-cols-2">
        <div>
          <h2
            id="doctor-titulo"
            className="font-heading text-[clamp(1.6rem,3.6vw,2.5rem)] font-bold leading-tight text-teal-900"
          >
            ¿Sabías que el cuidado de la zona vulvar es igual de importante que el
            del resto del cuerpo?
          </h2>
          <p className="mt-5 max-w-[52ch] text-sm leading-relaxed text-teal-900/85 sm:text-base">
            Muchas mujeres descubren esta zona tan importante para su salud
            íntima solo cuando aparece una molestia. Cuidarla a diario, con
            productos formulados para respetar su pH, es una forma sencilla de
            prevenir.
          </p>
          <div className="mt-8">
            <Button href="/blog" variant="mint">
              Leer más
            </Button>
          </div>
        </div>

        {/* SWAP-IN POINT: /public/team/dr-navarro.jpg */}
        <figure className="relative mx-auto w-full max-w-[420px]">
          <div className="grid aspect-[4/3] place-items-center rounded-[16px] border-4 border-mint-300 bg-white/45 sm:aspect-[4/5] sm:rounded-[20px]">
            <span className="font-heading text-sm font-medium text-teal-900/55">
              Retrato
            </span>
          </div>
          <figcaption className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-mint-300 px-6 py-2 font-heading text-sm font-semibold text-teal-900 shadow-md">
            Dr. Héctor Navarro
          </figcaption>
        </figure>
      </div>
    </SectionShell>
  );
}
