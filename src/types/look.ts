export type Activity = "hiking" | "trekking" | "trail-running" | "other";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  href?: string;
  sku?: string;
  thumb?: string;
  hotspot?: { x: number; y: number };
};

export type LookAngle = "front" | "left" | "right" | "back";

export type LookTile = {
  id: string;
  src: string;
  alt: string;
  aspect: "hero" | "portrait" | "square" | "detail";
  position: string;
  zoom?: number;
  span: "hero" | "wide" | "normal";
};

export type Look = {
  id: string;
  title: string;
  activity: Activity;
  image: string;
  alt: string;
  products: Product[];
  angles?: Partial<Record<LookAngle, string>>;
  tiles: LookTile[];
};
