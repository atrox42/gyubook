export const HOTSPOT_SLOTS = [
  "head",
  "outer",
  "torso",
  "vest",
  "pack",
  "hand",
  "bottom",
  "socks",
  "shoes",
] as const;

export type HotspotSlot = (typeof HOTSPOT_SLOTS)[number];

/** Standing front, arms down — figure space 0–100. Same pose every look. */
export const FIGURE_HOTSPOTS: Record<HotspotSlot, { x: number; y: number }> = {
  head: { x: 50, y: 8 },
  outer: { x: 50, y: 12 },
  torso: { x: 50, y: 28 },
  vest: { x: 52, y: 34 },
  pack: { x: 50, y: 38 },
  hand: { x: 38, y: 48 },
  bottom: { x: 50, y: 58 },
  socks: { x: 48, y: 82 },
  shoes: { x: 50, y: 92 },
};

/**
 * Front figure of the packed 4-angle hero.
 * Look #01 quad is four standing poses in a row — markers stay on the leftmost body.
 */
export function slotPoint(
  slot: HotspotSlot,
  layout: "figure" | "quad" = "figure",
) {
  const point = FIGURE_HOTSPOTS[slot];
  if (layout === "quad") {
    return { x: 3 + point.x * 0.22, y: point.y };
  }
  return point;
}
