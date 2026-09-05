"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  const [hovered, setHovered] = useState(false);
  const number = String(index + 1).padStart(2, "0");
  const isHero = tile.span === "hero";
  const revealed = open || hovered;

  return (
    <article
      className={`group relative cursor-pointer bg-paper ${spanClass[tile.span]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
        <LoadoutHud
          products={look.products}
          visible={revealed}
          variant={isHero ? "hero" : "quiet"}
        />
        {isHero ? (
          <Link
            href={`/look/${look.id}`}
            className={`absolute top-2 right-2 z-30 text-[11px] tracking-[0.1em] transition-opacity ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            FILE
          </Link>
        ) : (
          <Link
            href={`/look/${look.id}`}
            className={`absolute right-2 bottom-2 z-30 text-[11px] tracking-[0.08em] transition-opacity ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            {look.title}
          </Link>
        )}
      </div>
    </article>
  );
}
