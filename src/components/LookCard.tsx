"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ACTIVITY_META, formatElevation } from "@/lib/activity";
import type { Look } from "@/types/look";
import { Hotspots } from "./Hotspots";
import { HudCorners } from "./HudCorners";
import { LoadoutList } from "./LoadoutList";

type LookCardProps = {
  look: Look;
  open: boolean;
  onToggle: (id: string) => void;
};

export function LookCard({ look, open, onToggle }: LookCardProps) {
  const [hovered, setHovered] = useState(false);
  const revealed = open || hovered;
  const activity = ACTIVITY_META[look.activity];

  return (
    <article
      className={`look-card group relative ${open ? "is-open" : ""}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`relative overflow-hidden border border-line bg-char transition-[box-shadow,border-color,transform] duration-500 ${
          revealed
            ? "border-amber/35 shadow-[0_0_0_1px_rgba(228,168,90,0.18),0_22px_50px_rgba(0,0,0,0.45)]"
            : "shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
        }`}
      >
        <button
          type="button"
          className={`relative block w-full overflow-hidden ${
            look.frame === "tall"
              ? "frame-tall"
              : look.frame === "compact"
                ? "frame-compact"
                : "frame-classic"
          }`}
          onClick={() => onToggle(look.id)}
          aria-expanded={revealed}
          aria-label={`${look.title} 로드아웃 ${revealed ? "닫기" : "열기"}`}
        >
          <Image
            src={look.image}
            alt={look.alt}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className={`object-cover transition-transform duration-700 ease-out ${
              revealed ? "scale-[1.05]" : "scale-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
          <div
            className={`absolute inset-0 bg-ink/25 transition-opacity duration-500 ${
              revealed ? "opacity-100" : "opacity-0"
            }`}
          />
          <HudCorners />
          <Hotspots products={look.products} visible={revealed} />

          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="font-hud text-[10px] tracking-[0.28em] text-amber">
              {look.code}
            </span>
          </div>
          <div className="absolute top-4 right-4 z-20">
            <span className="border border-amber/40 bg-ink/50 px-1.5 py-0.5 font-hud text-[9px] tracking-[0.2em] text-amber backdrop-blur-sm">
              {activity.ko}
            </span>
          </div>
        </button>

        <div className="absolute inset-x-0 bottom-0 z-20 p-4 pt-16">
          <div className="mb-2 flex items-end justify-between gap-3">
            <div>
              <h2 className="font-serif-kr text-[1.45rem] leading-none text-paper">
                {look.title}
              </h2>
              <p className="mt-1.5 font-hud text-[9px] uppercase tracking-[0.22em] text-mist">
                {look.locationKo} · {look.location} · {formatElevation(look.elevationM)}
              </p>
            </div>
            <Link
              href={`/look/${look.id}`}
              data-cursor="hover"
              className="shrink-0 border border-paper/20 px-2.5 py-1.5 font-hud text-[9px] tracking-[0.2em] text-paper transition-colors hover:border-amber hover:text-amber"
            >
              열기
            </Link>
          </div>

          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ${
              revealed ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="mt-3 border-t border-white/10 pt-3">
                <p className="mb-2 font-hud text-[9px] tracking-[0.24em] text-amber/80">
                  LOADOUT · {String(look.products.length).padStart(2, "0")}
                </p>
                <LoadoutList products={look.products} visible={revealed} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
