import Link from "next/link";
import { products, navLinks } from "@/lib/products";
import Logo from "@/components/ui/Logo";

const socials = [
  { label: "Facebook", href: "https://facebook.com", d: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z" },
  { label: "Instagram", href: "https://instagram.com", d: "M12 8.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17.5 6a.9.9 0 100 1.8.9.9 0 000-1.8zM7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4z" },
  { label: "TikTok", href: "https://tiktok.com", d: "M15 4c.5 2.2 1.9 3.6 4 3.9v3c-1.5.1-2.9-.3-4.2-1.1v5.6a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v3.1a2.6 2.6 0 102 2.5V4h2.9z" },
  { label: "YouTube", href: "https://youtube.com", d: "M22 12s0-3-.4-4.4a2.5 2.5 0 00-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4a2.5 2.5 0 00-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.4a2.5 2.5 0 001.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.5 2.5 0 001.8-1.8C22 15 22 12 22 12zM10 15V9l5 3-5 3z" },
  { label: "X", href: "https://x.com", d: "M17.5 3h3l-6.6 7.5L21.7 21h-6l-4.7-6.1L5.6 21h-3l7-8L2.6 3h6.1l4.2 5.6L17.5 3z" },
];

export default function Footer() {
  return (
    <footer
      className="relative mt-auto text-white"
      style={{ background: "var(--grad-violet)" }}
    >
      <div className="mx-auto grid max-w-[1280px] gap-10 px-[22px] py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo className="h-8" variant="light" />
          <p className="mt-4 max-w-[26ch] text-sm leading-relaxed text-white/80">
            Cuidado íntimo formulado con probióticos e inositol, para el equilibrio
            de tu zona V.
          </p>
        </div>

        <nav aria-labelledby="footer-enlaces">
          <h2 id="footer-enlaces" className="font-heading text-lg font-bold text-white">
            Enlaces Rápidos
          </h2>
          <ul className="mt-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-productos">
          <h2 id="footer-productos" className="font-heading text-lg font-bold text-white">
            Productos
          </h2>
          <ul className="mt-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/tienda/${p.slug}`}
                  className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-white/80 transition-colors hover:text-white"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-heading text-lg font-bold text-white">Redes Sociales</h2>
          <ul className="mt-4 flex flex-wrap gap-3">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/30"
                >
                  <span className="sr-only">{s.label}</span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d={s.d} />
                  </svg>
                </a>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[13px] leading-relaxed text-white/75">
            La información provista es meramente de uso informativo y no pretende
            sustituir las recomendaciones de su médico y/o profesional calificado
            del área de la salud. Ante cualquier duda consulte a su especialista.
          </p>
        </div>
      </div>

      <div className="border-t border-white/15">
        <p className="mx-auto max-w-[1280px] px-[22px] py-5 text-center text-[13px] text-white/75">
          © {new Date().getFullYear()} Intylact · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
