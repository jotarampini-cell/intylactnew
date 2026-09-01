import Image from "next/image";
import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";

const tiles = [
  { size: "h-24 w-24 sm:h-32 sm:w-32", offset: "sm:mt-10", tint: "bg-coral-200", src: "/community/01.jpg" },
  { size: "h-28 w-28 sm:h-40 sm:w-40", offset: "", tint: "bg-mint-100", src: "/community/02.jpg" },
  { size: "h-20 w-20 sm:h-28 sm:w-28", offset: "sm:mt-16", tint: "bg-butter-200", src: "/community/03.jpg" },
  { size: "h-32 w-32 sm:h-44 sm:w-44", offset: "sm:mt-4", tint: "bg-coral-100", src: "/community/04.jpg" },
  { size: "h-24 w-24 sm:h-32 sm:w-32", offset: "sm:mt-20", tint: "bg-mint-300", src: "/community/05.jpg" },
  { size: "h-28 w-28 sm:h-36 sm:w-36", offset: "", tint: "bg-butter-100", src: "/community/06.jpg" },
  { size: "h-20 w-20 sm:h-28 sm:w-28", offset: "sm:mt-12", tint: "bg-coral-200", src: "/community/07.jpg" },
  { size: "h-24 w-24 sm:h-36 sm:w-36", offset: "sm:mt-2", tint: "bg-mint-100", src: "/community/08.jpg" },
];

export default function CommunityWall() {
  return (
    <SectionShell
      background="bg-cream"
      aria-labelledby="comunidad-titulo"
      className="overflow-hidden"
    >
      <h2
        id="comunidad-titulo"
        className="text-center font-heading text-[clamp(1.75rem,4.5vw,3rem)] font-bold"
      >
        <span aria-hidden="true" className="text-coral-400">
          ♥
        </span>{" "}
        Esta es tu comunidad{" "}
        <span aria-hidden="true" className="text-coral-400">
          ♥
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-[52ch] text-center text-sm leading-relaxed text-teal-900/70 sm:text-base">
        Miles de mujeres que ya cuidan su zona V con Intylact.
      </p>

      {/* Horizontal scroll on mobile, scattered row on larger screens */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 sm:flex-wrap sm:justify-center sm:overflow-visible sm:pb-0">
        {tiles.map((t, i) => (
          <li
            key={i}
            className={`shrink-0 snap-center ${t.offset}`}
          >
            <div
              className={`relative ${t.size} overflow-hidden rounded-full ${t.tint}`}
            >
              <Image
                src={t.src}
                alt=""
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
          </li>
        ))}
      </ul>

      <ScallopDivider color="text-coral-200" position="bottom" />
    </SectionShell>
  );
}
