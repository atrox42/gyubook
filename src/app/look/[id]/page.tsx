import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryCatalog } from "@/components/CategoryCatalog";
import { catalogItems } from "@/lib/catalog";
import { getLook, looks } from "@/data/looks";
import { site } from "@/lib/site";

function publicExists(src: string) {
  return existsSync(path.join(process.cwd(), "public", src.replace(/^\//, "")));
}

export function generateStaticParams() {
  return looks
    .filter((look) => publicExists(look.image))
    .map((look) => ({ id: look.id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const look = getLook(id);
  if (!look) return { title: "Not found" };

  return {
    title: look.title,
    description: `${look.title} — ${look.alt}`,
    openGraph: {
      title: `${look.title} · ${site.name}`,
      description: `${look.title} — ${look.alt}`,
    },
  };
}

export default async function LookPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const look = getLook(id);
  if (!look) notFound();

  return <CategoryCatalog items={catalogItems().filter((item) => item.lookId === look.id)} />;
}
