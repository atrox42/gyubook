import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LookDetail } from "@/components/LookDetail";
import { getAdjacentLooks, getLook, looks } from "@/data/looks";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return looks.map((look) => ({ id: look.id }));
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
    description: look.brief,
    openGraph: {
      title: `${look.title} · ${site.name}`,
      description: look.brief,
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

  const { prev, next } = getAdjacentLooks(look.id);

  return (
    <LookDetail
      look={look}
      prevId={prev?.id ?? look.id}
      nextId={next?.id ?? look.id}
    />
  );
}
