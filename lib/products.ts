/**
 * Product catalogue — single source of truth for the product grid, the footer
 * links, and (later) the product routes.
 *
 * SWAP-IN POINT: `image` paths point at /public/products/*. Drop real
 * transparent PNGs at those filenames and the whole site picks them up; no other
 * file needs to change. `image: null` renders the placeholder tile.
 */

export type CategoryId = "gel" | "jabon" | "suplemento" | "copa";

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
  category: CategoryId;
  /** Featured products lead the grid and get the large treatment */
  featured?: boolean;

  /* ---- Commerce ----------------------------------------------------------
     PLACEHOLDER PRICING. Every `price`/`compareAt` below is an example value,
     not Intylact's real pricing. Replace them here — this file is the single
     source of truth, so nothing else needs editing. Prices are MXN.
     ---------------------------------------------------------------------- */
  price: number;
  /** Original price when discounted; drives the sale badge and strike-through */
  compareAt?: number;
  /** Average rating 0–5. PLACEHOLDER — replace with real review data. */
  rating?: number;
  reviewCount?: number;
  badge?: "nuevo" | "mas-vendido" | "agotandose";
  inStock?: boolean;
};

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
  /** Tailwind gradient stops for the category tile */
  accent: string;
};

export const categories: Category[] = [
  {
    id: "gel",
    label: "Hidratación",
    blurb: "Geles y cuidado diario",
    accent: "from-coral-100 to-coral-200",
  },
  {
    id: "jabon",
    label: "Higiene íntima",
    blurb: "Jabones con pH balanceado",
    accent: "from-mint-100 to-mint-300/50",
  },
  {
    id: "suplemento",
    label: "Suplementos",
    blurb: "Probióticos e inositol",
    accent: "from-violet-500/15 to-pink-500/20",
  },
  {
    id: "copa",
    label: "Protección",
    blurb: "Copas y esenciales",
    accent: "from-butter-100 to-butter-200/70",
  },
];

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
    price: 289,
    compareAt: 349,
    rating: 4.8,
    reviewCount: 0,
    badge: "mas-vendido",
    inStock: true,
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
    price: 549,
    compareAt: 649,
    rating: 4.9,
    reviewCount: 0,
    badge: "nuevo",
    inStock: true,
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
    price: 199,
    rating: 4.7,
    reviewCount: 0,
    inStock: true,
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
    price: 179,
    rating: 4.6,
    reviewCount: 0,
    inStock: true,
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
    price: 179,
    rating: 4.7,
    reviewCount: 0,
    inStock: true,
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
    price: 449,
    compareAt: 537,
    rating: 4.9,
    reviewCount: 0,
    badge: "mas-vendido",
    inStock: true,
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
