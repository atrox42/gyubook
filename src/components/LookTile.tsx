"use client";

import Image from "next/image";
import Link from "next/link";
import { isPrimaryShot, type Look, type LookTile as LookTileType } from "@/types/look";
import { LoadoutHud } from "./LoadoutHud";

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
  quad: "aspect-quad",
};

export function LookTile({ look, tile, index, open, onToggle }: LookTileProps) {
  const isHero = isPrimaryShot(tile);

  return (
    <article
      className={`look-brick group relative cursor-pointer bg-paper ${
        open ? "is-open" : ""
      } ${isHero ? "is-hero" : ""}`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        onToggle(tile.id);
      }}
    >
      <div className={`relative overflow-hidden bg-paper ${aspectClass[tile.aspect]}`}>
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 900px) 50vw, 25vw"
          className="pointer-events-none tile-media"
          style={{
            objectPosition: tile.position,
            transform: tile.zoom ? `scale(${tile.zoom})` : undefined,
          }}
        />
        <span className="tile-index pointer-events-none">{index + 1}</span>
        <div className="loadout-layer absolute inset-0 z-20">
          <LoadoutHud products={look.products} variant={isHero ? "hero" : "quiet"} />
        </div>
        <Link
          href={`/look/${look.id}`}
          className="file-link absolute top-2 right-2 z-30 text-[10px] font-light tracking-[0.12em]"
        >
          {look.title}
        </Link>
      </div>
    </article>
  );
}
