import type { Metadata } from "next";
import { Poppins, Lato } from "next/font/google";
import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://intylact.com"),
  title: {
    default: "Intylact — Cuidado íntimo con probióticos e inositol",
    template: "%s | Intylact",
  },
  description:
    "Cuidado íntimo femenino formulado con probióticos e inositol. Gel hidratante, jabones íntimos y suplementos para el equilibrio de tu zona V.",
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Intylact",
    title: "Intylact — Cuidado íntimo con probióticos e inositol",
    description:
      "Cuidado íntimo femenino formulado con probióticos e inositol, para el equilibrio de tu zona V.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${poppins.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a href="#contenido" className="skip-link">
          Saltar al contenido principal
        </a>
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
