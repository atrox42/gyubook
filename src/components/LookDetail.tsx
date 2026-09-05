"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ACTIVITY_META, formatElevation } from "@/lib/activity";
import type { Look } from "@/types/look";
import { Hotspots } from "./Hotspots";
import { HudCorners } from "./HudCorners";
import { KstClock } from "./KstClock";
import { LoadoutList } from "./LoadoutList";

type LookDetailProps = {
  look: Look;
  prevId: string;
  nextId: string;
};

export function LookDetail({ look, prevId, nextId }: LookDetailProps) {
  const [showTags, setShowTags] = useState(true);
  const activity = ACTIVITY_META[look.activity];

  return (
    <div className="relative min-h-[100dvh] bg-ink">
      <div className="absolute inset-3 z-20 hidden border border-white/8 lg:block">
        <HudCorners />
      </div>

      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <section className="relative min-h-[62vh] lg:min-h-[100dvh]">
          <Image
            src={look.image}
            alt={look.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/25 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-ink/70" />
          <HudCorners className="lg:hidden" />
          <Hotspots products={look.products} visible={showTags} />

          <div className="absolute top-0 right-0 left-0 z-30 flex items-start justify-between gap-3 px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6">
            <Link
              href="/#archive"
              data-cursor="hover"
              className="border border-paper/20 bg-ink/45 px-2.5 py-1.5 font-hud text-[10px] tracking-[0.2em] text-paper backdrop-blur-sm hover:border-amber hover:text-amber"
            >
              ← ARCHIVE
            </Link>
            <div className="text-right font-hud text-[10px] tracking-[0.18em] text-mist">
              <KstClock />
              <p className="mt-1 text-amber">{look.code}</p>
            </div>
          </div>
        </section>

        <aside className="relative z-10 flex flex-col border-t border-line bg-char/95 px-5 py-8 sm:px-8 lg:border-t-0 lg:pt-24">
          <p className="font-hud text-[10px] tracking-[0.28em] text-amber">
            MISSION FILE · {activity.en}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="border border-amber/40 px-1.5 py-0.5 font-hud text-[9px] tracking-[0.2em] text-amber">
              {activity.ko}
            </span>
            <span className="font-hud text-[10px] tracking-[0.16em] text-mist">
              {look.locationKo} · {look.location} · {formatElevation(look.elevationM)}
            </span>
          </div>
          <h1 className="mt-4 font-serif-kr text-4xl text-paper sm:text-5xl">
            {look.title}
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-mist">
            {look.brief}
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-mist/70">
            {look.briefEn}
          </p>

          <div className="mt-8 flex items-center justify-between gap-3 border-y border-line py-3">
            <p className="font-hud text-[10px] tracking-[0.24em] text-amber">
              LOADOUT · {String(look.products.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              data-cursor="hover"
              onClick={() => setShowTags((value) => !value)}
              className="font-hud text-[10px] tracking-[0.18em] text-mist hover:text-amber"
            >
              {showTags ? "TAGS OFF" : "TAGS ON"}
            </button>
          </div>

          <div className="mt-1 flex-1">
            <LoadoutList products={look.products} visible variant="dossier" />
          </div>

          <nav className="mt-8 flex items-center justify-between gap-3 font-hud text-[10px] tracking-[0.2em]">
            <Link
              href={`/look/${prevId}`}
              data-cursor="hover"
              className="border border-line px-3 py-2 text-mist hover:border-amber hover:text-amber"
            >
              ← PREV
            </Link>
            <Link
              href={`/look/${nextId}`}
              data-cursor="hover"
              className="border border-line px-3 py-2 text-mist hover:border-amber hover:text-amber"
            >
              NEXT →
            </Link>
          </nav>
        </aside>
      </div>
    </div>
  );
}
