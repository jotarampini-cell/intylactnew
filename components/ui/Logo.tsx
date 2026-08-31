/**
 * Intylact wordmark.
 *
 * SWAP-IN POINT: this is a text-based placeholder set in the site's heading face
 * so the layout is reviewable now. When you supply the real vector, drop it at
 * /public/logo.svg and replace this component's body with:
 *
 *   import Image from "next/image";
 *   <Image src="/logo.svg" alt="Intylact" width={160} height={32} priority />
 *
 * Nothing else in the codebase needs to change — Header and Footer both render
 * this component.
 */
export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-heading font-semibold tracking-tight ${className}`}
      style={{ fontSize: "1.6rem", lineHeight: 1 }}
    >
      intylact
      <span aria-hidden="true" className="ml-0.5 text-[0.5em] font-normal align-super">
        ®
      </span>
    </span>
  );
}
