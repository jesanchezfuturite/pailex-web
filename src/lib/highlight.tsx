import type { ReactNode } from "react";

/**
 * Resalta en lima (text-accent) la parte del título marcada en el CMS.
 * Si el texto resaltado no aparece dentro del título, se muestra tal cual.
 */
export function withHighlight(text: string | undefined, highlight?: string): ReactNode {
  if (!text) return null;
  if (!highlight || !text.includes(highlight)) return text;

  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <span className="text-accent">{highlight}</span>
      {rest.join(highlight)}
    </>
  );
}
