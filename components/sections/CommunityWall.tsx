import SectionShell from "@/components/ui/SectionShell";
import ScallopDivider from "@/components/ui/ScallopDivider";

/**
 * UGC collage.
 *
 * SWAP-IN POINT: drop community photos in /public/community as 01.jpg … 14.jpg
 * and set `src` below; until then each tile renders as a soft placeholder.
 * Sizes vary to produce the scattered, organic arrangement of the current site.
 */
const tiles = [
  { size: "h-24 w-24 sm:h-32 sm:w-32", offset: "sm:mt-10", tint: "bg-coral-200" },
  { size: "h-28 w-28 sm:h-40 sm:w-40", offset: "", tint: "bg-mint-100" },
  { size: "h-20 w-20 sm:h-28 sm:w-28", offset: "sm:mt-16", tint: "bg-butter-200" },
  { size: "h-32 w-32 sm:h-44 sm:w-44", offset: "sm:mt-4", tint: "bg-coral-100" },
  { size: "h-24 w-24 sm:h-32 sm:w-32", offset: "sm:mt-20", tint: "bg-mint-300" },
  { size: "h-28 w-28 sm:h-36 sm:w-36", offset: "", tint: "bg-butter-100" },
  { size: "h-20 w-20 sm:h-28 sm:w-28", offset: "sm:mt-12", tint: "bg-coral-200" },
  { size: "h-24 w-24 sm:h-36 sm:w-36", offset: "sm:mt-2", tint: "bg-mint-100" },
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
              className={`grid ${t.size} place-items-center overflow-hidden rounded-full ${t.tint}`}
            >
              <span className="px-2 text-center font-heading text-[11px] font-medium text-teal-900/55">
                Foto
              </span>
            </div>
          </li>
        ))}
      </ul>

      <ScallopDivider color="text-coral-200" position="bottom" />
    </SectionShell>
  );
}
