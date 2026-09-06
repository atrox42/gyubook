import { looks } from "@/data/looks";
import type { Activity } from "@/types/look";

export type CatalogItem = {
  id: string;
  lookId: string;
  activity: Activity;
  name: string;
  brand?: string;
  sku?: string;
  color?: string;
  price?: string;
  thumb: string;
  wear: string;
  affiliateUrl?: string;
};

export function catalogItems(): CatalogItem[] {
  return looks
    .filter((look) => look.listed !== false)
    .flatMap((look) =>
      look.products
        .filter((product) => product.thumb)
        .map((product) => ({
          id: product.id,
          lookId: look.id,
          activity: look.activity,
          name: product.name,
          brand: product.brand,
          sku: product.sku,
          color: product.color,
          price: product.price,
          thumb: product.thumb as string,
          wear: product.wear ?? look.angles?.front ?? look.image,
          affiliateUrl: product.affiliateUrl,
        })),
    );
}
