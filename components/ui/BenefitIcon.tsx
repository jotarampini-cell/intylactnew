import Icon, { type IconName } from "@/components/ui/Icon";

/**
 * Thin adapter kept so the ticker's data (`benefits[].icon` in lib/products.ts)
 * can stay as plain strings while the drawing lives in the shared icon set.
 *
 * Sizing is left to the caller's Tailwind height/width classes, matching how
 * the ticker already sized these before the icon set existed.
 */
export default function BenefitIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  return <Icon name={name as IconName} className={className} />;
}
