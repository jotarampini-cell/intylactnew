/**
 * Product catalogue — single source of truth for the grid, the rails, the
 * footer, the shop, and the product pages.
 *
 * Names, prices, images and presentations were taken from the live store at
 * intylact.com/tienda. Prices are USD, matching that store.
 *
 * Descriptions, benefits, ingredients and usage steps are written for this site
 * (the current product pages carry only ~150 characters of copy). They describe
 * what each product is, without adding clinical claims.
 */

export type CategoryId =
  | "gel"
  | "jabon"
  | "toallitas"
  | "suplemento"
  | "copa"
  | "pack";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  detail: string;
  size: string;
  /** Gradient stops behind the shot, as Tailwind from-/to- utilities */
  accent: string;
  image: string | null;
  /** Extra shots for the product gallery; the main `image` leads */
  gallery?: string[];
  category: CategoryId;
  featured?: boolean;

  /** USD, matching the live store */
  price: number;
  /** Set only when a real promotion is running; drives badge + strike-through */
  compareAt?: number;
  rating?: number;
  /** Real review count. 0 means no stars are rendered at all. */
  reviewCount?: number;
  badge?: "nuevo" | "mas-vendido" | "agotandose";
  inStock?: boolean;

  benefits: string[];
  ingredients?: string[];
  howToUse?: string[];
  relatedSlugs?: string[];
};

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
  accent: string;
};

export const categories: Category[] = [
  {
    id: "suplemento",
    label: "Suplementos",
    blurb: "Probióticos y cápsulas",
    accent: "from-violet-500/15 to-pink-500/20",
  },
  {
    id: "jabon",
    label: "Higiene íntima",
    blurb: "Jabones con pH balanceado",
    accent: "from-mint-100 to-mint-300/50",
  },
  {
    id: "toallitas",
    label: "Toallitas",
    blurb: "Frescura para llevar",
    accent: "from-coral-100 to-coral-200",
  },
  {
    id: "gel",
    label: "Hidratación",
    blurb: "Geles de cuidado diario",
    accent: "from-coral-100 to-butter-100",
  },
  {
    id: "copa",
    label: "Protección",
    blurb: "Esenciales fuera de casa",
    accent: "from-butter-100 to-butter-200/70",
  },
  {
    id: "pack",
    label: "Packs",
    blurb: "Combos con ahorro",
    accent: "from-mint-100 to-coral-100",
  },
];

/* --------------------------------------------------------------------------
   NOTE ON DISCOUNTS
   `compareAt` values below are EXAMPLES so the offer rail and countdown are
   visible during review. Remove them (or set real ones) before launch —
   showing a struck-through price that was never charged is deceptive
   advertising and actionable under PROFECO rules in Mexico.
   -------------------------------------------------------------------------- */

