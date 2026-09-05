"use client";

import Image from "next/image";
import Link from "next/link";
import type { Look, LookTile as LookTileType } from "@/types/look";

type LookTileProps = {
  look: Look;
  tile: LookTileType;
  index: number;
  open: boolean;
  onToggle: (id: string) => void;
};

const aspectClass = {
  hero: "aspect-hero",
  portrait: "aspect-portrait",
  square: "aspect-square",
  detail: "aspect-detail",
};

const spanClass = {
  hero: "span-hero",
  wide: "span-wide",
  normal: "",
};

export function LookTile({ look, tile, index, open, onToggle }: LookTileProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article
      className={`group relative bg-paper ${spanClass[tile.span]} ${
        open ? "is-open" : ""
      }`}
    >
      <button
        type="button"
        className={`relative block w-full overflow-hidden bg-[#eeebe4] ${aspectClass[tile.aspect]}`}
        onClick={() => onToggle(tile.id)}
        aria-expanded={open}
        aria-label={`${look.title} ${tile.alt}`}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className="tile-media transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          style={{
            objectPosition: tile.position,
            transform: tile.zoom ? `scale(${tile.zoom})` : undefined,
          }}
        />
        <span className="tile-index absolute top-2 left-2 z-10">{number}</span>
      </button>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-paper/95 via-paper/80 to-transparent p-3 pt-10 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        <div className="pointer-events-auto">
          <p className="text-[10px] tracking-[0.16em] text-mute">
            {look.title}
          </p>
          <ul className="mt-1.5 space-y-0.5">
            {look.products.slice(0, 4).map((product) => (
              <li key={product.id} className="text-[12px] leading-snug">
                {product.brand ? `${product.brand} ` : ""}
                {product.name}
                <span className="ml-1.5 text-[10px] text-mute">
                  {product.category}
                </span>
              </li>
            ))}
          </ul>
          <Link
            href={`/look/${look.id}`}
            className="mt-2 inline-block text-[11px] tracking-[0.08em] underline-offset-2 hover:underline"
          >
            전체 보기
          </Link>
        </div>
      </div>
    </article>
  );
}
