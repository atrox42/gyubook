"use client";

import { useMemo, useState } from "react";
import type { FilterId } from "@/lib/activity";
import type { Look } from "@/types/look";
import { LookTile } from "./LookTile";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

export function EditorialGrid({ looks }: { looks: Look[] }) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const tiles = useMemo(() => {
    return looks
      .filter((look) => (filter === "all" ? true : look.activity === filter))
      .flatMap((look) => look.tiles.map((tile) => ({ look, tile })));
  }, [filter, looks]);

  const opener = looks.length === 1;

  return (
    <div className="bg-paper">
      <SiteHeader filter={filter} onFilter={setFilter} />
      <main>
        <div className="flex items-baseline justify-between px-5 pb-3 pt-1 sm:px-6">
          <p className="font-serif text-[28px] leading-none tracking-tight">01</p>
          <p className="text-[10px] font-light tracking-[0.42em] text-mute">VOL.</p>
        </div>
        <div className={opener ? "look-opener" : "look-wall"}>
          {tiles.map(({ look, tile }, index) => (
            <LookTile
              key={tile.id}
              look={look}
              tile={tile}
              index={index}
              open={openId === tile.id}
              onToggle={(id) =>
                setOpenId((current) => (current === id ? null : id))
              }
            />
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
