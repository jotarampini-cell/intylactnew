import type { Product } from "@/lib/products";
import { getCategory } from "@/lib/products";
import { BADGE_LABELS, discountPercent, formatPrice } from "@/lib/commerce";

/**
 * Right-hand column of the product page: identity, price, benefits, and the
 * purchase call to action.
 *
 * There is no cart on this site yet, so the CTA is an explicit "Próximamente"
 * state rather than a button that looks live and does nothing. Swap it for a
 * real link (storefront or WhatsApp) once checkout exists.
 */
export default function ProductInfo({ product: p }: { product: Product }) {
  const off = discountPercent(p);
  const category = getCategory(p.category);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        {category && (
          <span className="rounded-full bg-teal-900/6 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-900/70">
            {category.label}
          </span>
        )}
        {p.badge && (
          <span className="rounded-full bg-butter-200 px-3 py-1 font-heading text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-900">
            {BADGE_LABELS[p.badge]}
          </span>
        )}
        {off !== null && (
          <span className="rounded-full bg-teal-900 px-3 py-1 font-heading text-[11px] font-bold text-white">
            −{off}%
          </span>
        )}
      </div>

      <h1 className="mt-4 font-heading text-[clamp(1.9rem,4.4vw,2.9rem)] font-bold leading-[1.06] tracking-[-0.02em]">
        {p.name}
      </h1>

      <p className="mt-3 text-[15px] leading-relaxed text-teal-900/75 sm:text-base">
        {p.tagline}
      </p>

      {/* Price */}
      <div className="mt-6 flex flex-wrap items-baseline gap-3">
        <span className="font-heading text-3xl font-bold">{formatPrice(p.price)}</span>
        {p.compareAt && p.compareAt > p.price && (
          <span className="text-base text-teal-900/45 line-through">
            {formatPrice(p.compareAt)}
          </span>
        )}
        <span className="text-[13px] text-teal-900/55">· {p.size}</span>
      </div>

      <p className="mt-5 max-w-[54ch] text-[15px] leading-relaxed text-teal-900/75">
        {p.detail}
      </p>

      {p.benefits.length > 0 && (
        <ul className="mt-7 space-y-2.5">
          {p.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-mint-300">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
                  <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-[15px] leading-relaxed text-teal-900/85">{b}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Purchase CTA — no checkout yet, so this states that plainly */}
      <div className="mt-8 rounded-2xl border-2 border-dashed border-teal-900/15 bg-teal-900/[0.03] p-5">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-butter-200">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900">
              <path d="M6 8h12l-1 11a2 2 0 01-2 1.8H9A2 2 0 017 19z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
              <path d="M9.5 8V6.5a2.5 2.5 0 015 0V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </span>
          <div>
            <p className="font-heading text-[15px] font-semibold">
              Compra en línea próximamente
            </p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-teal-900/65">
              Estamos preparando nuestra tienda. Escríbenos y te decimos cómo
              conseguirlo hoy.
            </p>
          </div>
        </div>
        <a
          href="/contacto"
          className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-teal-900 px-6 font-heading text-[15px] font-semibold text-white transition-[transform,background-color] duration-300 ease-[var(--ease-brand)] hover:-translate-y-0.5 hover:bg-coral-500"
        >
          Quiero este producto
        </a>
      </div>

      {/* Shipping / returns */}
      <div className="mt-4 space-y-2">
        {[
          {
            q: "Envíos y entregas",
            a: "Preparamos tu pedido en 24–48 horas hábiles. Los tiempos de entrega varían según tu ubicación.",
          },
          {
            q: "Cambios y devoluciones",
            a: "Si algo no está bien con tu producto, escríbenos dentro de los primeros días tras recibirlo y lo resolvemos contigo.",
          },
        ].map((f) => (
          <details key={f.q} className="group rounded-2xl bg-teal-900/[0.04] px-5">
            <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 font-heading text-[14px] font-semibold [&::-webkit-details-marker]:hidden">
              {f.q}
              <span
                aria-hidden="true"
                className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal-900/8 transition-transform duration-300 ease-[var(--ease-brand)] group-open:rotate-45"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="pb-4 text-[14px] leading-relaxed text-teal-900/70">{f.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
