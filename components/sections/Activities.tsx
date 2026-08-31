import Image from "next/image";
import Link from "next/link";
import { posts, formatPostDate } from "@/lib/posts";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";

/**
 * "Actividades Intylact" — editorial and community posts.
 *
 * The lead post gets a wide card; the rest stack beside it. Content comes from
 * lib/posts.ts, which is currently placeholder — see the note in that file.
 */
export default function Activities() {
  const [lead, ...rest] = posts;

  return (
    <SectionShell
      background="bg-white"
      aria-labelledby="actividades-titulo"
      className="overflow-hidden"
    >
      <Reveal>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.22em] text-coral-500">
              Blog
            </p>
            <h2
              id="actividades-titulo"
              className="mt-2.5 font-heading text-[clamp(1.8rem,4.4vw,2.8rem)] font-bold leading-[1.05] tracking-[-0.02em]"
            >
              Actividades Intylact
            </h2>
            <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-teal-900/70">
              Educación sobre salud íntima, novedades de la marca y lo que
              hacemos con nuestra comunidad.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-teal-900 px-5 font-heading text-sm font-semibold text-white transition-colors duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:bg-coral-500"
          >
            Ver todo
            <Icon name="arrow-right" size={15} />
          </Link>
        </div>
      </Reveal>

      <div className="mt-9 grid gap-5 lg:grid-cols-2">
        {/* Lead post */}
        <Reveal className="h-full">
          <Link
            href={lead.href}
            className="group flex h-full flex-col overflow-hidden rounded-[16px] bg-cream transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,48,60,.14)]"
          >
            <div
              className={`sheen relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${lead.accent}`}
            >
              {lead.image ? (
                <Image
                  src={lead.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="object-cover transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-105"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center">
                  <Icon name="sparkle" size={40} className="text-white/60" />
                </span>
              )}
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-wider text-teal-900">
                {lead.category}
              </span>
            </div>

            <div className="flex flex-1 flex-col p-6 sm:p-7">
              <p className="flex items-center gap-2 text-[12px] text-teal-900/55">
                <time dateTime={lead.date}>{formatPostDate(lead.date)}</time>
                <span aria-hidden="true">·</span>
                <span>{lead.readMinutes} min de lectura</span>
              </p>
              <h3 className="mt-2.5 font-heading text-xl font-semibold leading-snug sm:text-2xl">
                {lead.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-teal-900/70">
                {lead.excerpt}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-coral-500 transition-colors duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:text-teal-900">
                Leer más
                <Icon
                  name="arrow-right"
                  size={15}
                  className="transition-transform duration-[var(--dur-fast)] ease-[var(--ease-brand)] group-hover:translate-x-1"
                />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Remaining posts */}
        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {rest.map((p, i) => (
            <li key={p.slug}>
              <Reveal delay={(i + 1) * 90} className="h-full">
                <Link
                  href={p.href}
                  className="group flex h-full gap-4 overflow-hidden rounded-[14px] bg-cream p-3.5 transition-[transform,box-shadow] duration-[var(--dur-fast)] ease-[var(--ease-brand)] hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(0,48,60,.12)] lg:items-center"
                >
                  <span
                    className={`relative grid aspect-square w-20 shrink-0 place-items-center overflow-hidden rounded-[10px] bg-gradient-to-br ${p.accent} sm:w-full sm:aspect-[16/10] lg:w-24 lg:aspect-square`}
                  >
                    {p.image ? (
                      <Image
                        src={p.image}
                        alt=""
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    ) : (
                      <Icon name="sparkle" size={20} className="text-white/70" />
                    )}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col justify-center">
                    <span className="text-[11px] font-medium uppercase tracking-wider text-coral-500">
                      {p.category}
                    </span>
                    <span className="mt-1 block font-heading text-[15px] font-semibold leading-snug text-teal-900">
                      {p.title}
                    </span>
                    <span className="mt-1.5 block text-[12px] text-teal-900/55">
                      {p.readMinutes} min de lectura
                    </span>
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <ScallopDivider color="text-cream" position="bottom" />
    </SectionShell>
  );
}
