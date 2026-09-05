"use client";

import Image from "next/image";
import Link from "next/link";
import type { Look, LookTile as LookTileType } from "@/types/look";
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
};

const spanClass = {
  hero: "span-hero",
  wide: "span-wide",
  normal: "",
};

export function LookTile({ look, tile, index, open, onToggle }: LookTileProps) {
  const number = String(index + 1).padStart(2, "0");
  const isHero = tile.span === "hero";

  return (
    <article
      className={`group relative cursor-pointer bg-paper ${spanClass[tile.span]} ${
        open ? "is-open" : ""
      }`}
      onClick={(event) => {
        if ((event.target as HTMLElement).closest("a")) return;
        onToggle(tile.id);
      }}
    >
      <div
        className={`relative overflow-hidden bg-[#eeebe4] ${aspectClass[tile.aspect]}`}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 50vw"
          className="pointer-events-none tile-media"
          style={{
            objectPosition: tile.position,
            transform: tile.zoom ? `scale(${tile.zoom})` : undefined,
          }}
        />
        <span className="tile-index pointer-events-none absolute top-2 left-2 z-20">
          {number}
        </span>
        <div className="loadout-layer pointer-events-none absolute inset-0 z-20">
          <LoadoutHud
            products={look.products}
            visible
            variant={isHero ? "hero" : "quiet"}
          />
        </div>
        <Link
          href={`/look/${look.id}`}
          className={`file-link absolute z-30 text-[11px] tracking-[0.1em] ${
            isHero ? "top-2 right-2" : "right-2 bottom-2"
          }`}
        >
          {isHero ? "FILE" : look.title}
        </Link>
      </div>
    </article>
  );
}
