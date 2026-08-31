/**
 * Product catalogue — single source of truth for the product grid, the footer
 * links, and (later) the product routes.
 *
 * SWAP-IN POINT: `image` paths point at /public/products/*. Drop real
 * transparent PNGs at those filenames and the whole site picks them up; no other
 * file needs to change. `image: null` renders the placeholder tile.
 */

export type Product = {
  slug: string;
  name: string;
  /** One-line hook shown on the card */
  tagline: string;
  /** Longer description for the product page and expanded cards */
  detail: string;
  /** Presentation, e.g. "50 ml" */
  size: string;
  /** Gradient stops behind the product shot, as Tailwind from-/to- utilities */
  accent: string;
  image: string | null;
  category: "gel" | "jabon" | "suplemento" | "copa";
  /** Featured products lead the grid and get the large treatment */
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "gel-hidratante-intimo",
    name: "Gel Hidratante Íntimo",
    tagline: "Aclarante con prebióticos, ácido hialurónico y ácido láctico",
    detail:
      "Hidratación profunda para la zona íntima. Su fórmula con ácido hialurónico retiene la humedad natural, mientras el ácido láctico ayuda a mantener el pH en equilibrio.",
    size: "50 ml",
    accent: "from-coral-100 to-coral-200",
    image: "/products/group-54.webp",
    category: "gel",
    featured: true,
  },
  {
    slug: "intyprob",
    name: "IntyProb",
    tagline: "Probióticos e inositol para tu equilibrio vaginal",
    detail:
      "Promueve la salud vaginal, mejora la regularidad digestiva, restaura la flora y el equilibrio del pH, y fortalece el sistema inmunológico.",
    size: "60 cápsulas",
    accent: "from-pink-500/15 to-violet-500/15",
    image: "/products/intyprob.webp",
    category: "suplemento",
    featured: true,
  },
  {
    slug: "copas-urinarias",
    name: "Copas Urinarias Desechables",
    tagline: "Embudo urinario femenino, listo para usar",
    detail:
      "Evita el contacto con superficies en baños públicos. Cartón compostable, con aroma a jazmín y práctico para llevar contigo.",
    size: "10 piezas",
    accent: "from-violet-500/15 to-mint-100",
    image: "/products/group-52.webp",
    category: "copa",
    featured: true,
  },
  {
    slug: "jabon-intimo-autoclean",
    name: "Jabón Íntimo Autoclean",
    tagline: "Limpieza suave que respeta tu pH natural",
    detail:
      "Higiene diaria sin resecar. Formulado para cuidar la microbiota de tu zona íntima.",
    size: "200 ml",
    accent: "from-mint-100 to-butter-100",
    image: null,
    category: "jabon",
  },
  {
    slug: "jabon-intimo-intensecalm",
    name: "Jabón Íntimo Intensecalm",
    tagline: "Alivio calmante para piel sensible",
    detail:
      "Sensación de frescura y calma inmediata, ideal si presentas irritación o sensibilidad.",
    size: "200 ml",
    accent: "from-butter-100 to-coral-100",
    image: null,
    category: "jabon",
  },
  {
    slug: "jabon-intimo-tripack",
    name: "Jabón Íntimo TRIPACK",
    tagline: "Tus tres favoritos en un solo pack",
    detail:
      "El kit completo de higiene íntima para acompañarte todo el mes, con ahorro.",
    size: "3 × 200 ml",
    accent: "from-mint-100 to-mint-300/40",
    image: null,
    category: "jabon",
  },
];

/** Benefit claims shown in the scrolling ticker. */
export const benefits = [
  { label: "Libre de Crueldad", icon: "rabbit" },
  { label: "Libre de Gluten", icon: "wheat" },
  { label: "Libre de Parabeno", icon: "leaf" },
  { label: "pH Balanceado", icon: "drop" },
  { label: "Vegano", icon: "apple" },
  { label: "Sin Alcohol", icon: "no-alcohol" },
  { label: "95% Libre de Bacterias", icon: "shield" },
] as const;

export const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Tienda", href: "/tienda" },
  { label: "Ellas nos necesitan", href: "/ellas-nos-necesitan" },
  { label: "Blog", href: "/blog" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Calculadora menstrual", href: "/#calculadora" },
  { label: "Contáctanos", href: "/contacto" },
] as const;
