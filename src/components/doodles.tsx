import type { CSSProperties } from "react";

const starPoints = (points: number, inner: number) => Array.from({ length: points * 2 }, (_, index) => {
  const radius = index % 2 ? inner : 1;
  const angle = (Math.PI * index) / points - Math.PI / 2;
  return `${(50 + 48 * radius * Math.cos(angle)).toFixed(1)},${(50 + 48 * radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

type DoodleProps = { className?: string; style?: CSSProperties };

/** Decorative hand-cut star. `look` picks solid paper, an outlined doodle, or polka-dot paper. */
export function Star({ points = 5, inner = 0.45, look = "solid", className, style }: DoodleProps & { points?: number; inner?: number; look?: "solid" | "outline" | "dots" }) {
  const id = `dots-${points}-${Math.round(inner * 100)}`;
  return <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    {look === "dots" && <defs><pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse"><rect width="14" height="14" fill="currentColor" /><circle cx="7" cy="7" r="2.6" fill="#fff" opacity=".85" /></pattern></defs>}
    <polygon points={starPoints(points, inner)} strokeLinejoin="round"
      fill={look === "outline" ? "none" : look === "dots" ? `url(#${id})` : "currentColor"}
      stroke={look === "outline" ? "currentColor" : "none"} strokeWidth={look === "outline" ? 5 : 0} />
  </svg>;
}

export function Heart({ className, style }: DoodleProps) {
  return <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <path d="M50 86C20 62 8 46 12 30c4-15 24-20 38 0 14-20 34-15 38 0 4 16-8 32-38 56Z" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>;
}
