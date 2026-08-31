import SectionShell from "@/components/ui/SectionShell";
import Reveal from "@/components/ui/Reveal";

/**
 * Native <details> accordion: keyboard-operable and screen-reader friendly with
 * no JavaScript. Answers stay in the DOM, so they remain findable by in-page
 * search and by crawlers.
 */
const faqs = [
  {
    q: "¿Puedo usar el gel todos los días?",
    a: "Sí. El Gel Hidratante Íntimo está formulado para uso diario y respeta el pH natural de la zona íntima. Si tienes una condición dermatológica o ginecológica, consulta antes con tu médico.",
  },
  {
    q: "¿Cuál es la diferencia entre el jabón y el gel?",
    a: "El jabón íntimo limpia la zona externa durante la ducha. El gel hidratante se aplica después y aporta humedad y confort prolongado. Se complementan.",
  },
  {
    q: "¿IntyProb sirve si no tengo molestias?",
    a: "Sí. Los probióticos ayudan a mantener el equilibrio de tu flora antes de que aparezca cualquier molestia. Funciona tanto de forma preventiva como de apoyo.",
  },
  {
    q: "¿Los productos son veganos y libres de crueldad?",
    a: "Toda la línea es vegana, libre de crueldad animal, sin parabenos, sin gluten y sin alcohol.",
  },
  {
    q: "¿Puedo usarlos durante el embarazo o la lactancia?",
    a: "Los productos de higiene externa suelen ser compatibles, pero cada embarazo es distinto. Consulta con tu ginecólogo antes de incorporar cualquier producto, incluido IntyProb.",
  },
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "En hidratación y confort muchas personas notan diferencia desde los primeros días. Para el equilibrio de la flora con IntyProb, lo habitual es de dos a cuatro semanas de uso constante.",
  },
];

export default function Faq() {
  return (
    <SectionShell
      background="bg-butter-100"
      width="narrow"
      aria-labelledby="faq-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
            Dudas frecuentes
          </p>
          <h2
            id="faq-titulo"
            className="mt-3 font-heading text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em]"
          >
            Preguntas que nos hacen seguido
          </h2>
        </div>
      </Reveal>

      <div className="mt-12 space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 70}>
            <details className="group rounded-2xl bg-white/85 px-6 py-5 transition-colors hover:bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-teal-900 [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-teal-900/8 transition-transform duration-300 group-open:rotate-45"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-teal-900/75">{f.a}</p>
            </details>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <p className="mt-10 text-center text-[15px] text-teal-900/70">
          ¿Tienes otra duda?{" "}
          <a
            href="/contacto"
            className="inline-flex min-h-11 items-center px-1 font-semibold text-coral-500 underline underline-offset-4 hover:text-teal-900"
          >
            Escríbenos
          </a>
        </p>
      </Reveal>
    </SectionShell>
  );
}
