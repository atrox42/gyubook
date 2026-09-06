import { CategoryCatalog } from "@/components/CategoryCatalog";
import { catalogItems } from "@/lib/catalog";

export default function Home() {
  return <CategoryCatalog items={catalogItems()} />;
}
