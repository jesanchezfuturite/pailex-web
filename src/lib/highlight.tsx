import type { ReactNode } from "react";

/**
 * Resalta la parte del título marcada en el CMS (por defecto, en lima /
 * text-accent). Si el texto resaltado no aparece dentro del título, se
 * muestra tal cual.
 */
export function withHighlight(
  text: string | undefined,
  highlight?: string | null,
  highlightClassName: string = "text-accent",
): ReactNode {
  if (!text) return null;
  if (!highlight || !text.includes(highlight)) return text;

  const [before, ...rest] = text.split(highlight);
  return (
    <>
      {before}
      <span className={highlightClassName}>{highlight}</span>
      {rest.join(highlight)}
    </>
  );
}
