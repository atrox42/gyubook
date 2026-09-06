import type { HotspotSlot } from "@/lib/hotspots";

export type Activity = "hiking" | "trekking" | "trail-running" | "other";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  href?: string;
  sku?: string;
  color?: string;
  thumb?: string;
  wear?: string;
  price?: string;
  /** Coupang Partners / Naver Brand Connect. Empty = 링크 준비중 */
  affiliateUrl?: string;
  slot?: HotspotSlot;
  hotspot?: { x: number; y: number };
};

export type LookAngle = "front" | "left" | "right" | "back";

export type LookTile = {
  id: string;
  src: string;
  alt: string;
  aspect: "hero" | "portrait" | "square" | "detail" | "quad";
  position: string;
  zoom?: number;
  span: "hero" | "wide" | "normal";
};

/** Primary full-body shot — the hover/tap inventory lives here. */
export function isPrimaryShot(tile: LookTile) {
  return tile.span === "hero";
}

export type Look = {
  id: string;
  title: string;
  activity: Activity;
  image: string;
  alt: string;
  products: Product[];
  angles?: Partial<Record<LookAngle, string>>;
  quad?: string;
  tiles: LookTile[];
  /** Hidden from the homepage grid (stock placeholders). */
  listed?: boolean;
};
