import Link from "next/link";
import { products, navLinks } from "@/lib/products";
import Logo from "@/components/ui/Logo";
import NewsletterForm from "@/components/ui/NewsletterForm";

/**
 * Site footer.
 *
 * Deliberately restructured away from the current intylact.com footer, which is
 * three flat link columns on a violet gradient. Here the footer opens with a
 * newsletter capture and a trust strip, groups links into collapsible sections
 * on phones (18 stacked links ran 1,273px tall — the tallest block on the page),
 * and sits on deep teal so the page ends on brand colour rather than repeating
 * the hero gradient.
 */
const socials = [
  { label: "Instagram", href: "https://instagram.com", d: "M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6a.9.9 0 100 1.8.9.9 0 000-1.8zM7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" },
  { label: "TikTok", href: "https://tiktok.com", d: "M15 4c.5 2.2 1.9 3.6 4 3.9v3c-1.5.1-2.9-.3-4.2-1.1v5.6a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 102 2.5V4h2.9z" },
  { label: "Facebook", href: "https://facebook.com", d: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" },
  { label: "YouTube", href: "https://youtube.com", d: "M22 12s0-3-.4-4.4a2.5 2.5 0 00-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.4a2.5 2.5 0 001.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.5 2.5 0 001.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z" },
];

const trust = [
  { label: "Envío a todo México", d: "M3 7h11v8H3zM14 10h4l3 3v2h-7z M7 18a1.6 1.6 0 100-3.2A1.6 1.6 0 007 18zM17.5 18a1.6 1.6 0 100-3.2 1.6 1.6 0 000 3.2z" },
  { label: "Pago seguro", d: "M12 3l7 3v5.5c0 4.4-2.9 8.2-7 9.5-4.1-1.3-7-5.1-7-9.5V6z M9.2 12.2l2 2 3.6-3.9" },
  { label: "Fórmulas veganas", d: "M5 19c0-8 5-13 14-13 0 9-5 14-13 14H5z M5 19c3-4 6-6 10-7.5" },
];

/** Collapsible on phones via <details>; always open from sm up. */
function LinkGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Phone: accordion */}
      <details className="group border-b border-white/12 sm:hidden">
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between font-heading text-[15px] font-semibold text-white [&::-webkit-details-marker]:hidden">
          {title}
          <span
            aria-hidden="true"
            className="grid h-6 w-6 place-items-center transition-transform duration-300 ease-[var(--ease-brand)] group-open:rotate-45"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </span>
        </summary>
        <div className="pb-3">{children}</div>
      </details>

      {/* sm and up: plain column */}
      <div className="hidden sm:block">
        <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.14em] text-white/55">
          {title}
        </h2>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}

function LinkList({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul>
      {items.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-white/75 transition-colors duration-300 ease-[var(--ease-brand)] hover:text-white sm:min-h-9"
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function Footer() {
  return (
    <footer className="relative mt-auto bg-teal-900 text-white">
      {/* Newsletter — the old footer has no capture at all */}
      <div className="border-b border-white/10">
        <div className="mx-auto grid max-w-[1280px] items-center gap-5 px-[22px] py-9 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-14">
          <div>
            <h2 className="font-heading text-[clamp(1.35rem,3.4vw,2.1rem)] font-bold leading-[1.12] tracking-[-0.01em]">
              Cuidarte bien empieza por saber más
            </h2>
            <p className="mt-2.5 max-w-[46ch] text-sm leading-relaxed text-white/70 sm:text-[15px]">
              Consejos de salud íntima y acceso anticipado a ofertas. Sin spam.
            </p>
          </div>
          <NewsletterForm />
        </div>
      </div>

      {/* Trust strip */}
      <div className="border-b border-white/10">
        <ul className="mx-auto flex max-w-[1280px] flex-wrap justify-center gap-x-5 gap-y-2 px-[22px] py-4 sm:gap-x-10 sm:py-6">
          {trust.map((t) => (
            <li key={t.label} className="flex items-center gap-2.5">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0 text-mint-300"
              >
                <path d={t.d} />
              </svg>
              <span className="text-[13px] font-medium text-white/80">{t.label}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-[1280px] px-[22px] py-8 sm:py-14">
        <div className="grid gap-x-8 gap-y-1 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="mb-4 sm:mb-0 sm:col-span-2 lg:col-span-1">
            <Logo className="h-7" variant="light" />
            <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-white/70 sm:mt-4">
              Cuidado íntimo formulado con probióticos e inositol, para el
              equilibrio de tu zona V.
            </p>
            <ul className="mt-4 flex gap-2.5 sm:mt-5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 ease-[var(--ease-brand)] hover:bg-mint-300 hover:text-teal-900"
                  >
                    <span className="sr-only">{s.label}</span>
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d={s.d} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <LinkGroup title="Tienda">
            <LinkList items={products.map((p) => ({ label: p.name, href: `/tienda/${p.slug}` }))} />
          </LinkGroup>

          <LinkGroup title="Explorar">
            <LinkList items={navLinks.filter((l) => l.href !== "/")} />
          </LinkGroup>

          <LinkGroup title="Ayuda">
            <LinkList
              items={[
                { label: "Preguntas frecuentes", href: "/#faq" },
                { label: "Contáctanos", href: "/contacto" },
                { label: "Calculadora menstrual", href: "/#calculadora" },
                { label: "Aviso de privacidad", href: "/privacidad" },
              ]}
            />
          </LinkGroup>
        </div>

        <p className="mt-7 max-w-[80ch] text-[13px] leading-relaxed text-white/50 sm:mt-9">
          La información provista es meramente de uso informativo y no pretende
          sustituir las recomendaciones de su médico y/o profesional calificado
          del área de la salud. Ante cualquier duda consulte a su especialista.
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-2 px-[22px] py-5 text-[13px] text-white/55 sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} Intylact · Todos los derechos reservados</p>
          <p>Hecho con cuidado en México</p>
        </div>
      </div>
    </footer>
  );
}
