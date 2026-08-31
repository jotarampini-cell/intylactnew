import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionShell from "@/components/ui/SectionShell";

/**
 * Shared frame for the placeholder routes, so every nav link lands on a real,
 * branded page instead of a 404 while those sections are still being built.
 */
export default function PageShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="contenido" className="flex-1">
        <SectionShell background="bg-cream" width="narrow">
          <h1 className="font-heading text-[clamp(2rem,5vw,3rem)] font-bold">
            {title}
          </h1>
          {intro && (
            <p className="mt-4 max-w-[56ch] text-base leading-relaxed text-teal-900/75">
              {intro}
            </p>
          )}
          {children}
          <p className="mt-10 rounded-2xl bg-mint-100 px-5 py-4 text-sm text-teal-900/80">
            Esta sección está en construcción.
          </p>
        </SectionShell>
      </main>
      <Footer />
    </>
  );
}
