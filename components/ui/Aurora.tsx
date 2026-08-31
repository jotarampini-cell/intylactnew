/**
 * Layered gradient backdrop.
 *
 * Three soft radial blooms over a base gradient, blurred into each other, plus a
 * faint grain overlay so large colour fields don't band on wide screens. Pure
 * CSS — no image requests, and it scales to any viewport.
 */
export default function Aurora({
  className = "",
  intensity = "normal",
}: {
  className?: string;
  intensity?: "soft" | "normal" | "vivid";
}) {
  const opacity = { soft: 0.45, normal: 0.7, vivid: 0.92 }[intensity];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{ background: "var(--grad-hero-rich)", opacity }}
      />

      {/* Colour blooms — offset so they read as light, not as circles */}
      <div
        className="absolute -left-[15%] -top-[25%] h-[70vw] max-h-[780px] w-[70vw] max-w-[780px] rounded-full blur-[90px]"
        style={{ background: "radial-gradient(circle, rgba(101,212,220,.75), transparent 68%)" }}
      />
      <div
        className="absolute -right-[12%] top-[8%] h-[58vw] max-h-[640px] w-[58vw] max-w-[640px] rounded-full blur-[100px]"
        style={{ background: "radial-gradient(circle, rgba(255,155,155,.8), transparent 68%)" }}
      />
      <div
        className="absolute bottom-[-28%] left-[22%] h-[62vw] max-h-[680px] w-[62vw] max-w-[680px] rounded-full blur-[110px]"
        style={{ background: "radial-gradient(circle, rgba(224,86,127,.55), transparent 70%)" }}
      />

      {/* Grain — breaks up banding across large gradients */}
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
