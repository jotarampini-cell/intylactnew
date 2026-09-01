/**
 * Blog / activities index.
 *
 * PLACEHOLDER CONTENT. These entries describe the kind of posts the section is
 * built for, so the layout is reviewable — they are not real articles. Replace
 * them with actual posts (or wire this to a CMS) before launch; publishing
 * invented article titles that lead nowhere frustrates readers and hurts SEO.
 *
 * `href` points at /blog for now, since the individual post routes don't exist
 * yet. Give each post its own slug when the articles are written.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: "educación" | "comunidad" | "bienestar" | "novedades";
  /** ISO date; formatted for display at render time */
  date: string;
  readMinutes: number;
  image: string | null;
  /** Gradient placeholder while there is no cover image */
  accent: string;
  href: string;
};

export const posts: Post[] = [
  {
    slug: "por-que-importa-el-ph",
    title: "Por qué el pH de tu zona íntima importa más de lo que crees",
    excerpt:
      "Tu microbiota vaginal se defiende sola cuando el ambiente es el correcto. Te explicamos qué lo altera y cómo cuidarlo.",
    category: "educación",
    date: "2026-08-12",
    readMinutes: 4,
    image: "/blog/ph-importa.jpg",
    accent: "from-mint-100 to-mint-300/50",
    href: "/blog",
  },
  {
    slug: "probioticos-e-inositol",
    title: "Probióticos e inositol: qué hacen realmente por ti",
    excerpt:
      "Dos ingredientes que aparecen en todas partes y casi nadie explica bien. Aquí van, sin tecnicismos.",
    category: "educación",
    date: "2026-07-28",
    readMinutes: 6,
    image: "/blog/probioticos.jpg",
    accent: "from-violet-500/20 to-pink-500/20",
    href: "/blog",
  },
  {
    slug: "ellas-nos-necesitan-jornada",
    title: "Jornada Ellas Nos Necesitan: lo que logramos juntas",
    excerpt:
      "Un recuento de nuestra campaña de donación de insumos de higiene íntima y a dónde llegó cada aporte.",
    category: "comunidad",
    date: "2026-07-05",
    readMinutes: 3,
    image: "/blog/jornada.jpg",
    accent: "from-coral-100 to-coral-200",
    href: "/ellas-nos-necesitan",
  },
  {
    slug: "rutina-de-cuidado-diario",
    title: "Cómo armar tu rutina de cuidado íntimo en 3 pasos",
    excerpt:
      "Limpieza, hidratación y equilibrio. Una guía corta para empezar sin complicarte.",
    category: "bienestar",
    date: "2026-06-19",
    readMinutes: 5,
    image: "/blog/rutina.jpg",
    accent: "from-butter-100 to-butter-200/70",
    href: "/blog",
  },
];

const dateFormatter = new Intl.DateTimeFormat("es-MX", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function formatPostDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T12:00:00`));
}
