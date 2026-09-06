"use client";

import type { CatalogItem } from "@/lib/catalog";
import { CategoryCatalog } from "./CategoryCatalog";

/** Homepage catalog — kept as a named export for older imports. */
export function EditorialGrid({ items }: { items: CatalogItem[] }) {
  return <CategoryCatalog items={items} />;
}
