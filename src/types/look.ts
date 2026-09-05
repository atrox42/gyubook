export type Activity = "hiking" | "trekking" | "trail-running" | "other";

export type Product = {
  id: string;
  name: string;
  brand?: string;
  category: string;
  href?: string;
  hotspot?: { x: number; y: number };
};

export type Look = {
  id: string;
  title: string;
  activity: Activity;
  image: string;
  alt: string;
  products: Product[];
  code: string;
  location: string;
  locationKo: string;
  elevationM: number;
  brief: string;
  briefEn: string;
  frame: "tall" | "classic" | "compact";
};
