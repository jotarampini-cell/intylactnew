import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { BADGE_LABELS, discountPercent, formatPrice } from "@/lib/commerce";
import Icon from "@/components/ui/Icon";

/**
 * Product card used by every rail.
 *
 * `compact` drops the long description for dense rails; the default shows it
 * from `sm` up. Ratings render only when review data exists, so a product with
 * no reviews never shows an empty or invented star row.
 */
export default function ProductCard({
  product: p,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const off = discountPercent(p);
  const hasReviews = typeof p.reviewCount === "number" && p.reviewCount > 0;

  return (
    <Link
      href={`/tienda/${p.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] bg-white shadow-[0_4px_24px_rgba(0,48,60,.08)] transition-[transform,box-shadow] duration-300 ease-[var(--ease-brand)] hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,48,60,.16)] sm:rounded-[1.75rem]"
    >
      <div
        className={`relative grid aspect-square place-items-center overflow-hidden bg-gradient-to-br ${p.accent}`}
      >
        {/* Badges */}
        <div className="absolute left-3.5 top-3.5 z-10 flex flex-col items-start gap-1.5">
          {off !== null && (
            <span className="rounded-full bg-teal-900 px-2.5 py-1 font-heading text-[11px] font-bold text-white">
              −{off}%
            </span>
          )}
          {p.badge && (
            <span className="rounded-full bg-white/95 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-teal-900">
              {BADGE_LABELS[p.badge]}
            </span>
          )}
        </div>

        <span className="absolute right-3.5 top-3.5 z-10 rounded-full bg-white/85 px-2.5 py-1 font-heading text-[10px] font-semibold uppercase tracking-wider text-teal-900">
          {p.size}
        </span>

        {p.image ? (
          <Image
            src={p.image}
            alt={p.name}
            width={460}
            height={460}
            sizes="(max-width: 640px) 76vw, (max-width: 1024px) 45vw, 300px"
            className="h-[80%] w-auto object-contain drop-shadow-[0_14px_26px_rgba(0,48,60,.18)] transition-transform duration-500 ease-[var(--ease-brand)] group-hover:scale-[1.07]"
          />
        ) : (
          <span className="grid h-[62%] w-[62%] place-items-center rounded-2xl bg-white/55 text-center font-heading text-[13px] font-medium text-teal-900/50">
            Próximamente
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-heading text-base font-semibold leading-snug sm:text-lg">
          {p.name}
        </h3>

        <p className="mt-1.5 text-[13px] leading-relaxed text-teal-900/70">
          {p.tagline}
        </p>

        {!compact && (
          <p className="mt-2.5 hidden flex-1 text-sm leading-relaxed text-teal-900/55 lg:block">
            {p.detail}
          </p>
        )}

        {/* Rating — only when there is real review data */}
        {hasReviews && p.rating && (
          <span className="mt-3 flex items-center gap-1.5">
            <span className="flex" role="img" aria-label={`${p.rating} de 5 estrellas`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="star"
                  size={13}
                  className={i < Math.round(p.rating!) ? "text-butter-200" : "text-teal-900/15"}
                />
              ))}
            </span>
            <span className="text-[12px] text-teal-900/55">({p.reviewCount})</span>
          </span>
        )}

        {/* Price */}
        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-heading text-lg font-bold text-teal-900">
            {formatPrice(p.price)}
          </span>
          {p.compareAt && p.compareAt > p.price && (
            <span className="text-[13px] text-teal-900/45 line-through">
              {formatPrice(p.compareAt)}
            </span>
          )}
        </div>

        <span className="mt-3 inline-flex items-center justify-center rounded-full bg-teal-900 px-5 py-2.5 font-heading text-sm font-semibold text-white transition-colors duration-300 ease-[var(--ease-brand)] group-hover:bg-coral-500">
          Ver producto
        </span>
      </div>
    </Link>
  );
}
