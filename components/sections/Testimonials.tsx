import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";

/**
 * PLACEHOLDER CONTENT — these are illustrative, not real customer quotes.
 * Replace with genuine reviews before launch: publishing invented testimonials
 * as if they were real is deceptive advertising and, in Mexico, actionable under
 * PROFECO consumer-protection rules.
 */
const quotes = [
  {
    quote:
      "Llevaba meses con molestias y nada me funcionaba. En dos semanas de usar el gel sentí la diferencia.",
    author: "Ana L.",
    context: "Gel Hidratante Íntimo",
  },
  {
    quote:
      "IntyProb se volvió parte de mi rutina. Me siento más equilibrada y mi digestión también mejoró.",
    author: "Mariana R.",
    context: "IntyProb",
  },
  {
    quote:
      "Las copas urinarias son un salvavidas cuando viajo. No vuelvo a un baño público sin ellas.",
    author: "Sofía M.",
    context: "Copas Urinarias",
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5" role="img" aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="text-butter-200">
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export default function Testimonials() {
  return (
    <SectionShell
      background="bg-cream"
      aria-labelledby="testimonios-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="mx-auto max-w-[46ch] text-center">
          <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
            Ellas ya lo probaron
          </p>
          <h2
            id="testimonios-titulo"
            className="mt-3 font-heading text-[clamp(2rem,5vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.02em]"
          >
            Lo que dicen de Intylact
          </h2>
        </div>
      </Reveal>

      <ul className="mt-14 grid gap-6 lg:grid-cols-3">
        {quotes.map((q, i) => (
          <li key={q.author}>
            <Reveal delay={i * 110}>
              <figure className="flex h-full flex-col rounded-[1.75rem] bg-white p-8 shadow-[0_4px_22px_rgba(0,48,60,.07)]">
                <Stars />
                <blockquote className="mt-4 flex-1 text-base leading-relaxed text-teal-900/85">
                  <p>“{q.quote}”</p>
                </blockquote>
                <figcaption className="mt-6 border-t border-teal-900/10 pt-4">
                  <span className="block font-heading text-sm font-semibold">{q.author}</span>
                  <span className="mt-0.5 block text-xs text-teal-900/60">{q.context}</span>
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>

      <ScallopDivider color="text-butter-100" position="bottom" />
    </SectionShell>
  );
}
