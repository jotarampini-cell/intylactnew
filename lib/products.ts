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
  tagline: string;
  /** Accent behind the product shot; a Tailwind bg-* utility */
  accent: string;
  image: string | null;
  category: "gel" | "jabon" | "suplemento" | "copa";
};

export const products: Product[] = [
  {
    slug: "gel-hidratante-intimo",
    name: "Gel Hidratante Íntimo",
    tagline: "Hidratación diaria para tu zona V",
    accent: "bg-mint-100",
    image: null,
    category: "gel",
  },
  {
    slug: "jabon-intimo-autoclean",
    name: "Jabón Íntimo Autoclean",
    tagline: "Limpieza suave que respeta tu pH",
    accent: "bg-butter-100",
    image: null,
    category: "jabon",
  },
  {
    slug: "jabon-intimo-intensecalm",
    name: "Jabón Íntimo Intensecalm",
    tagline: "Alivio calmante para piel sensible",
    accent: "bg-coral-100",
    image: null,
    category: "jabon",
  },
  {
    slug: "jabon-intimo-tripack",
    name: "Jabón Íntimo TRIPACK",
    tagline: "Tus tres favoritos en un solo pack",
    accent: "bg-mint-100",
    image: null,
    category: "jabon",
  },
  {
    slug: "intyprob",
    name: "IntyProb",
    tagline: "Probióticos e inositol en cápsulas",
    accent: "bg-coral-100",
    image: null,
    category: "suplemento",
  },
  {
    slug: "copa-menstrual",
    name: "Copa Menstrual",
    tagline: "Protección reutilizable hasta 12 horas",
    accent: "bg-butter-100",
    image: null,
    category: "copa",
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
