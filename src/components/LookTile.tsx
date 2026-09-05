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
      className={`group relative bg-paper ${spanClass[tile.span]}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden bg-[#eeebe4] ${aspectClass[tile.aspect]}`}
      >
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 50vw"
          className="tile-media"
          style={{
            objectPosition: tile.position,
            transform: tile.zoom ? `scale(${tile.zoom})` : undefined,
          }}
        />
        <button
          type="button"
          className="absolute inset-0 z-10"
          onClick={() => onToggle(tile.id)}
          aria-expanded={revealed}
          aria-label={`${look.title} 로드아웃 ${revealed ? "닫기" : "열기"}`}
        />
        <span className="tile-index pointer-events-none absolute top-2 left-2 z-20">
          {number}
        </span>
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className={revealed ? "pointer-events-auto h-full" : "h-full"}>
            <LoadoutHud
              products={look.products}
              visible={revealed}
              variant={isHero ? "hero" : "quiet"}
            />
          </div>
        </div>
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
          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 z-30 p-3 transition-opacity ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          >
            <Link
              href={`/look/${look.id}`}
              className="pointer-events-auto text-[11px] tracking-[0.08em] underline-offset-2 hover:underline"
            >
              {look.title}
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
