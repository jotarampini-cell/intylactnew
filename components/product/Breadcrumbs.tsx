import Link from "next/link";

export default function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  return (
    <nav aria-label="Ruta de navegación">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-teal-900/60">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="-mx-1 inline-flex min-h-11 items-center px-1 transition-colors duration-300 ease-[var(--ease-brand)] hover:text-teal-900"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "font-medium text-teal-900" : undefined} aria-current={last ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!last && (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="text-teal-900/30">
                  <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