export const products: Product[] = [
  {
    slug: "intyprob",
    name: "IntyProb",
    tagline: "Probióticos e inositol para tu equilibrio vaginal",
    detail:
      "Cápsulas formuladas para acompañar el equilibrio de tu flora vaginal y tu bienestar digestivo, desde adentro hacia afuera.",
    size: "60 cápsulas",
    accent: "from-pink-500/15 to-violet-500/15",
    image: "/products/intyprob-full.jpg",
    gallery: ["/products/intyprob.webp"],
    category: "suplemento",
    featured: true,
    price: 49.99,
    compareAt: 59.99,
    reviewCount: 0,
    badge: "mas-vendido",
    inStock: true,
    benefits: [
      "Acompaña el equilibrio de tu flora vaginal",
      "Apoya la regularidad digestiva",
      "Contribuye al equilibrio del pH",
      "Fórmula con probióticos e inositol",
    ],
    ingredients: [
      "Complejo probiótico (Lactobacillus)",
      "Inositol",
      "Cápsula vegetal",
    ],
    howToUse: [
      "Toma una cápsula al día, preferentemente con alimentos.",
      "Acompáñala con un vaso de agua.",
      "Para notar el efecto, mantén el uso constante durante al menos un mes.",
    ],
    relatedSlugs: ["intyprob-twopack", "intyprob-tripack", "intypure"],
  },
  {
    slug: "intyprob-twopack",
    name: "IntyProb TWOPACK",
    tagline: "Dos meses de tu rutina, con ahorro",
    detail:
      "Dos frascos de IntyProb para sostener tu rutina sin interrupciones y a mejor precio por unidad.",
    size: "2 × 60 cápsulas",
    accent: "from-violet-500/15 to-mint-100",
    image: "/products/intyprob-twopack.jpg",
    category: "suplemento",
    price: 94.99,
    compareAt: 99.98,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Dos meses de rutina asegurados",
      "Mejor precio por frasco",
      "La constancia es lo que marca la diferencia",
    ],
    relatedSlugs: ["intyprob", "intyprob-tripack"],
  },
  {
    slug: "intyprob-tripack",
    name: "IntyProb TRIPACK",
    tagline: "Tres meses de constancia al mejor precio",
    detail:
      "El formato con mayor ahorro por frasco, pensado para quienes ya hicieron de IntyProb parte de su rutina.",
    size: "3 × 60 cápsulas",
    accent: "from-pink-500/20 to-coral-100",
    image: "/products/intyprob-tripack.jpg",
    category: "suplemento",
    price: 134.99,
    compareAt: 149.97,
    reviewCount: 0,
    badge: "mas-vendido",
    inStock: true,
    benefits: [
      "El mejor precio por frasco",
      "Tres meses sin reponer",
      "Ideal para mantener el hábito",
    ],
    relatedSlugs: ["intyprob", "intyprob-twopack"],
  },
  {
    slug: "intypure",
    name: "IntyPure",
    tagline: "Cápsulas desodorantes internas",
    detail:
      "Cápsulas pensadas para acompañar tu frescura desde adentro, como complemento de tu rutina de higiene íntima diaria.",
    size: "Cápsulas",
    accent: "from-mint-100 to-violet-500/15",
    image: "/products/intypure.jpg",
    category: "suplemento",
    featured: true,
    price: 44.99,
    reviewCount: 0,
    badge: "nuevo",
    inStock: true,
    benefits: [
      "Complementa tu rutina de higiene íntima",
      "Formato práctico para el día a día",
      "Fácil de integrar a tu rutina",
    ],
    howToUse: [
      "Sigue la dosis indicada en el empaque.",
      "Acompaña con agua suficiente.",
    ],
    relatedSlugs: ["intyprob", "jabon-neutro"],
  },
  {
    slug: "jabon-ropa-intima",
    name: "Jabón Especial para Ropa Íntima",
    tagline: "Cuidado también para lo que está en contacto contigo",
    detail:
      "Formulado para lavar tu ropa íntima con suavidad, cuidando las telas delicadas y lo que está todo el día en contacto con tu piel.",
    size: "Presentación única",
    accent: "from-mint-100 to-mint-300/50",
    image: "/products/jabon-ropa-intima.jpg",
    category: "jabon",
    price: 15.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Pensado para telas delicadas",
      "Cuida lo que está en contacto con tu piel",
      "Complemento natural de tu rutina íntima",
    ],
    howToUse: [
      "Aplica directamente sobre la prenda húmeda.",
      "Frota con suavidad y deja actuar un momento.",
      "Enjuaga con abundante agua.",
    ],
    relatedSlugs: ["jabon-neutro", "toallitas-floral"],
  },
  {
    slug: "jabon-neutro",
    name: "Jabón Íntimo — Neutro",
    tagline: "Limpieza suave que respeta tu pH natural",
    detail:
      "Higiene diaria sin fragancias añadidas, formulado para respetar el pH natural de la zona íntima y cuidar tu microbiota.",
    size: "Presentación única",
    accent: "from-mint-100 to-butter-100",
    image: "/products/jabon-neutro.jpg",
    category: "jabon",
    featured: true,
    price: 13.99,
    compareAt: 16.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Respeta el pH natural de tu zona íntima",
      "Sin fragancias añadidas",
      "Apto para uso diario",
      "Ideal para piel sensible",
    ],
    howToUse: [
      "Aplica una pequeña cantidad sobre la zona externa.",
      "Masajea con suavidad durante unos segundos.",
      "Enjuaga con abundante agua y seca sin frotar.",
    ],
    relatedSlugs: ["jabon-ropa-intima", "toallitas-manzanilla", "intyprob"],
  },
  {
    slug: "toallitas-arandanos",
    name: "Toallitas Húmedas — Arándanos",
    tagline: "Frescura inmediata donde estés",
    detail:
      "Toallitas para refrescar tu zona íntima fuera de casa, con aroma a arándanos y formato práctico para llevar contigo.",
    size: "Paquete",
    accent: "from-pink-500/20 to-coral-100",
    image: "/products/toallitas-arandanos.jpg",
    category: "toallitas",
    price: 2.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Frescura inmediata fuera de casa",
      "Formato práctico para tu bolso",
      "Aroma suave a arándanos",
    ],
    howToUse: [
      "Usa una toallita sobre la zona externa.",
      "Desecha en el bote de basura, nunca en el inodoro.",
    ],
    relatedSlugs: ["toallitas-floral", "toallitas-manzanilla", "pack-humedad-suprema"],
  },
  {
    slug: "toallitas-floral",
    name: "Toallitas Húmedas — Floral",
    tagline: "Tu momento de frescura, con aroma floral",
    detail:
      "Toallitas de uso externo con aroma floral, pensadas para acompañarte durante el día donde quiera que estés.",
    size: "Paquete",
    accent: "from-coral-100 to-butter-100",
    image: "/products/toallitas-floral.jpg",
    category: "toallitas",
    price: 2.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Frescura discreta durante el día",
      "Aroma floral suave",
      "Cabe en cualquier bolso",
    ],
    howToUse: [
      "Usa una toallita sobre la zona externa.",
      "Desecha en el bote de basura, nunca en el inodoro.",
    ],
    relatedSlugs: ["toallitas-arandanos", "toallitas-manzanilla", "pack-triple-suavidad"],
  },
  {
    slug: "toallitas-manzanilla",
    name: "Toallitas Húmedas — Manzanilla",
    tagline: "La suavidad de la manzanilla, contigo",
    detail:
      "Toallitas con aroma a manzanilla, una opción suave para tu rutina de frescura fuera de casa.",
    size: "Paquete",
    accent: "from-butter-100 to-mint-100",
    image: "/products/toallitas-manzanilla.jpg",
    category: "toallitas",
    price: 2.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Aroma suave a manzanilla",
      "Ideal si prefieres fragancias ligeras",
      "Práctica para el día a día",
    ],
    howToUse: [
      "Usa una toallita sobre la zona externa.",
      "Desecha en el bote de basura, nunca en el inodoro.",
    ],
    relatedSlugs: ["toallitas-floral", "toallitas-arandanos", "jabon-neutro"],
  },
  {
    slug: "copas-urinarias",
    name: "Copas Urinarias Desechables",
    tagline: "Embudo urinario femenino, listo para usar",
    detail:
      "Evita el contacto con superficies en baños públicos. De cartón compostable, con aroma a jazmín y listas para usar.",
    size: "Paquete",
    accent: "from-violet-500/15 to-mint-100",
    image: "/products/copas-urinarias.jpg",
    gallery: ["/products/group-52.webp"],
    category: "copa",
    featured: true,
    price: 5.0,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Evita el contacto con superficies",
      "Cartón compostable",
      "Listas para usar, sin preparación",
      "Discretas y fáciles de llevar",
    ],
    howToUse: [
      "Saca la copa y despliégala.",
      "Úsala de pie, sin contacto con la superficie.",
      "Dóblala y deséchala en el bote de basura.",
    ],
    relatedSlugs: ["toallitas-floral", "jabon-neutro"],
  },
  {
    slug: "pack-humedad-suprema",
    name: "PACK — Húmedad Suprema",
    tagline: "Tu combo de hidratación y frescura",
    detail:
      "Un combo pensado para cubrir tu rutina de hidratación y frescura en un solo paso, con mejor precio que por separado.",
    size: "Combo",
    accent: "from-coral-100 to-mint-100",
    image: "/products/pack-humedad-suprema.jpg",
    category: "pack",
    price: 7.99,
    compareAt: 9.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Mejor precio que comprando por separado",
      "Cubre tu rutina completa",
      "Ideal para probar varios productos",
    ],
    relatedSlugs: ["pack-triple-suavidad", "toallitas-arandanos"],
  },
  {
    slug: "pack-triple-suavidad",
    name: "PACK — Triple Suavidad",
    tagline: "Tres esenciales, un solo precio",
    detail:
      "El combo para quienes quieren tener siempre a la mano sus tres esenciales de cuidado íntimo.",
    size: "Combo",
    accent: "from-mint-100 to-butter-100",
    image: "/products/pack-triple-suavidad.jpg",
    category: "pack",
    price: 7.99,
    compareAt: 9.99,
    reviewCount: 0,
    inStock: true,
    benefits: [
      "Tres esenciales en un solo pack",
      "Ahorro frente a la compra individual",
      "Perfecto para regalar o compartir",
    ],
    relatedSlugs: ["pack-humedad-suprema", "toallitas-floral"],
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

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(p: Product, limit = 3): Product[] {
  const picked = (p.relatedSlugs ?? [])
    .map(getProduct)
    .filter((x): x is Product => Boolean(x) && x!.slug !== p.slug);

  // Top up from the same category, then anything else, so the rail is never thin
  if (picked.length < limit) {
    const fill = products.filter(
      (x) => x.slug !== p.slug && !picked.some((q) => q.slug === x.slug),
    );
    fill.sort((a, b) => {
      const aSame = a.category === p.category ? 0 : 1;
      const bSame = b.category === p.category ? 0 : 1;
      return aSame - bSame;
    });
    picked.push(...fill.slice(0, limit - picked.length));
  }
  return picked.slice(0, limit);
}

export function getCategory(id: CategoryId): Category | undefined {
  return categories.find((c) => c.id === id);
}
