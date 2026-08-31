"use client";

import Image from "next/image";
import { useState } from "react";

/**
 * Product gallery: one large image plus thumbnails.
 *
 * Thumbnails render only when there is more than one shot, so a single-image
 * product doesn't show a lone thumb that does nothing. The active image is
 * announced via the alt text; decorative duplicates are hidden.
 */
export default function ProductGallery({
  images,
  name,
  accent,
}: {
  images: string[];
  name: string;
  accent: string;
}) {
  const [active, setActive] = useState(0);
  const shots = images.filter(Boolean);

  if (shots.length === 0) {
    return (
      <div
        className={`grid aspect-square place-items-center rounded-[16px] bg-gradient-to-br ${accent} sm:rounded-[20px]`}
      >
        <span className="font-heading text-sm font-medium text-teal-900/45">
          Imagen próximamente
        </span>
      </div>
    );
  }

  return (
    <div>
      <div
        className={`group relative aspect-square overflow-hidden rounded-[16px] bg-gradient-to-br ${accent} sm:rounded-[20px]`}
      >
        {shots.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? name : ""}
            aria-hidden={i !== active}
            width={900}
            height={900}
            priority={i === 0}
            sizes="(max-width: 1024px) 92vw, 560px"
            className={`absolute inset-0 h-full w-full object-contain p-8 transition-all duration-500 ease-[var(--ease-brand)] sm:p-12 ${
              i === active ? "opacity-100" : "pointer-events-none opacity-0"
            } group-hover:scale-[1.04]`}
          />
        ))}
      </div>

      {shots.length > 1 && (
        <ul className="mt-3 flex gap-3">
          {shots.map((src, i) => (
            <li key={src}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-current={i === active}
                className={`grid h-[72px] w-[72px] place-items-center overflow-hidden rounded-2xl bg-gradient-to-br ${accent} transition-all duration-[var(--dur-fast)] ease-[var(--ease-brand)] ${
                  i === active
                    ? "ring-2 ring-teal-900 ring-offset-2"
                    : "opacity-65 hover:opacity-100"
                }`}
              >
                <span className="sr-only">Ver imagen {i + 1} de {name}</span>
                <Image
                  src={src}
                  alt=""
                  width={144}
                  height={144}
                  sizes="72px"
                  className="h-full w-full object-contain p-2"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
